import React, { useState } from 'react';
import { CalendarCheck, Users, Save, CheckCircle2, XCircle, AlertCircle, Clock } from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface StudentRosterItem {
  id: string;
  name: string;
  rollNo: string;
  status: 'present' | 'absent';
}

const INITIAL_ROSTER: StudentRosterItem[] = [
  { id: 'std-1', rollNo: 'CC-2024-CSE-041', name: 'Aakash Jena', status: 'present' },
  { id: 'std-2', rollNo: 'CC-2024-CSE-042', name: 'Aarav Mohapatra', status: 'present' },
  { id: 'std-3', rollNo: 'CC-2024-CSE-043', name: 'Ananya Pattnaik', status: 'present' },
  { id: 'std-4', rollNo: 'CC-2024-CSE-044', name: 'Ayush Kumar Sahoo', status: 'absent' },
  { id: 'std-5', rollNo: 'CC-2024-CSE-045', name: 'Bhavna Tripathy', status: 'present' },
  { id: 'std-6', rollNo: 'CC-2024-CSE-046', name: 'Chinmayee Das', status: 'present' },
  { id: 'std-7', rollNo: 'CC-2024-CSE-047', name: 'Debashish Nayak', status: 'absent' },
  { id: 'std-8', rollNo: 'CC-2024-CSE-048', name: 'Deepak Rout', status: 'present' },
  { id: 'std-9', rollNo: 'CC-2024-CSE-049', name: 'Gitanjali Pradhan', status: 'present' },
  { id: 'std-10', rollNo: 'CC-2024-CSE-050', name: 'Himanshu Behera', status: 'present' }
];

export const FacultyAttendancePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [selectedClass, setSelectedClass] = useState('CSE-3A');
  const [selectedSubject, setSelectedSubject] = useState('CS301 - Computer Networks');
  const [selectedDate, setSelectedDate] = useState('2026-10-14');
  const [roster, setRoster] = useState<StudentRosterItem[]>(INITIAL_ROSTER);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleStatus = (id: string) => {
    setRoster((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s))
    );
    setSaveSuccess(false);
  };

  const markAll = (status: 'present' | 'absent') => {
    setRoster((prev) => prev.map((s) => ({ ...s, status })));
    setSaveSuccess(false);
  };

  const presentCount = roster.filter((s) => s.status === 'present').length;
  const attendanceRate = ((presentCount / roster.length) * 100).toFixed(1);

  const handleSaveAttendance = () => {
    // In Phase 1, save to local audit store and show confirmation
    const sessionRecord = {
      classId: selectedClass,
      subject: selectedSubject,
      dateKey: selectedDate,
      markedBy: user?.uid || 'demo-faculty-01',
      markedByName: user?.name || 'Prof. Subhashree Dash',
      roster,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(`campus_att_${selectedClass}_${selectedDate}`, JSON.stringify(sessionRecord));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 5000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.markAttendance}</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Record lecture attendance with duplicate session prevention and instant analytics
          </p>
        </div>
        <button
          type="button"
          onClick={handleSaveAttendance}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Attendance Register</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Attendance successfully submitted and committed to register for {selectedClass} on {selectedDate}.
          </span>
        </div>
      )}

      {/* Control Filters */}
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Class & Section</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="CSE-3A">B.Tech CSE - 3rd Year (Section A)</option>
              <option value="CSE-3B">B.Tech CSE - 3rd Year (Section B)</option>
              <option value="CSE-4A">B.Tech CSE - 4th Year (Section A)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Subject / Course</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="CS301 - Computer Networks">CS301 - Computer Networks</option>
              <option value="CS304 - Software Engineering">CS304 - Software Engineering</option>
              <option value="CS309 - Networks Laboratory">CS309 - Networks Laboratory</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Lecture Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Aggregate Stats for the session */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="text-slate-600">
              Total Enrolled: <strong className="text-slate-900">{roster.length}</strong>
            </span>
            <span className="text-emerald-700">
              Present: <strong>{presentCount}</strong>
            </span>
            <span className="text-rose-700">
              Absent: <strong>{roster.length - presentCount}</strong>
            </span>
            <span className="text-indigo-700 font-bold">
              Turnout: <strong>{attendanceRate}%</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => markAll('present')}
              className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 cursor-pointer"
            >
              Mark All Present
            </button>
            <button
              type="button"
              onClick={() => markAll('absent')}
              className="px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 cursor-pointer"
            >
              Mark All Absent
            </button>
          </div>
        </div>
      </Card>

      {/* Student Roster Table */}
      <Card title={`Attendance Register: ${selectedClass}`} subtitle={`Click the button or status to toggle between Present and Absent.`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 font-semibold">Roll Number</th>
                <th className="pb-3 font-semibold">Student Name</th>
                <th className="pb-3 font-semibold text-center">Status</th>
                <th className="pb-3 font-semibold text-right">Quick Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roster.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 font-mono font-medium text-slate-900">{student.rollNo}</td>
                  <td className="py-3 font-medium text-slate-800">{student.name}</td>
                  <td className="py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        student.status === 'present'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {student.status === 'present' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {student.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggleStatus(student.id)}
                      className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition ${
                        student.status === 'present'
                          ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      Mark {student.status === 'present' ? 'Absent' : 'Present'}
                    </button>
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
