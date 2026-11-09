import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  FileText,
  AlertCircle,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Bell,
  X,
  Send
} from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { publishNewNotice } from '../../utils/notificationService.ts';

export const WardenDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeBody, setNoticeBody] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [broadcastAlert, setBroadcastAlert] = useState<string | null>(null);

  const handleBroadcastHostelNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeBody.trim()) return;

    publishNewNotice({
      title: noticeTitle.trim(),
      body: noticeBody.trim(),
      targetType: 'hostel',
      publishedBy: user?.uid || 'warden-01',
      publishedByName: 'Chief Hostel Warden (Mahanadi Hall)',
      priority: isUrgent ? 'urgent' : 'normal'
    });

    setIsNoticeModalOpen(false);
    setNoticeTitle('');
    setNoticeBody('');
    setBroadcastAlert('Hostel circular broadcast to student notification bells and notice board!');
    setTimeout(() => setBroadcastAlert(null), 5000);
  };

  const metrics = [
    { label: 'Pending Gate Passes', value: '3', subtext: 'Awaiting departure review', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Hostel Grievances', value: '4', subtext: '2 water, 1 electricity, 1 wifi', icon: AlertCircle, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Hostel Residents', value: '240', subtext: 'Mahanadi Hall (Blocks A & B)', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Night Gate Curfew', value: '09:30 PM', subtext: 'Active biometric lockdown', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-linear-to-br from-amber-700 via-slate-800 to-indigo-900 rounded-3xl p-8 text-white shadow-xl border border-white/10 group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/30 text-amber-200 border border-amber-400/30 uppercase tracking-widest">
            Hostel Administration Portal
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mt-2 drop-shadow-md uppercase">
            WELCOME {user?.name || 'WARDEN'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Mahanadi Hall of Residence • University Central Campus • Mob: +91 98610 99887
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsNoticeModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 shadow-xs transition cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 text-indigo-600" />
            <span>Broadcast Hostel Notice</span>
          </button>
          <Link
            to="/warden/requests"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-xs transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Review Gate Passes</span>
          </Link>
          <Link
            to="/warden/complaints"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Hostel Issues</span>
          </Link>
        </div>
      </div>

      {broadcastAlert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{broadcastAlert}</span>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Card key={idx}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">{m.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{m.value}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{m.subtext}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${m.bg} ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Action Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Gate Passes Awaiting Decision"
          subtitle="Recent student gate-pass submissions"
          action={
            <Link to="/warden/requests" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              Open Queue <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900 uppercase">Verification Queue</p>
                <p className="text-xs text-slate-500 mt-0.5">Check recent gate-pass submissions from hostel residents</p>
                <span className="text-[10px] text-slate-400">Status: Awaiting Review</span>
              </div>
              <Link
                to="/warden/requests"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shrink-0"
              >
                Review
              </Link>
            </div>
          </div>
        </Card>

        <Card
          title="Hostel Facility Grievances"
          subtitle="Pending plumbing, electrical, and internet tickets"
          action={
            <Link to="/warden/complaints" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    WIFI
                  </span>
                  <p className="text-xs font-bold text-slate-900">High Packet Loss on 3rd Floor</p>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Mahanadi Hall, 3rd Floor Corridor</p>
              </div>
              <span className="text-xs font-semibold text-indigo-600">In Progress</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Broadcast Modal */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Broadcast Hostel Authority Circular</h3>
                <p className="text-xs text-slate-500">Notifies all hostel students immediately in their bell dropdown and notice board</p>
              </div>
              <button
                type="button"
                onClick={() => setIsNoticeModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleBroadcastHostelNotice} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Circular Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Night Biometric Gate Lock at 09:30 PM & Mess Routine"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Announcement Details *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Full text of the announcement for hostel residents..."
                  value={noticeBody}
                  onChange={(e) => setNoticeBody(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-amber-800 font-semibold">Flag as Urgent Hostel Circular</span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNoticeModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Broadcast Circular</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
