import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Building2,
  Shield,
  Calendar,
  CheckCircle2,
  Camera,
  HeartPulse,
  Hash,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { StudentProfileEditModal } from '../../components/student/StudentProfileEditModal.tsx';

export const StudentProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const regNo = user?.regNo || user?.studentId || 'CC-2024-CSE-042';

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.profile}</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Verified student digital credentials, college affiliation, residence records, and contact details
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsEditModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs cursor-pointer transition self-start sm:self-auto"
        >
          <UserCheck className="w-4 h-4" />
          <span>Edit Student Profile & Photo</span>
        </button>
      </div>

      {/* Main Profile Info Card with Photo & College */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100">
          <div className="relative group shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-indigo-100 border-2 border-indigo-400 overflow-hidden shadow-sm flex items-center justify-center">
              {user?.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="font-bold text-2xl text-indigo-700 uppercase">
                  {user?.name ? user.name.slice(0, 2) : 'ST'}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="absolute -bottom-1 -right-1 p-1.5 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 cursor-pointer"
              title="Upload / Change Photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">{user?.name}</h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active Regular Student
              </span>
            </div>

            {/* College Name display */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 w-fit">
              <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{user?.collegeName || 'Government College of Engineering & Technology'}</span>
            </div>

            <p className="text-xs text-slate-700 font-mono font-bold">
              {t.registrationNumber}: {regNo}
            </p>
            <p className="text-xs text-slate-600">
              {user?.className} • {user?.section}
            </p>
            <p className="text-xs text-slate-500">
              {t.dateOfBirth}: <span className="font-mono font-medium text-slate-700">{user?.dob || '2004-06-15'}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-xs">
          <div className="space-y-4">
            <div>
              <span className="text-slate-400 font-medium block">{t.collegeName}</span>
              <p className="text-slate-800 font-semibold mt-0.5 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                {user?.collegeName || 'Government College of Engineering & Technology'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Official University Email</span>
              <p className="text-slate-800 font-semibold mt-0.5 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-slate-400" />
                {user?.email}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Student Contact Phone</span>
              <p className="text-slate-800 font-semibold mt-0.5 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-slate-400" />
                {user?.phone || '+91 98765 43210'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Parent / Guardian Contact</span>
              <p className="text-slate-800 font-semibold mt-0.5 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-slate-400" />
                {user?.guardianPhone || '+91 98610 11223'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-slate-400 font-medium block">{t.hostelRoom}</span>
              <p className="text-slate-800 font-semibold mt-0.5 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                {user?.hostelId || 'Mahanadi Hall'} ({user?.hostelRoom || 'Room 304'})
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Department & Degree</span>
              <p className="text-slate-800 font-semibold mt-0.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-slate-400" />
                {user?.className || 'Computer Science & Engineering'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Blood Group</span>
              <p className="text-slate-800 font-semibold mt-0.5 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                {user?.bloodGroup || 'O+ Positive'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Portal Security Access</span>
              <p className="text-slate-800 font-semibold mt-0.5 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-indigo-600" />
                Standard Student (Zero-Trust Verified)
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Language Preference Card */}
      <Card title={t.language} subtitle="Select preferred display language across all sections">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-800">
              Active Language: <span className="capitalize text-indigo-700 font-bold">{language}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              Supports English, Odia, Hindi, Telugu, Chinese, and custom added languages
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {availableLanguages.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setLanguage(opt.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer transition ${
                  language === opt.key
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Profile Edit Modal */}
      <StudentProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};
