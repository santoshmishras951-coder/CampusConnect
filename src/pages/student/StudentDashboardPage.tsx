import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  FileText,
  AlertCircle,
  ArrowRight,
  Clock,
  MapPin,
  Bell,
  Building2,
  GraduationCap,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { StudentQrVerificationCard } from '../../components/student/StudentQrVerificationCard.tsx';
import { getStoredNotices } from '../../utils/notificationService.ts';
import { NoticeItem } from '../../types/index.ts';

export const StudentDashboardPage: React.FC = () => {
  const { user, isAttendanceUnlocked } = useAuth();
  const { t, language } = useLanguage();
  const [notices, setNotices] = useState<NoticeItem[]>(() => getStoredNotices());

  useEffect(() => {
    const handleUpdate = () => {
      setNotices(getStoredNotices());
    };
    window.addEventListener('campusconnect:notices_updated', handleUpdate);
    return () => {
      window.removeEventListener('campusconnect:notices_updated', handleUpdate);
    };
  }, []);

  const regNo = user?.regNo || user?.studentId || '---';

  const stats = [
    {
      label: t.attendance,
      value: '84.6%',
      subtext: isAttendanceUnlocked ? '33 of 39 sessions attended' : 'Unlock with Reg No + DOB',
      icon: CalendarCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: t.requests,
      value: '1',
      subtext: 'Warden approval workflow active',
      icon: FileText,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      label: t.complaints,
      value: '1',
      subtext: 'Campus assistance helpdesk',
      icon: AlertCircle,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      label: t.notices,
      value: String(notices.length),
      subtext: notices.length === 0 ? t.noNoticesBlank : 'Official authority circulars',
      icon: Bell,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Student Identity Hero Banner with Photo and College Name */}
      <div className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-purple-700 to-indigo-900 rounded-3xl p-8 text-white shadow-xl border border-white/10 group transition-all duration-500">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl group-hover:bg-indigo-300/30 transition-all duration-700" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Avatar & Student Credentials */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-indigo-800/80 border-2 border-indigo-400/50 shadow-md overflow-hidden flex items-center justify-center shrink-0">
              {user?.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="font-bold text-2xl text-indigo-200 uppercase">
                  {user?.name ? user.name.slice(0, 2) : 'ST'}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 uppercase tracking-wider">
                  Enrolled Student
                </span>
                <span className="text-xs font-mono font-bold text-indigo-300">
                  ID: {regNo}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
                WELCOME {user?.name || 'STUDENT'}!
              </h1>
              {user?.collegeName && (
                <p className="text-xs sm:text-sm font-semibold text-indigo-200 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{user.collegeName}</span>
                </p>
              )}
              <p className="text-xs text-slate-300">
                {user?.className || 'B.Tech Computer Science'} • {user?.section || 'Section A'}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-indigo-100 pt-2">
                <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg border border-white/5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-300" />
                  {user?.hostelId || 'Hostel Hall'} ({user?.hostelRoom || 'Room'})
                </span>
                <span className="flex items-center gap-1 font-mono bg-white/10 px-2 py-1 rounded-lg border border-white/5">
                  DOB: {user?.dob || '---'}
                </span>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('campusconnect:open_profile_edit'))}
                  className="flex items-center gap-1.5 px-3 py-1 bg-white text-indigo-700 rounded-lg font-bold text-[10px] hover:bg-indigo-50 transition-colors shadow-sm cursor-pointer"
                >
                  <PlusCircle className="w-3 h-3" />
                  Edit Academic & Hostel Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Student Digital ID & QR Verification Card */}
      <StudentQrVerificationCard />

      {/* Emergency Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-900">Emergency Gate Pass</h3>
              <p className="text-[11px] text-rose-700">Call Warden immediately for morning/urgent exit</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="tel:+919861099887"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-rose-700 transition"
            >
              Call Warden
            </a>
            <a
              href="tel:9668139559"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-rose-300 text-rose-700 text-xs font-bold rounded-lg shadow-xs hover:bg-rose-50 transition"
            >
              Asst. Warden
            </a>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-indigo-900">GEC Student Helpline</h3>
              <p className="text-[11px] text-indigo-700">Official college desk for academic issues</p>
            </div>
          </div>
          <a
            href="tel:06742589632"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-indigo-700 transition"
          >
            Contact Desk
          </a>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="hover:border-slate-300 transition">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{stat.subtext}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.bgColor} ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Student Dossier & Live Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Dossier Quick Card */}
        <Card
          title="Registered Student Dossier"
          subtitle="Verified academic and hostel records"
        >
          <div className="space-y-2 text-xs">
            {user?.collegeName && (
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">{t.collegeName}:</span>
                <span className="font-semibold text-indigo-700 text-right">{user.collegeName}</span>
              </div>
            )}
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">{t.studentId}:</span>
              <span className="font-mono font-bold text-slate-800">{regNo}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">{t.dateOfBirth}:</span>
              <span className="font-mono text-slate-800">{user?.dob || '2004-06-15'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">{t.hostelRoom}:</span>
              <span className="font-semibold text-slate-800">{user?.hostelId} ({user?.hostelRoom})</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Blood Group:</span>
              <span className="font-semibold text-rose-700">{user?.bloodGroup || 'O+'}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500 font-medium">Emergency Phone:</span>
              <span className="font-semibold text-slate-800">{user?.guardianPhone || user?.phone}</span>
            </div>
          </div>
        </Card>

        {/* Notices and Quick Activity */}
        <Card
          title={t.notices}
          subtitle={t.noticeBoardDesc}
          action={
            <Link
              to="/student/notices"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              {t.viewDetails} <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          <div className="space-y-3">
            {notices.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-30 text-slate-500" />
                <p className="text-xs font-semibold text-slate-700">{t.noNoticesBlank}</p>
                <p className="text-[11px] text-slate-400 mt-1">{t.facultyNoticeWaiting}</p>
              </div>
            ) : (
              notices.slice(0, 3).map((n) => {
                let displayTitle = n.title;
                if (language === 'odia' && n.titleOr) displayTitle = n.titleOr;
                else if (language === 'hindi' && n.titleHi) displayTitle = n.titleHi;
                else if (language === 'telugu' && n.titleTe) displayTitle = n.titleTe;
                else if (language === 'chinese' && n.titleZh) displayTitle = n.titleZh;

                return (
                  <div key={n.id} className="p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        {n.targetType}
                      </span>
                      {n.priority === 'urgent' && <Badge variant="urgent" label="Urgent" />}
                    </div>
                    <h5 className="text-xs font-semibold text-slate-800 leading-snug">{displayTitle}</h5>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {String(n.publishedAt)}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
