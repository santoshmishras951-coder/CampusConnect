import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  PlusCircle,
  Wrench,
  Clock,
  MapPin,
  CheckCircle,
  ChevronRight,
  X,
  History,
  ShieldAlert,
  HelpCircle,
  MessageSquareHeart,
  HeartHandshake
} from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { EmptyState } from '../../components/common/EmptyState.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { CampusComplaint, ComplaintCategory, ComplaintPriority } from '../../types/index.ts';

const COMPLAINTS_STORAGE_KEY = 'campusconnect_complaints';

const INITIAL_COMPLAINTS: CampusComplaint[] = [
  {
    id: 'cmp-01',
    ticketNumber: 'CC-ISSUE-1042',
    studentId: 'demo-student-01',
    studentName: 'Aarav Mohapatra',
    studentRoll: 'CC-2024-CSE-042',
    category: 'wifi',
    location: 'Mahanadi Hall, 3rd Floor East Wing Corridor',
    title: 'High Packet Loss & Frequent Wi-Fi Router Disconnections',
    description: 'The Wi-Fi access point in the 3rd floor corridor drops connection every 5 minutes, preventing submission of academic assignments.',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: 'demo-maintenance-01',
    assignedToName: 'Bikash Jena (Hardware & Telecom)',
    assignedDepartment: 'IT Infrastructure',
    createdAt: '2026-10-13 11:20 AM',
    updatedAt: '2026-10-14 08:30 AM'
  },
  {
    id: 'cmp-02',
    ticketNumber: 'CC-ISSUE-1029',
    studentId: 'demo-student-01',
    studentName: 'Aarav Mohapatra',
    studentRoll: 'CC-2024-CSE-042',
    category: 'water',
    location: 'Mahanadi Hall, Room 304 Bathroom',
    title: 'Water tap leaking continuously',
    description: 'The bathroom washbasin tap is broken at the valve and continuously leaking freshwater.',
    priority: 'low',
    status: 'resolved',
    assignedTo: 'demo-maintenance-01',
    assignedToName: 'Bikash Jena (Plumbing)',
    assignedDepartment: 'Estate & Maintenance',
    resolutionNote: 'Valve washer replaced with brass ceramic cartridge. Leak stopped completely.',
    createdAt: '2026-10-10 09:15 AM',
    updatedAt: '2026-10-10 04:45 PM',
    resolvedAt: '2026-10-10 04:45 PM'
  }
];

export const StudentComplaintsPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [complaints, setComplaints] = useState<CampusComplaint[]>(() => {
    const saved = localStorage.getItem(COMPLAINTS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_COMPLAINTS;
      }
    }
    return INITIAL_COMPLAINTS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<ComplaintCategory>('general');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(complaints));
  }, [complaints]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!title.trim()) {
      setValidationError('Please enter a brief subject or title for the issue you are facing.');
      return;
    }
    if (!location.trim()) {
      setValidationError('Please specify the location, department, or hostel room.');
      return;
    }
    if (!description.trim() || description.trim().length < 5) {
      setValidationError('Please write a few words explaining whatever issue you are facing.');
      return;
    }

    const ticketSeq = Math.floor(1000 + Math.random() * 9000);
    const newComplaint: CampusComplaint = {
      id: `issue-${Date.now().toString().slice(-6)}`,
      ticketNumber: `CC-ISSUE-${ticketSeq}`,
      studentId: user?.uid || 'demo-student-01',
      studentName: user?.name || 'Aarav Mohapatra',
      studentRoll: user?.studentId || 'CC-2024-CSE-042',
      category,
      location: location.trim(),
      title: title.trim(),
      description: description.trim(),
      priority: category === 'safety' ? 'urgent' : 'medium',
      status: 'pending',
      createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      updatedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
    };

    setComplaints([newComplaint, ...complaints]);
    setIsModalOpen(false);
    setTitle('');
    setLocation('');
    setDescription('');
    setCategory('general');
    setSuccessMessage(`Reference Ticket #${newComplaint.ticketNumber} created successfully! Our staff will review and assist you.`);
    setTimeout(() => setSuccessMessage(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.grievanceRedressalTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t.grievanceRedressalDesc}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.reportIssue}</span>
        </button>
      </div>

      {/* Welcoming Helpdesk Card */}
      <div className="p-4 bg-gradient-to-r from-indigo-50 via-blue-50 to-slate-50 rounded-xl border border-indigo-100 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
          <MessageSquareHeart className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-indigo-950">Open Student Voice & Assistance Policy</h3>
          <p className="text-xs text-indigo-900/80 mt-0.5 leading-relaxed">
            {t.writeAnyIssuePrompt}
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Complaints / Issues List */}
      <div className="space-y-4">
        {complaints.length === 0 ? (
          <EmptyState
            icon={HelpCircle}
            title="No Issues Reported"
            description="You haven't submitted any campus grievances, issues, or assistance requests."
            actionText={t.reportIssue}
            onAction={() => setIsModalOpen(true)}
          />
        ) : (
          complaints.map((c) => (
            <Card key={c.id} className="hover:border-slate-300 transition">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {c.ticketNumber}
                    </span>
                    <span className="text-xs font-medium text-slate-500 uppercase">
                      • {c.category}
                    </span>
                    <Badge variant={c.priority} />
                  </div>
                  <Badge variant={c.status} />
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{c.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed whitespace-pre-line">{c.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {c.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {String(c.createdAt)}
                  </span>
                  {c.assignedToName && (
                    <span className="flex items-center gap-1 font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      <Wrench className="w-3 h-3 text-slate-500" />
                      Assigned: {c.assignedToName}
                    </span>
                  )}
                </div>

                {/* Resolution summary if resolved */}
                {c.status === 'resolved' && (
                  <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-teal-900">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                      <span>Resolution Completed</span>
                    </div>
                    <p className="text-teal-800">{c.resolutionNote || 'The relevant department has addressed and verified this issue.'}</p>
                    {c.resolvedAt && (
                      <p className="text-[10px] text-teal-600">Resolved at: {String(c.resolvedAt)}</p>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* New Issue / Assistance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{t.reportIssue}</h3>
                <p className="text-xs text-slate-500">Write whatever problem or assistance you need</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {validationError && (
                <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs border border-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t.category} *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="general">💡 General Campus Issue / Concern</option>
                  <option value="hostel">🏠 Hostel & Room Facilities</option>
                  <option value="water">💧 Water & Plumbing</option>
                  <option value="electricity">⚡ Electricity & Fans / AC</option>
                  <option value="wifi">📶 Wi-Fi & Internet Connectivity</option>
                  <option value="cleanliness">🧹 Cleanliness & Sanitation</option>
                  <option value="academic">📚 Academic & Exam Concerns</option>
                  <option value="health">🩺 Health & Medical Assistance</option>
                  <option value="safety">🚨 Safety & Security Incident</option>
                  <option value="personal">🤝 Personal / Welfare Assistance</option>
                  <option value="other">✍️ Other Issue</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.location} or Department / Room *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Mahanadi Hall Room 304 / Academic Block / Library"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t.issueTitleLabel} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Wi-Fi disconnected / Need guidance on exam form / Tap broken"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{t.issueDescLabel} *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Write freely whatever issue or assistance you need so our team can help you promptly..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs cursor-pointer"
                >
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
