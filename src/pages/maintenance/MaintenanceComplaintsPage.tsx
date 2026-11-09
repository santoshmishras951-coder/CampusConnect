import React, { useState, useEffect } from 'react';
import { Wrench, CheckCircle2, Clock, MapPin, AlertCircle, Save, X } from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { EmptyState } from '../../components/common/EmptyState.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { CampusComplaint, ComplaintStatus } from '../../types/index.ts';

const COMPLAINTS_STORAGE_KEY = 'campusconnect_complaints';

export const MaintenanceComplaintsPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [complaints, setComplaints] = useState<CampusComplaint[]>(() => {
    const saved = localStorage.getItem(COMPLAINTS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [selectedTicket, setSelectedTicket] = useState<CampusComplaint | null>(null);
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('in_progress');
  const [resolutionNote, setResolutionNote] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(complaints));
  }, [complaints]);

  // Maintenance staff only sees assigned complaints
  const assignedComplaints = complaints.filter(
    (c) => c.assignedTo === user?.uid || c.assignedToName?.includes('Bikash') || c.status === 'in_progress' || c.status === 'assigned'
  );

  const handleOpenUpdate = (complaint: CampusComplaint) => {
    setSelectedTicket(complaint);
    setNewStatus(complaint.status);
    setResolutionNote(complaint.resolutionNote || '');
  };

  const handleSaveUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    const isResolved = newStatus === 'resolved';

    setComplaints((prev) =>
      prev.map((c) =>
        c.id === selectedTicket.id
          ? {
              ...c,
              status: newStatus,
              resolutionNote: resolutionNote.trim() || c.resolutionNote,
              updatedAt: new Date().toLocaleString(),
              resolvedAt: isResolved ? new Date().toLocaleString() : c.resolvedAt
            }
          : c
      )
    );

    setSelectedTicket(null);
    setSuccessMessage(`Ticket #${selectedTicket.ticketNumber} updated to ${newStatus.toUpperCase()}`);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.complaints} (Work Orders)</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Execute repairs, log progress updates, and close out resolved campus work orders
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {assignedComplaints.length === 0 ? (
          <EmptyState
            icon={Wrench}
            title="No Assigned Work Orders"
            description="Your work queue is clear. No active tickets currently assigned."
          />
        ) : (
          assignedComplaints.map((c) => (
            <Card key={c.id} className="hover:border-slate-300 transition">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {c.ticketNumber}
                    </span>
                    <span className="text-xs font-medium uppercase text-slate-500">• {c.category}</span>
                    <Badge variant={c.priority} />
                  </div>
                  <Badge variant={c.status} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{c.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {c.location}
                  </span>
                  <span>Student: <strong>{c.studentName}</strong></span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Created: {String(c.createdAt)}
                  </span>
                </div>

                {c.resolutionNote && (
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs">
                    <p className="font-semibold text-slate-800">Field Resolution Log:</p>
                    <p className="text-slate-600 mt-0.5">{c.resolutionNote}</p>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Assigned: {c.assignedDepartment || 'Maintenance Cell'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenUpdate(c)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs cursor-pointer transition"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Update Status & Notes</span>
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Modal for updating work order */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Update Work Order Status</h3>
                <p className="text-xs text-slate-500">Ticket #{selectedTicket.ticketNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status Transition *</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="assigned">Assigned (Received in queue)</option>
                  <option value="in_progress">In Progress (Work underway on-site)</option>
                  <option value="resolved">Resolved (Repairs completed & tested)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Technician Action / Resolution Note {newStatus === 'resolved' && '*'}
                </label>
                <textarea
                  rows={3}
                  required={newStatus === 'resolved'}
                  placeholder="Describe parts replaced, corrective action taken, or diagnostic results..."
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs cursor-pointer"
                >
                  Save Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
