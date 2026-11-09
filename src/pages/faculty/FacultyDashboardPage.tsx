import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  BookOpen,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  Bell,
  PlusCircle,
  X,
  AlertCircle
} from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { publishNewNotice } from '../../utils/notificationService.ts';
import { NoticeTargetType } from '../../types/index.ts';

export const FacultyDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeBody, setNoticeBody] = useState('');
  const [noticeTarget, setNoticeTarget] = useState<NoticeTargetType>('all');
  const [isUrgent, setIsUrgent] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeBody.trim()) return;

    publishNewNotice({
      title: noticeTitle.trim(),
      body: noticeBody.trim(),
      targetType: noticeTarget,
      publishedBy: user?.name || 'Prof. Subhashree Dash',
      publishedByName: `${user?.name || 'Faculty Member'} (${user?.className || 'CSE Dept'})`,
      priority: isUrgent ? 'urgent' : 'normal'
    });

    setSuccessMsg('Notice officially published to Student Notice Board & notified via Bell icon!');
    setNoticeTitle('');
    setNoticeBody('');
    setIsUrgent(false);
    setIsNoticeModalOpen(false);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  const metrics = [
    { label: 'Assigned Classes', value: '3', subtext: 'CSE 3rd & 4th Year', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Today Lectures', value: '2', subtext: 'CS301 & CS304', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Students', value: '118', subtext: 'Across Sec A & B', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg Attendance', value: '86.4%', subtext: 'This semester', icon: CalendarCheck, color: 'text-teal-600', bg: 'bg-teal-50' }
  ];

  const todayClasses = [
    { code: 'CS301', title: 'Computer Networks', time: '09:00 - 10:00 AM', room: 'LH-204', batch: 'CSE-3A (58 students)', marked: true },
    { code: 'CS304', title: 'Software Engineering', time: '02:00 - 03:00 PM', room: 'LH-204', batch: 'CSE-3A (58 students)', marked: false }
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-linear-to-br from-indigo-900 via-slate-900 to-emerald-900 rounded-3xl p-8 text-white shadow-xl border border-white/10 group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 uppercase tracking-widest">
            Faculty Portal
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mt-2 drop-shadow-md uppercase">
            WELCOME {user?.name || 'FACULTY'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Department of Computer Science & Engineering • CampusConnect
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsNoticeModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-white text-indigo-950 hover:bg-indigo-50 shadow-xs transition cursor-pointer"
          >
            <Bell className="w-4 h-4 text-indigo-600" />
            <span>Publish Notice for Students</span>
          </button>
          <Link
            to="/faculty/attendance"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-xs transition"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{t.markAttendance}</span>
          </Link>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
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

      {/* Class Schedule and Attendance Status */}
      <Card
        title="Today's Teaching Schedule"
        subtitle="Mark attendance or verify class logs"
        action={
          <Link to="/faculty/attendance" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            Mark Session <ArrowRight className="w-3 h-3" />
          </Link>
        }
      >
        <div className="space-y-3">
          {todayClasses.map((cls, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                  {cls.code}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{cls.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{cls.batch} • Room: {cls.room}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {cls.time}
                </span>
                {cls.marked ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Marked
                  </span>
                ) : (
                  <Link
                    to="/faculty/attendance"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Mark Now
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Publish Notice Modal for Faculty */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Publish Official Student Circular</h3>
                <p className="text-xs text-slate-500">Will immediately appear on student notice board and bell notifications</p>
              </div>
              <button
                type="button"
                onClick={() => setIsNoticeModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePublishNotice} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Title / Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Mid-Semester Examination Schedule Released"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Audience</label>
                <select
                  value={noticeTarget}
                  onChange={(e) => setNoticeTarget(e.target.value as NoticeTargetType)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">Entire University Campus (All Students)</option>
                  <option value="class">CSE Department Classes</option>
                  <option value="hostel">Hostel Residents</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Notice Content *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter the official details, instructions, and dates for students..."
                  value={noticeBody}
                  onChange={(e) => setNoticeBody(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="urgentFlag"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <label htmlFor="urgentFlag" className="text-xs text-slate-700 font-medium cursor-pointer">
                  Mark as Urgent Priority Circular
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNoticeModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs cursor-pointer"
                >
                  {t.publishNotice}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
