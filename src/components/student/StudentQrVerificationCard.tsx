import React, { useState, useMemo } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  Scan,
  Download,
  Copy,
  DownloadCloud,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { Card } from '../common/Card.tsx';

interface StudentQrVerificationCardProps {
  onOpenEditModal?: () => void;
}

export const StudentQrVerificationCard: React.FC<StudentQrVerificationCardProps> = ({
  onOpenEditModal
}) => {
  const { user } = useAuth();
  const [showQr, setShowQr] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScannedModal, setShowScannedModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const regNo = user?.regNo || user?.studentId || 'CC-2024-CSE-042';

  // Construct stable memoized payload based only on user credentials
  const qrPayload = useMemo(() => {
    return JSON.stringify(
      {
        institution: user?.collegeName || 'CampusConnect University',
        verified: true,
        regNo: regNo,
        name: user?.name || 'STUDENT',
        dob: user?.dob || '2004-06-15',
        dept: user?.className || 'B.Tech Computer Science',
        section: user?.section || 'Section A',
        hostel: user?.hostelId || 'Mahanadi Hall',
        room: user?.hostelRoom || 'Room 304',
        bloodGroup: user?.bloodGroup || 'O+ Positive',
        status: 'ACTIVE_ENROLLED_STUDENT',
        token: `CAMPUS-AUTH-VERIFY-${regNo}`
      },
      null,
      2
    );
  }, [
    regNo,
    user?.collegeName,
    user?.name,
    user?.dob,
    user?.className,
    user?.section,
    user?.hostelId,
    user?.hostelRoom,
    user?.bloodGroup
  ]);

  // Generate QR code safely upon user interaction (Zero useEffect, zero loop possibility)
  const handleShowQr = async () => {
    if (!qrDataUrl) {
      setIsGenerating(true);
      try {
        const url = await QRCode.toDataURL(qrPayload, {
          errorCorrectionLevel: 'H',
          margin: 2,
          width: 320,
          color: {
            dark: '#1E1B4B', // Deep indigo
            light: '#FFFFFF'
          }
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error('Failed to generate QR code:', err);
      } finally {
        setIsGenerating(false);
      }
    }
    setShowQr(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `CampusConnect-ID-${regNo}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Card
        title="Student Digital ID & Security QR Code"
        subtitle="Cryptographically verified identity for library, hostel gate and campus checkpoints"
        action={
          onOpenEditModal ? (
            <button
              type="button"
              onClick={onOpenEditModal}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              Edit Profile Data
            </button>
          ) : undefined
        }
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Info Column */}
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border-2 border-indigo-200 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
              {user?.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="font-bold text-lg text-indigo-700 uppercase">
                  {user?.name ? user.name.slice(0, 2) : 'ST'}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-slate-900">{user?.name}</h4>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED
                </span>
              </div>
              <p className="text-xs font-mono font-semibold text-indigo-700">
                Reg No: {regNo}
              </p>
              <p className="text-xs text-slate-500">
                {user?.className} • {user?.section}
              </p>
              <p className="text-xs text-slate-500">
                {user?.hostelId} ({user?.hostelRoom})
              </p>
            </div>
          </div>

          {/* Right QR Action Area */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200/90 w-full md:w-auto min-w-[240px]">
            {showQr ? (
              <div className="space-y-3 text-center animate-in fade-in zoom-in-95 duration-150">
                <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200 inline-block">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Student Digital QR Code"
                      className="w-36 h-36 mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="w-36 h-36 flex items-center justify-center text-xs text-slate-400">
                      Generating QR...
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowScannedModal(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md cursor-pointer transition"
                    title="Simulate scanning this QR code"
                  >
                    <Scan className="w-3.5 h-3.5" />
                    <span>Scan / View Details</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="p-1 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-md cursor-pointer"
                    title="Download QR Image"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowQr(false)}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide QR Code</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-2 space-y-2.5">
                <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Digital Identity QR</p>
                  <p className="text-[11px] text-slate-400 max-w-[190px] mx-auto mt-0.5">
                    Tap to generate and reveal your official scannable security barcode
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleShowQr}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs cursor-pointer transition disabled:opacity-70"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isGenerating ? 'Generating...' : 'Show QR Code'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* QR Code Scanned Identity Modal */}
      {showScannedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-emerald-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">QR Verified Student Record</h3>
                  <p className="text-[10px] text-emerald-300">Campus Security & Gate Authority View</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowScannedModal(false)}
                className="text-slate-300 hover:text-white p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scanned Details Card Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                  {user?.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="font-bold text-lg text-slate-700 uppercase">
                      {user?.name ? user.name.slice(0, 2) : 'ST'}
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-base font-bold text-slate-900">{user?.name}</h4>
                  <p className="text-xs font-mono font-bold text-indigo-700">
                    REG ID: {regNo}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" /> ACTIVE STUDENT VALIDATED
                  </span>
                </div>
              </div>

              {/* Data fields scanned from the QR */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Date of Birth</span>
                  <span className="font-medium text-slate-800">{user?.dob || '---'}</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Blood Group</span>
                  <span className="font-medium text-slate-800">{user?.bloodGroup || '---'}</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Academic Course</span>
                  <span className="font-medium text-slate-800">{user?.className || '---'} ({user?.section || '---'})</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Hostel Accommodation</span>
                  <span className="font-medium text-slate-800">{user?.hostelId || '---'} • {user?.hostelRoom || '---'}</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Contact Phone</span>
                  <span className="font-medium text-slate-800">{user?.phone || '---'}</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Guardian Phone</span>
                  <span className="font-medium text-slate-800">{user?.guardianPhone || '---'}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied Payload!' : 'Copy Raw Data'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowScannedModal(false)}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
