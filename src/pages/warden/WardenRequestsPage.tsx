import React, { useState, useEffect } from 'react';
import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  User,
  AlertCircle,
  Phone,
  Calendar,
  Building2,
  ShieldAlert
} from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { EmptyState } from '../../components/common/EmptyState.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { CampusRequest } from '../../types/index.ts';
import { saveNotification } from '../../utils/notificationService.ts';

const STORAGE_KEY = 'campusconnect_requests';
const WARDEN_MOBILE = '+91 98610 99887';

export const WardenRequestsPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [requests, setRequests] = useState<CampusRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [reviewNote, setReviewNote] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'pending' | 'reviewed'>('pending');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [requests]);

  const handleDecision = (id: string, decision: 'approved' | 'rejected') => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;

    const customNote = reviewNote[id]?.trim();
    const defaultApproveNote = 'Verified with guardian. Approved for the requested duration.';
    const defaultRejectNote = 'Request rejected: Parental consent not verified or curfew hours.';
    const finalNote = customNote || (decision === 'approved' ? defaultApproveNote : defaultRejectNote);

    const now = Date.now();
    // Valid for student's specified stayDuration in days
    const durationDays = req.stayDuration || 1;
    const expiresAt = decision === 'approved' ? now + (durationDays * 24 * 60 * 60 * 1000) : undefined;

    const updated = requests.map((r) =>
      r.id === id
        ? {
            ...r,
            status: decision,
            reviewedBy: user?.uid || 'demo-warden-01',
            reviewedByName: user?.name || 'Dr. Ramesh Chandra Sahoo (Hostel Warden)',
            reviewNote: finalNote,
            wardenPhone: user?.phone || WARDEN_MOBILE,
            approvedAt: decision === 'approved' ? now : undefined,
            expiresAt: expiresAt,
            updatedAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
          }
        : r
    );

    setRequests(updated);

    // Broadcast in-app notification to the student's notification bell
    if (decision === 'approved') {
      saveNotification({
        type: 'request',
        title: `Gate Pass #${id} Approved`,
        body: `Your gate pass has been approved by the Warden. The exit QR is valid for ${durationDays} days as per your request.`,
        senderName: user?.name || 'Hostel Warden',
        relatedDocumentId: id
      });
    } else {
      saveNotification({
        type: 'request',
        title: `Gate Pass #${id} Rejected`,
        body: `Your request was rejected. Reason: ${finalNote}`,
        senderName: user?.name || 'Hostel Warden',
        relatedDocumentId: id
      });
    }

    setActionSuccess(
      decision === 'approved'
        ? `Request #${id} APPROVED. Digital Gate Pass valid for ${durationDays} days issued.`
        : `Request #${id} REJECTED. Reason recorded and notified to student.`
    );
    setTimeout(() => setActionSuccess(null), 5000);
  };

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const reviewedRequests = requests.filter((r) => r.status !== 'pending');
  const displayRequests = activeTab === 'pending' ? pendingRequests : reviewedRequests;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.requests} (Warden Review)</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Approve or reject student gate passes and overnight leave permissions
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-900 rounded-lg border border-amber-200 text-xs font-semibold self-start sm:self-auto">
          <Phone className="w-3.5 h-3.5 text-amber-700" />
          <span>Warden Mobile: {user?.phone || WARDEN_MOBILE}</span>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
            activeTab === 'pending'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Pending Review ({pendingRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('reviewed')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
            activeTab === 'reviewed'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Decision History ({reviewedRequests.length})
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {displayRequests.length === 0 ? (
          <EmptyState
            icon={FileText}
            title={activeTab === 'pending' ? 'No Pending Requests' : 'No Past History'}
            description={
              activeTab === 'pending'
                ? 'All student gate passes and leave requests have been reviewed.'
                : 'No historical approvals or rejections found.'
            }
          />
        ) : (
          displayRequests.map((req) => (
            <Card key={req.id} className="hover:border-slate-300 transition">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {req.type === 'gate_pass' ? '🚪 Gate Pass' : '✈️ Campus Leave'}
                    </span>
                    <span className="font-mono text-xs text-slate-400">#{req.id}</span>
                  </div>
                  <Badge variant={req.status} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{req.reason}</h3>
                    <div className="mt-2 space-y-1 text-xs text-slate-600">
                      <p className="flex items-center gap-1.5 font-medium text-slate-800">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {req.studentName} ({req.studentRoll || req.studentId})
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        Destination: {req.destination || 'Not specified'}
                      </p>
                      <p className="flex items-center gap-1.5 font-bold text-indigo-700">
                        <Phone className="w-3.5 h-3.5" />
                        Family Mobile: {req.familyMobileNo || 'N/A'}
                      </p>
                      <p className="flex items-center gap-1.5 font-bold text-indigo-700">
                        <Clock className="w-3.5 h-3.5" />
                        Stay Duration: {req.stayDuration || 1} Days
                      </p>
                      {req.roomNo && (
                        <p className="flex items-center gap-1.5 font-bold text-indigo-700">
                          <Building2 className="w-3.5 h-3.5" />
                          Room No: {req.roomNo} {req.semester && `• Year/Sem: ${req.semester}`}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="font-semibold text-slate-700">Schedule:</p>
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Start Date: {new Date(req.startDate).toLocaleDateString()}
                    </p>
                    {req.endDate && (
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        End Date: {new Date(req.endDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Reviewer Action Controls for Pending */}
                {req.status === 'pending' ? (
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Reviewer Note / Rejection Reason (If rejecting, specify the reason here):
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Parental consent confirmed / Rejection reason: Disciplinary hold or curfew hours..."
                        value={reviewNote[req.id] || ''}
                        onChange={(e) => setReviewNote({ ...reviewNote, [req.id]: e.target.value })}
                        className="w-full p-2 text-xs border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleDecision(req.id, 'rejected')}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg cursor-pointer transition"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{t.reject}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDecision(req.id, 'approved')}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs cursor-pointer transition"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t.approve}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                    <p className="font-semibold text-slate-800">
                      Warden Decision: <span className="font-bold uppercase text-indigo-700">{req.status}</span> by {req.reviewedByName}
                    </p>
                    <p className="text-slate-600">
                      <span className="font-medium text-slate-700">Note / Reason: </span>
                      {req.reviewNote}
                    </p>
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Reviewed at: {String(req.updatedAt)}</span>
                      <span>Warden Contact: {req.wardenPhone || WARDEN_MOBILE}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
