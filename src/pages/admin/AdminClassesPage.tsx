import React from 'react';
import { BookOpen, Users, GraduationCap, CalendarCheck } from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { ClassItem } from '../../types/index.ts';

const SAMPLE_CLASSES: ClassItem[] = [
  { id: 'c1', name: 'B.Tech Computer Science & Engineering', section: 'Section A', academicYear: '3rd Year (2024-2028)', teacherIds: ['Prof. S. Dash', 'Dr. P. Patra'] },
  { id: 'c2', name: 'B.Tech Computer Science & Engineering', section: 'Section B', academicYear: '3rd Year (2024-2028)', teacherIds: ['Dr. M. Behera', 'Prof. A. Ray'] },
  { id: 'c3', name: 'B.Tech Electrical Engineering', section: 'Section A', academicYear: '2nd Year (2025-2029)', teacherIds: ['Prof. K. Nayak', 'Dr. S. Mohanty'] },
  { id: 'c4', name: 'B.Tech Mechanical Engineering', section: 'Section A', academicYear: '4th Year (2023-2027)', teacherIds: ['Dr. B. Das', 'Prof. R. Mishra'] }
];

export const AdminClassesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Academic Classes & Rosters</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Curriculum sections, academic cohorts, and assigned faculty mentors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SAMPLE_CLASSES.map((cls) => (
          <Card key={cls.id} className="hover:border-slate-300 transition">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {cls.section}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1.5">{cls.name}</h3>
                  <p className="text-xs text-slate-500">{cls.academicYear}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-400 font-medium block mb-1">Assigned Faculty Mentors:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cls.teacherIds.map((t, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
