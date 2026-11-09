import React, { useState, useEffect } from 'react';
import { AlertCircle, Wrench, Clock, MapPin, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { EmptyState } from '../../components/common/EmptyState.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { CampusComplaint, ComplaintPriority, ComplaintStatus } from '../../types/index.ts';

const COMPLAINTS_STORAGE_KEY = 'campusconnect_complaints';

export const WardenComplaintsPage: React.FC = () => {
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

  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(complaints));
  }, [complaints]);

  const handleAssignToMaintenance = (complaintId: string) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              status: 'assigned',
              assignedTo: 'demo-maintenance-01',
              assignedToName: 'Bikash Jena',
              assignedDepartment: 'Hostel Maintenance Cell',
              updatedAt: new Date().toLocaleString()
            }
          : c
      )
    );
    setSuccessMsg(`Ticket assigned to Maintenance Cell.`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleSetPriority = (complaintId: string, priority: ComplaintPriority) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              priority,
              updatedAt: new Date().toLocaleString()
            }
          : c
      )
    );
  };

  const filtered = complaints.filter((c) => {
    if (filterPriority === 'all') return true;
    return c.priority === filterPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.complaints} (Hostel Supervision)</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Oversee hostel infrastructure defects, escalate safety incidents, and dispatch maintenance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Filter Priority:</span>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="p-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-700 focus:outline-hidden"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon={AlertCircle}
            title="No Hostel Complaints Found"
            description="All reported grievances for your hostel block have been addressed."
          />
        ) : (
          filtered.map((c) => (
            <Card key={c.id} className="hover:border-slate-300 transition">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {c.ticketNumber}
                    </span>
                    <span className="text-xs text-slate-500 uppercase font-medium">• {c.category}</span>
                    <Badge variant={c.priority} />
                  </div>
                  <Badge variant={c.status} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{c.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {c.location}
                  </span>
                  <span>Reported by: <strong>{c.studentName}</strong></span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {String(c.createdAt)}
                  </span>
                </div>

                {/* Warden dispatch controls */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Priority:</span>
                    <select
                      value={c.priority}
                      onChange={(e) => handleSetPriority(c.id, e.target.value as ComplaintPriority)}
                      className="p-1 text-xs border border-slate-300 rounded bg-white text-slate-700 cursor-pointer"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    {c.assignedToName ? (
                      <span className="text-slate-600 font-medium bg-slate-100 px-2.5 py-1 rounded">
                        Assigned to: {c.assignedToName}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAssignToMaintenance(c.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs cursor-pointer"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Dispatch to Maintenance</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
