import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  PlusCircle,
  FileText,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  QrCode,
  Eye,
  Trash2,
  RotateCcw,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Building2,
  Timer
} from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { EmptyState } from '../../components/common/EmptyState.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { CampusRequest, RequestType } from '../../types/index.ts';

const STORAGE_KEY = 'campusconnect_requests';
const WARDEN_DEFAULT_PHONE = '+91 98610 99887';

const INITIAL_REQUESTS: CampusRequest[] = [];

export const StudentRequestsPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [requests, setRequests] = useState<CampusRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_REQUESTS;
      }
    }
    return INITIAL_REQUESTS;
  });

  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestType, setRequestType] = useState<RequestType>('gate_pass');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [destination, setDestination] = useState('');
  const [familyMobileNo, setFamilyMobileNo] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [semester, setSemester] = useState('');
  const [stayDuration, setStayDuration] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // QR Modal State
  const [selectedQrRequest, setSelectedQrRequest] = useState<CampusRequest | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [nowTime, setNowTime] = useState<number>(Date.now());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [requests]);

  // Update clock every minute for multi-day validity checks
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(Date.now());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Handle generating QR code for approved gate pass (MUST ONLY SHOW STUDENT NAME AND CLASS)
  const handleOpenQrModal = async (req: CampusRequest) => {
    setSelectedQrRequest(req);
    // As per user specification: "a qr code generated where all details of the student are there"
    const qrData = {
      id: req.id,
      name: req.studentName,
      roll: req.studentRoll,
      class: req.className,
      hostel: req.hostelId,
      room: req.roomNo,
      semester: req.semester,
      type: req.type,
      reason: req.reason,
      startDate: req.startDate,
      endDate: req.endDate,
      stayDuration: req.stayDuration,
      status: req.status
    };
    
    const qrContent = JSON.stringify(qrData);

    try {
      const url = await QRCode.toDataURL(qrContent, {
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 320,
        color: {
          dark: '#0F172A', // Dark slate
          light: '#FFFFFF'
        }
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error('Failed to generate detailed QR code:', err);
    }
  };

  const handleDeleteRequest = (id: string) => {
    // User specification: "listen whatever students delete it will store in history option so keep a history option"
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              isDeleted: true,
              deletedAt: Date.now()
            }
          : r
      )
    );
    setSuccessMessage('Item moved to History & Archive.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleRestoreRequest = (id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              isDeleted: false,
              deletedAt: undefined
            }
          : r
      )
    );
    setSuccessMessage('Request restored to Active tab.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!reason.trim()) {
      setValidationError('Please provide a specific reason for your request.');
      return;
    }
    if (!startDate) {
      setValidationError('Please select a valid start date.');
      return;
    }
    if (endDate && new Date(endDate) < new Date(startDate)) {
      setValidationError('End date must not be before the start date.');
      return;
    }
    if (!stayDuration || isNaN(Number(stayDuration)) || Number(stayDuration) <= 0) {
      setValidationError('Please specify how many days you will stay.');
      return;
    }
    if (requestType === 'gate_pass' && !destination.trim()) {
      setValidationError('Please specify your destination for the Gate Pass.');
      return;
    }
    if (!familyMobileNo.trim() || familyMobileNo.length < 10) {
      setValidationError('Please provide a valid 10-digit family mobile number.');
      return;
    }
    if (!roomNo.trim()) {
      setValidationError('Please provide your room number.');
      return;
    }

    const newRequest: CampusRequest = {
      id: `req-${Date.now().toString().slice(-5)}`,
      studentId: user?.studentId || 'CC-2024-CSE-042',
      studentName: user?.name || 'Aarav Mohapatra',
      studentRoll: user?.studentId || 'CC-2024-CSE-042',
      className: user?.className || 'B.Tech Computer Science',
      hostelId: user?.hostelId || 'Mahanadi Hall',
      type: requestType,
      reason: reason.trim(),
      startDate,
      endDate: endDate || undefined,
      destination: destination.trim() || undefined,
      familyMobileNo: familyMobileNo.trim(),
      roomNo: roomNo.trim(),
      semester: semester.trim(),
      stayDuration: Number(stayDuration),
      status: 'pending',
      wardenPhone: WARDEN_DEFAULT_PHONE,
      createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
    };

    setRequests([newRequest, ...requests]);
    setIsModalOpen(false);
    setReason('');
    setStartDate('');
    setEndDate('');
    setDestination('');
    setFamilyMobileNo('');
    setRoomNo('');
    setSemester('');
    setStayDuration('');
    setSuccessMessage('Your request has been submitted to Hostel Warden!');
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  // Helper to determine if an approved gatepass has exceeded the assigned stay duration
  const isPassExpired = (req: CampusRequest): boolean => {
    if (req.status !== 'approved' || req.type !== 'gate_pass') return false;
    if (!req.expiresAt && req.approvedAt) {
      // Default fallback: 1 day if expiresAt not set
      return nowTime >= req.approvedAt + 24 * 60 * 60 * 1000;
    }
    return req.expiresAt ? nowTime >= req.expiresAt : false;
  };

  // Active requests: NOT deleted AND NOT expired gate passes
  const activeRequests = requests.filter((r) => {
    if (r.isDeleted) return false;
    // User specification: "and after approval logic for the assigned days... vanish from active and store in history."
    if (r.status === 'approved' && r.type === 'gate_pass' && isPassExpired(r)) {
      return false;
    }
    return true;
  });

  // History requests: Deleted items OR expired gate passes OR old completed leaves
  const historyRequests = requests.filter((r) => {
    if (r.isDeleted) return true;
    if (r.status === 'approved' && r.type === 'gate_pass' && isPassExpired(r)) {
      return true;
    }
    return false;
  });

  const displayList = activeTab === 'active' ? activeRequests : historyRequests;

  // Format countdown for multi-day validity
  const formatCountdown = (expiresAt?: number, approvedAt?: number): string => {
    const target = expiresAt || (approvedAt ? approvedAt + 24 * 60 * 60 * 1000 : 0);
    const diff = target - nowTime;
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.requests}</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Submit and track hostel gate-passes and academic leave permissions
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.newGatePassOrLeave}</span>
        </button>
      </div>

      {/* Warden Helpline Banner with Emergency Contact */}
      <div className="p-4 bg-gradient-to-br from-amber-50 via-white to-amber-50 border border-amber-200 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm block">Hostel Warden Official Hotline</span>
              <span className="text-slate-500 text-xs">
                Dr. Ramesh Chandra Sahoo • Mahanadi Hall
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center sm:text-right">
              Emergency Gate Pass / Urgent Morning Exit:
            </span>
            <div className="flex gap-2">
              <a
                href={`tel:${WARDEN_DEFAULT_PHONE}`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Warden</span>
              </a>
              <a
                href="tel:9668139559"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-200" />
                <span>Asst. Warden</span>
              </a>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-amber-800 bg-amber-100/50 p-2.5 rounded-lg border border-amber-200/50 leading-relaxed italic">
          <strong>Note:</strong> If you need to leave the campus in an emergency (e.g., early morning or sudden health issue), please use the buttons above to call the Warden or Assistant Warden directly. Your safety is our priority.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tabs: Active Requests vs History & Archive */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition ${
            activeTab === 'active'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          {t.activeRequests} ({activeRequests.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition ${
            activeTab === 'history'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          {t.historyAndArchive} ({historyRequests.length})
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {displayList.length === 0 ? (
          <EmptyState
            icon={FileText}
            title={activeTab === 'active' ? 'No Active Requests' : 'History is Empty'}
            description={
              activeTab === 'active'
                ? 'You do not have any pending or active gate passes right now.'
                : 'No expired passes or deleted items in history archive.'
            }
            actionText={activeTab === 'active' ? t.newGatePassOrLeave : undefined}
            onAction={activeTab === 'active' ? () => setIsModalOpen(true) : undefined}
          />
        ) : (
          displayList.map((req) => {
            const expired = isPassExpired(req);
            const isApprovedGatePass = req.status === 'approved' && req.type === 'gate_pass';

            return (
              <Card
                key={req.id}
                className={`transition ${
                  req.isDeleted ? 'border-dashed border-slate-300 opacity-90' : 'hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                        {req.type === 'gate_pass' ? '🚪 Gate Pass' : '✈️ Campus Leave'}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">#{req.id}</span>
                      {req.isDeleted && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                          {t.deletedByStudent}
                        </span>
                      )}
                      {expired && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                          {t.expired} (Stay duration elapsed)
                        </span>
                      )}
                    </div>
                    <Badge variant={expired ? 'rejected' : req.status} />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{req.reason}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Start: {new Date(req.startDate).toLocaleDateString()}
                      </span>
                      {req.endDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          End: {new Date(req.endDate).toLocaleDateString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-bold text-indigo-600">
                        <Clock className="w-3.5 h-3.5" />
                        Stay: {req.stayDuration || 1} Days {req.semester && `• ${req.semester}`}
                      </span>
                      {req.destination && (
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {req.destination}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* SPECIAL APPROVED GATE PASS WITH QR CODE VALID FOR ASSIGNED DAYS */}
                  {isApprovedGatePass && !expired && !req.isDeleted && (
                    <div className="p-4 bg-emerald-50/90 border border-emerald-300 rounded-xl space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-emerald-950 block">
                              {t.qrValidStayDays}
                            </span>
                            <span className="text-[11px] text-emerald-800">
                              {t.validForStayDaysNote}
                            </span>
                          </div>
                        </div>

                        {/* Live Countdown */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-emerald-900 font-mono font-bold text-xs self-start sm:self-auto shadow-2xs">
                          <Timer className="w-4 h-4 text-emerald-600 animate-pulse" />
                          <span>Validity: {formatCountdown(req.expiresAt, req.approvedAt)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-emerald-200">
                        <p className="text-[11px] text-emerald-900 font-medium">
                          Security at Main Gate will scan your QR code. Valid only for the duration of your stay.
                        </p>
                        <button
                          type="button"
                          onClick={() => handleOpenQrModal(req)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm cursor-pointer transition"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>{t.showSecurityQr}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Expired notice banner */}
                  {isApprovedGatePass && expired && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>Gate Pass QR Expired (Stay Duration Elapsed)</span>
                      </div>
                      <p className="text-[11px] text-rose-700">
                        {t.passExpiredDaysNotice}
                      </p>
                    </div>
                  )}

                  {/* REJECTION REASON DISPLAY */}
                  {req.status === 'rejected' && (
                    <div className="p-3.5 bg-rose-50/90 border border-rose-200 rounded-xl text-xs space-y-1.5">
                      <div className="flex items-center gap-2 text-rose-900 font-bold">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{t.rejectionReasonLabel}:</span>
                      </div>
                      <p className="text-rose-800 font-medium bg-white/70 p-2.5 rounded-lg border border-rose-200 leading-relaxed">
                        {req.reviewNote || 'Curfew hours / Incomplete guardian authorization / Disciplinary hold.'}
                      </p>
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-rose-700 pt-1">
                        <span>Reviewed By: {req.reviewedByName || 'Hostel Warden'}</span>
                        <span className="font-semibold">{t.wardenMobile}: {req.wardenPhone || WARDEN_DEFAULT_PHONE}</span>
                      </div>
                    </div>
                  )}

                  {/* Review note for leaves */}
                  {req.status === 'approved' && req.type === 'leave' && req.reviewNote && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                      <p className="font-semibold text-slate-800">
                        Reviewer Note ({req.reviewedByName || 'Warden'}):
                      </p>
                      <p className="text-slate-600 mt-0.5">{req.reviewNote}</p>
                    </div>
                  )}

                  {/* Footer with Actions (Delete / Restore) */}
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-50 flex items-center justify-between">
                    <span>Submitted on: {String(req.createdAt)}</span>
                    <div className="flex items-center gap-2">
                      {!req.isDeleted ? (
                        <button
                          type="button"
                          onClick={() => handleDeleteRequest(req.id)}
                          className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                          title="Move to History"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{t.delete}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRestoreRequest(req.id)}
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                          title="Restore to Active"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{t.restore}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* 30-MINUTE SECURITY QR MODAL (JUST SHOW STUDENT NAME AND CLASS) */}
      {selectedQrRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Main Gate Security Pass</h3>
                  <p className="text-[10px] text-emerald-300">Valid for assigned stay duration</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQrRequest(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QR Card Body */}
            <div className="p-6 text-center space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl inline-block shadow-inner">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Main Gate Exit QR Code"
                    className="w-48 h-48 mx-auto rounded-lg"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-400">
                    Generating Security QR...
                  </div>
                )}
              </div>

              {/* Minimal Information Display as specifically instructed */}
              <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-left space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Student Name:</span>
                  <span className="font-bold text-slate-900">{selectedQrRequest.studentName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Class:</span>
                  <span className="font-bold text-slate-900">
                    {selectedQrRequest.className || user?.className || 'B.Tech CSE'}
                  </span>
                </div>
                {selectedQrRequest.semester && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Year/Sem:</span>
                    <span className="font-bold text-slate-900">
                      {selectedQrRequest.semester}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1 font-semibold text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  Validity:
                </span>
                <span className="font-mono font-bold text-amber-900">
                  {formatCountdown(selectedQrRequest.expiresAt, selectedQrRequest.approvedAt)}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 leading-snug">
                {t.validForStayDaysNote}
              </p>

              <button
                type="button"
                onClick={() => setSelectedQrRequest(null)}
                className="w-full py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs cursor-pointer"
              >
                Done / Close Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Gate Pass / Leave Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{t.newGatePassOrLeave}</h3>
                <p className="text-xs text-slate-500">Subject to Warden approval (QR valid for assigned stay duration)</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {validationError && (
                <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs border border-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Request Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRequestType('gate_pass')}
                    className={`p-2.5 rounded-lg text-xs font-semibold border cursor-pointer text-center transition ${
                      requestType === 'gate_pass'
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🚪 Day / Weekend Gate Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestType('leave')}
                    className={`p-2.5 rounded-lg text-xs font-semibold border cursor-pointer text-center transition ${
                      requestType === 'leave'
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    ✈️ Multi-Day Academic Leave
                  </button>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t.reason} *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explain why you need leave or a gate pass..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Stay Duration */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">How many days you stay? *</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 3"
                  value={stayDuration}
                  onChange={(e) => setStayDuration(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination {requestType === 'gate_pass' && '*'}
                </label>
                <input
                  type="text"
                  placeholder="e.g., Sector 5 Market / Native Home"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Family Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Family Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={familyMobileNo}
                  onChange={(e) => setFamilyMobileNo(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Room Number & Year/Semester */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Room Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 304"
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year (Semester) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3rd Year (6th Sem)"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs cursor-pointer"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
