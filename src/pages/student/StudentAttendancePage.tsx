import React, { useState } from 'react';
import { CalendarCheck, AlertCircle, CheckCircle, Clock, Lock, KeyRound } from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { AttendanceGateModal } from '../../components/student/AttendanceGateModal.tsx';

export const StudentAttendancePage: React.FC = () => {
  const { user, isAttendanceUnlocked, lockAttendance } = useAuth();
  const { t } = useLanguage();

  const regNo = user?.regNo || user?.studentId || 'CC-2024-CSE-042';

  // If not unlocked, show the registration number + DOB verification gate
  if (!isAttendanceUnlocked) {
    return <AttendanceGateModal />;
  }

  const subjectStats = [
    { code: 'CS301', name: 'Computer Networks', total: 10, attended: 9, percentage: 90 },
    { code: 'CS302', name: 'Database Management Systems', total: 10, attended: 8, percentage: 80 },
    { code: 'CS303', name: 'Formal Language & Automata', total: 10, attended: 9, percentage: 90 },
    { code: 'CS304', name: 'Software Engineering', total: 9, attended: 7, percentage: 77.8 }
  ];

  const recentLogs = [
    { date: '2026-10-14', subject: 'Computer Networks', time: '09:00 AM', status: 'present', markedBy: 'Prof. S. Dash' },
    { date: '2026-10-14', subject: 'Database Management Systems', time: '10:15 AM', status: 'present', markedBy: 'Dr. P. Patra' },
    { date: '2026-10-13', subject: 'Software Engineering', time: '02:00 PM', status: 'absent', markedBy: 'Prof. S. Dash' },
    { date: '2026-10-13', subject: 'Formal Language & Automata', time: '11:30 AM', status: 'present', markedBy: 'Dr. M. Behera' },
    { date: '2026-10-12', subject: 'Computer Networks', time: '09:00 AM', status: 'present', markedBy: 'Prof. S. Dash' },
    { date: '2026-10-11', subject: 'Database Management Systems', time: '10:15 AM', status: 'present', markedBy: 'Dr. P. Patra' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Authenticated Session
            </span>
            <span className="text-xs text-slate-500 font-mono">Reg ID: {regNo}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.attendance}</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Biometric & faculty verified attendance records for {user?.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Min. 75% Criteria
          </span>
          <button
            type="button"
            onClick={lockAttendance}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md cursor-pointer transition"
            title="Lock attendance access"
          >
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Aggregate Attendance</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">84.6%</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Eligible for End-Sem Exam
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Classes Conducted</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">39</p>
              <p className="text-[11px] text-slate-500 mt-1">Autumn Semester 2026</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Classes Attended</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">33</p>
              <p className="text-[11px] text-rose-500 font-medium mt-1">6 absences recorded</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Subject-Wise Progress */}
      <Card title="Subject-wise Attendance Breakdown" subtitle="Detailed breakdown against the 75% regulatory requirement">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjectStats.map((sub) => (
            <div key={sub.code} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-indigo-600">{sub.code}</span>
                <span className={`text-xs font-bold ${sub.percentage >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {sub.percentage}%
                </span>
              </div>
              <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{sub.name}</h4>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${sub.percentage >= 75 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${sub.percentage}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">{sub.attended} attended / {sub.total} held</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Attendance Log Table */}
      <Card title="Daily Attendance Logs" subtitle="Individual session entries signed off by subject faculty">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Subject</th>
                <th className="pb-3 font-semibold">Time Slot</th>
                <th className="pb-3 font-semibold">Marked By</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentLogs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 font-medium text-slate-900">{log.date}</td>
                  <td className="py-3 font-medium text-slate-800">{log.subject}</td>
                  <td className="py-3 text-slate-500">{log.time}</td>
                  <td className="py-3 text-slate-500">{log.markedBy}</td>
                  <td className="py-3 text-right">
                    <Badge variant={log.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
