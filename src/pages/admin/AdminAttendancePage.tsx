import React, { useState } from 'react';
import { CalendarCheck, Search, Filter, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';

interface StudentAttendanceSummary {
  studentId: string;
  name: string;
  class: string;
  totalLectures: number;
  attended: number;
  percentage: number;
  shortageFlag: boolean;
}

const ATTENDANCE_SUMMARIES: StudentAttendanceSummary[] = [
  { studentId: 'CC-2024-CSE-041', name: 'Aakash Jena', class: 'CSE-3A', totalLectures: 39, attended: 35, percentage: 89.7, shortageFlag: false },
  { studentId: 'CC-2024-CSE-042', name: 'Aarav Mohapatra', class: 'CSE-3A', totalLectures: 39, attended: 33, percentage: 84.6, shortageFlag: false },
  { studentId: 'CC-2024-CSE-043', name: 'Ananya Pattnaik', class: 'CSE-3A', totalLectures: 39, attended: 37, percentage: 94.8, shortageFlag: false },
  { studentId: 'CC-2024-CSE-044', name: 'Ayush Kumar Sahoo', class: 'CSE-3A', totalLectures: 39, attended: 26, percentage: 66.7, shortageFlag: true },
  { studentId: 'CC-2024-CSE-045', name: 'Bhavna Tripathy', class: 'CSE-3A', totalLectures: 39, attended: 36, percentage: 92.3, shortageFlag: false },
  { studentId: 'CC-2024-CSE-047', name: 'Debashish Nayak', class: 'CSE-3A', totalLectures: 39, attended: 28, percentage: 71.8, shortageFlag: true }
];

export const AdminAttendancePage: React.FC = () => {
  const [filterClass, setFilterClass] = useState('all');
  const [showShortageOnly, setShowShortageOnly] = useState(false);

  const filtered = ATTENDANCE_SUMMARIES.filter((item) => {
    const matchesClass = filterClass === 'all' || item.class === filterClass;
    const matchesShortage = !showShortageOnly || item.shortageFlag;
    return matchesClass && matchesShortage;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">University Attendance Monitoring</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Institutional compliance auditing against the statutory 75% attendance criterion
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer bg-white px-3 py-2 border border-slate-200 rounded-lg">
            <input
              type="checkbox"
              checked={showShortageOnly}
              onChange={(e) => setShowShortageOnly(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500"
            />
            <span className="text-rose-600 font-semibold">Shortage (&lt; 75%) Only</span>
          </label>
        </div>
      </div>

      {/* Roster table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 font-semibold">Student ID</th>
                <th className="pb-3 font-semibold">Student Name</th>
                <th className="pb-3 font-semibold">Cohort</th>
                <th className="pb-3 font-semibold text-center">Sessions Held</th>
                <th className="pb-3 font-semibold text-center">Attended</th>
                <th className="pb-3 font-semibold text-center">Percentage</th>
                <th className="pb-3 font-semibold text-right">Exam Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.studentId} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 font-mono font-medium text-slate-900">{item.studentId}</td>
                  <td className="py-3 font-medium text-slate-800">{item.name}</td>
                  <td className="py-3 text-slate-600">{item.class}</td>
                  <td className="py-3 text-center text-slate-600">{item.totalLectures}</td>
                  <td className="py-3 text-center text-slate-800 font-medium">{item.attended}</td>
                  <td className="py-3 text-center">
                    <span
                      className={`font-bold ${
                        item.percentage >= 75 ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {item.percentage}%
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {item.percentage >= 75 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Eligible
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        <AlertTriangle className="w-3 h-3" /> Shortage Notice
                      </span>
                    )}
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
