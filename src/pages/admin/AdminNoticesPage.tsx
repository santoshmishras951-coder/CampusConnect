import React, { useState, useEffect } from 'react';
import {
  Bell,
  PlusCircle,
  Calendar,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Building,
  ShieldAlert,
  Zap,
  Send,
  Building2,
  GraduationCap
} from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { NoticeItem, NoticeTargetType } from '../../types/index.ts';
import { getStoredNotices, publishNewNotice } from '../../utils/notificationService.ts';

const UPPER_DEPARTMENTS = [
  'Dean of Academic Affairs',
  'Office of the Registrar',
  'Controller of Examinations',
  'Chief Proctor & Student Vigilance',
  'Dean of Student Welfare (DSW)',
  'Central Administration Secretariat',
  'Department of Computer Science & Engineering',
  'Chief Hostel Warden & Residence Council'
];

export const AdminNoticesPage: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const [notices, setNotices] = useState<NoticeItem[]>(() => getStoredNotices());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [titleOr, setTitleOr] = useState('');
  const [body, setBody] = useState('');
  const [bodyOr, setBodyOr] = useState('');
  const [department, setDepartment] = useState(UPPER_DEPARTMENTS[0]);
  const [targetType, setTargetType] = useState<NoticeTargetType>('all');
  const [isUrgent, setIsUrgent] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [successNote, setSuccessNote] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setNotices(getStoredNotices());
    };
    window.addEventListener('campusconnect:notices_updated', handleUpdate);
    return () => {
      window.removeEventListener('campusconnect:notices_updated', handleUpdate);
    };
  }, []);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    publishNewNotice({
      title: title.trim(),
      titleOr: titleOr.trim() || undefined,
      body: body.trim(),
      bodyOr: bodyOr.trim() || undefined,
      targetType,
      publishedBy: user?.uid || 'admin-root',
      publishedByName: department,
      priority: isUrgent ? 'urgent' : 'normal'
    });

    setIsModalOpen(false);
    setTitle('');
    setTitleOr('');
    setBody('');
    setBodyOr('');
    setShowPreview(false);
    setSuccessNote(`Circular published by "${department}". It is now broadcast to all student notification bell icons & notice boards!`);
    setTimeout(() => setSuccessNote(null), 6000);
  };

  // Quick 1-click preset broadcast for fast evaluation
  const handleQuickPresetBroadcast = (
    dept: string,
    presetTitle: string,
    presetTitleOr: string,
    presetBody: string,
    presetBodyOr: string,
    target: NoticeTargetType,
    urgent: boolean
  ) => {
    publishNewNotice({
      title: presetTitle,
      titleOr: presetTitleOr,
      body: presetBody,
      bodyOr: presetBodyOr,
      targetType: target,
      publishedBy: user?.uid || 'admin-root',
      publishedByName: dept,
      priority: urgent ? 'urgent' : 'normal'
    });

    setSuccessNote(`Broadcast dispatched from "${dept}"! Appears immediately in student notification bell and notice board.`);
    setTimeout(() => setSuccessNote(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {t.notices} (Upper Department Broadcast Center)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Publish official announcements from Dean, Registrar, Proctor, Examination Branch, and Faculty directly to student bell notifications and notice boards.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Broadcast Official Circular</span>
        </button>
      </div>

      {successNote && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successNote}</span>
        </div>
      )}

      {/* 1-Click Quick Broadcast Presets */}
      <Card
        title="1-Click Upper Department Broadcast Presets"
        subtitle="Quickly dispatch sample notifications from different academic authorities for testing"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl border border-indigo-100 bg-indigo-50/50 flex flex-col justify-between gap-2.5">
            <div>
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                Office of the Dean
              </span>
              <p className="text-xs font-bold text-slate-900 mt-1">Mid-Semester Evaluation Schedule</p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Dean of Academic Affairs notifies all batches regarding slot timetable and admit cards.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                handleQuickPresetBroadcast(
                  'Dean of Academic Affairs',
                  'Mid-Semester Examination Schedule & Slot Allotment',
                  'ମିଡ୍-ସେମିଷ୍ଟାର୍ ପରୀକ୍ଷା ସୂଚୀ ଏବଂ ସ୍ଲଟ୍ ଆବଣ୍ଟନ',
                  'The mid-semester evaluation commences next Monday across all departments. Admit cards can be downloaded from the student dossier.',
                  'ଆସନ୍ତା ସୋମବାରଠାରୁ ସମସ୍ତ ବିଭାଗରେ ମିଡ୍-ସେମିଷ୍ଟାର୍ ପରୀକ୍ଷା ଆରମ୍ଭ ହେବ। ବିସ୍ତୃତ ସୂଚୀ କ୍ୟାମ୍ପସକନେକ୍ଟରେ ଉପଲବ୍ଧ।',
                  'all',
                  true
                )
              }
              className="w-full py-1.5 px-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition"
            >
              <Send className="w-3 h-3" />
              <span>Broadcast as Dean</span>
            </button>
          </div>

          <div className="p-3 rounded-xl border border-amber-100 bg-amber-50/50 flex flex-col justify-between gap-2.5">
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                Controller of Examinations
              </span>
              <p className="text-xs font-bold text-slate-900 mt-1">Grade Sheet & Backpaper Form Release</p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Examination branch announces registration deadlines for end-sem regular and supplementary.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                handleQuickPresetBroadcast(
                  'Controller of Examinations',
                  'End-Semester Exam Registration & Hall Ticket Issuance',
                  'ସେମିଷ୍ଟାର୍ ପରୀକ୍ଷା ପଞ୍ଜୀକରଣ ଏବଂ ପ୍ରବେଶ ପତ୍ର ପ୍ରଦାନ',
                  'All eligible students must verify their attendance percentage (min 75%) before submitting examination enrollment forms.',
                  'ସମସ୍ତ ଯୋଗ୍ୟ ଛାତ୍ରଛାତ୍ରୀ ପରୀକ୍ଷା ଫର୍ମ ଦାଖଲ ପୂର୍ବରୁ ସେମାନଙ୍କର ଉପସ୍ଥିତି ଯାଞ୍ଚ କରିବାକୁ ଅନୁରୋଧ।',
                  'class',
                  false
                )
              }
              className="w-full py-1.5 px-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition"
            >
              <Send className="w-3 h-3" />
              <span>Broadcast as Exam Controller</span>
            </button>
          </div>

          <div className="p-3 rounded-xl border border-purple-100 bg-purple-50/50 flex flex-col justify-between gap-2.5">
            <div>
              <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">
                Chief Proctor & Student Welfare
              </span>
              <p className="text-xs font-bold text-slate-900 mt-1">Campus Safety & Night Biometric Gate Guidelines</p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Proctorial board announces strict enforcement of 30-min valid digital gate passes.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                handleQuickPresetBroadcast(
                  'Chief Proctor & Student Vigilance',
                  'Mandatory 30-Minute Digital Gate Pass Protocol at Campus Main Gate',
                  'ମୁଖ୍ୟ ଫାଟକରେ ୩୦ ମିନିଟ୍ ବୈଧ ଡିଜିଟାଲ୍ ଗେଟ୍ ପାସ୍ ନିୟମାବଳୀ',
                  'Approved hostel gate passes generate a validity QR code based on the student\'s assigned stay duration. Security guards at the main gate must scan the code within the validity period.',
                  'ଅନୁମୋଦିତ ହଷ୍ଟେଲ ଗେଟ୍ ପାସ୍ ୩୦ ମିନିଟ୍ ପାଇଁ ଏକ କ୍ୟୁଆର୍ କୋଡ୍ ଦେଖାଏ। ନିରାପତ୍ତା କର୍ମୀ ୩୦ ମିନିଟ୍ ମଧ୍ୟରେ ଏହା ସ୍କାନ୍ କରିବା ବାଧ୍ୟତାମୂଳକ।',
                  'hostel',
                  true
                )
              }
              className="w-full py-1.5 px-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition"
            >
              <Send className="w-3 h-3" />
              <span>Broadcast as Chief Proctor</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Notices List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Active Published Circulars ({notices.length})
          </h3>
          <span className="text-xs text-slate-400">Synced across all student devices</span>
        </div>

        {notices.length === 0 ? (
          <div className="min-h-[220px] bg-white rounded-2xl border border-slate-200/80 p-8 flex flex-col items-center justify-center text-center">
            <Bell className="w-8 h-8 text-slate-300 mb-2" />
            <h4 className="text-sm font-bold text-slate-700">No circulars currently published</h4>
            <p className="text-xs text-slate-400 mt-1">Use the broadcast center above to release notices for students.</p>
          </div>
        ) : (
          notices.map((n) => (
            <Card key={n.id} className="hover:border-slate-300 transition">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Target: {n.targetType}
                    </span>
                    {n.priority === 'urgent' && <Badge variant="urgent" label="Urgent Circular" />}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {String(n.publishedAt)}
                    </span>
                    <span className="font-semibold text-indigo-700">
                      Department: {n.publishedByName || n.publishedBy}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{n.title}</h3>
                  {n.titleOr && (
                    <p className="text-xs font-semibold text-indigo-700 mt-0.5 font-sans">{n.titleOr}</p>
                  )}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed whitespace-pre-line">{n.body}</p>
                  {n.bodyOr && (
                    <p className="text-xs text-slate-500 mt-1 italic font-sans">{n.bodyOr}</p>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Broadcast Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Broadcast Authority Circular</h3>
                <p className="text-xs text-slate-500">
                  Instant broadcast to student notification bells and notice board
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePublish} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Issuing Upper Department *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    {UPPER_DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Audience *</label>
                  <select
                    value={targetType}
                    onChange={(e) => setTargetType(e.target.value as NoticeTargetType)}
                    className="w-full p-2 text-xs border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">Entire Campus (All Students & Staff)</option>
                    <option value="class">Class & Academic Batches</option>
                    <option value="hostel">Hostel Residents Only</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="text-red-700 font-semibold">Flag as Urgent Priority Circular</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Title (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Annual Campus Innovation Schedule & Venue Allocation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Title (ଓଡ଼ିଆ - Odia)</label>
                <input
                  type="text"
                  placeholder="ଶିରୋନାମା ଓଡ଼ିଆରେ..."
                  value={titleOr}
                  onChange={(e) => setTitleOr(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Body (English) *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter the full text of the announcement issued by the department..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Body (ଓଡ଼ିଆ - Odia)</label>
                <textarea
                  rows={2}
                  placeholder="ଓଡ଼ିଆରେ ସମ୍ପୂର୍ଣ୍ଣ ସୂଚନା..."
                  value={bodyOr}
                  onChange={(e) => setBodyOr(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-sans"
                />
              </div>

              {/* Preview Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showPreview ? 'Hide Live Preview' : 'Preview circular before broadcasting'}</span>
                </button>

                {showPreview && (
                  <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Live Broadcast Preview</p>
                    <p className="text-xs font-semibold text-indigo-700">Issued by: {department}</p>
                    <p className="font-bold text-sm text-slate-900">{title || '(No title yet)'}</p>
                    {titleOr && <p className="text-xs text-indigo-700 font-semibold">{titleOr}</p>}
                    <p className="text-xs text-slate-600 mt-1">{body || '(No body yet)'}</p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Broadcast Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
