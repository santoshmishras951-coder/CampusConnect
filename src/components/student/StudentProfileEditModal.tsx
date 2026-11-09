import React, { useState, useRef } from 'react';
import {
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Camera,
  X,
  CheckCircle2,
  AlertCircle,
  Upload,
  Hash,
  BookOpen,
  HeartPulse,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { UserProfile } from '../../types/index.ts';

interface StudentProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInitialSetup?: boolean;
}

export const StudentProfileEditModal: React.FC<StudentProfileEditModalProps> = ({
  isOpen,
  onClose,
  isInitialSetup = false
}) => {
  const { user, updateUserProfile } = useAuth();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: user?.name || '',
    email: user?.email || '',
    collegeName: user?.collegeName || 'Government College of Engineering & Technology',
    studentId: user?.studentId || user?.regNo || 'CC-2024-CSE-042',
    regNo: user?.regNo || user?.studentId || 'CC-2024-CSE-042',
    dob: user?.dob || '2004-06-15',
    phone: user?.phone || '',
    guardianPhone: user?.guardianPhone || '',
    className: user?.className || 'B.Tech Computer Science & Engineering',
    section: user?.section || 'Section A',
    academicYear: user?.academicYear || '3rd Year (2024-2028)',
    hostelId: user?.hostelId || 'Mahanadi Hall of Residence',
    hostelRoom: user?.hostelRoom || 'Room 304, 3rd Floor East',
    bloodGroup: user?.bloodGroup || 'O+ Positive',
    address: user?.address || 'University Residential Campus',
    photoUrl: user?.photoUrl || ''
  });

  const [previewPhoto, setPreviewPhoto] = useState<string>(user?.photoUrl || '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please choose a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size exceeds 5MB limit. Please choose a smaller image.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewPhoto(reader.result);
        setFormData((prev) => ({ ...prev, photoUrl: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      setError('Student name is required.');
      return;
    }
    if (!formData.collegeName?.trim()) {
      setError('Please enter the name of your college / institution.');
      return;
    }
    if (!formData.regNo?.trim()) {
      setError('Registration Number / Student ID is required.');
      return;
    }
    if (!formData.dob?.trim()) {
      setError('Date of birth is required for attendance security verification.');
      return;
    }

    updateUserProfile({
      ...formData,
      studentId: formData.regNo,
      photoUrl: previewPhoto
    });

    setSuccess('Student profile & photo successfully saved and applied!');
    setTimeout(() => {
      setSuccess(null);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 uppercase tracking-wider">
                {isInitialSetup ? 'Student Onboarding' : 'Edit Profile'}
              </span>
              <span className="text-xs text-indigo-200">CampusConnect Identity Record</span>
            </div>
            <h3 className="text-lg font-bold tracking-tight mt-0.5">
              {isInitialSetup ? 'Create Your Student Profile' : 'Update Student Profile & Photo'}
            </h3>
          </div>
          {!isInitialSetup && (
            <button
              type="button"
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Photo Upload Section */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-indigo-100 border-2 border-indigo-400/40 shadow-sm overflow-hidden flex items-center justify-center">
                {previewPhoto ? (
                  <img
                    src={previewPhoto}
                    alt="Student Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2 text-indigo-700 font-bold text-xl uppercase">
                    {formData.name ? formData.name.slice(0, 2) : 'ST'}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1.5 -right-1.5 p-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition cursor-pointer"
                title="Upload Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-slate-900">Student Profile Photo</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload your clear portrait photo. It will appear on your digital student ID, dashboard, and top profile icon.
              </p>
              <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-2xs transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Choose Photo from Device</span>
                </button>
                {previewPhoto && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewPhoto('');
                      setFormData((p) => ({ ...p, photoUrl: '' }));
                    }}
                    className="px-2.5 py-1.5 text-xs text-rose-600 hover:underline cursor-pointer"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* College Name Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.collegeName} *
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-indigo-600 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                placeholder="e.g., Government College of Engineering & Technology / Biju Patnaik Institute"
                value={formData.collegeName || ''}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.studentName} *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g., Aarav Mohapatra"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.registrationNumber} *
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g., CC-2024-CSE-042"
                  value={formData.regNo || ''}
                  onChange={(e) => setFormData({ ...formData, regNo: e.target.value, studentId: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.dateOfBirth} * <span className="text-[10px] text-indigo-600">(Used for attendance verification)</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="date"
                  required
                  value={formData.dob || ''}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                University Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="e.g., student@campusconnect.edu"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Parent / Guardian Contact
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  placeholder="+91 98610 11223"
                  value={formData.guardianPhone || ''}
                  onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Academic & Hostel Residence */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Academic & Hostel Residence Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Degree & Branch / Department
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={formData.className || ''}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Section & Academic Batch
                </label>
                <input
                  type="text"
                  placeholder="e.g., Section A (3rd Year)"
                  value={formData.section || ''}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hostel Residence Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g., Mahanadi Hall of Residence"
                    value={formData.hostelId || ''}
                    onChange={(e) => setFormData({ ...formData, hostelId: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hostel Room Number & Wing
                </label>
                <input
                  type="text"
                  placeholder="e.g., Room 304, 3rd Floor East Wing"
                  value={formData.hostelRoom || ''}
                  onChange={(e) => setFormData({ ...formData, hostelRoom: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Blood Group
                </label>
                <div className="relative">
                  <HeartPulse className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g., O+ Positive"
                    value={formData.bloodGroup || ''}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Permanent / Home Address
                </label>
                <input
                  type="text"
                  placeholder="e.g., City, State, PIN"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            {!isInitialSetup && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer transition"
              >
                {t.cancel}
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm shadow-indigo-200 cursor-pointer transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.save}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
