import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertCircle, ArrowRight, KeyRound, Calendar, Hash } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { Card } from '../common/Card.tsx';

interface AttendanceGateModalProps {
  onSuccess?: () => void;
}

export const AttendanceGateModal: React.FC<AttendanceGateModalProps> = ({ onSuccess }) => {
  const { verifyAndUnlockAttendance } = useAuth();
  const { t } = useLanguage();

  const [inputReg, setInputReg] = useState('');
  const [inputDob, setInputDob] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!inputReg.trim()) {
      setError('Please enter your Registration Number.');
      return;
    }
    if (!inputDob.trim()) {
      setError('Please enter your Date of Birth.');
      return;
    }

    const success = verifyAndUnlockAttendance(inputReg, inputDob);
    if (success) {
      if (onSuccess) onSuccess();
    } else {
      setError(
        'Verification failed: Credentials do not match our records.'
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8">
      <Card className="border-indigo-100 shadow-lg">
        <div className="text-center py-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-700 flex items-center justify-center shadow-xs mb-3">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Attendance Security Verification</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            To view biometric lecture attendance logs and exam eligibility, please authenticate with your Registration Number and Date of Birth.
          </p>
        </div>

        <form onSubmit={handleVerify} className="mt-4 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student Registration Number *
            </label>
            <div className="relative">
              <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                placeholder="e.g., CC-2024-CSE-042"
                value={inputReg}
                onChange={(e) => setInputReg(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date of Birth (DOB) *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="date"
                required
                value={inputDob}
                onChange={(e) => setInputDob(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>Verify & View Attendance Records</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>


        </form>
      </Card>
    </div>
  );
};
