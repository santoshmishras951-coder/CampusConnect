import React, { useState, useEffect } from 'react';
import { AlertCircle, Wrench, Clock, MapPin, CheckCircle2, Search, Filter, User } from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { EmptyState } from '../../components/common/EmptyState.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { CampusComplaint, ComplaintPriority, ComplaintStatus } from '../../types/index.ts';

const COMPLAINTS_STORAGE_KEY = 'campusconnect_complaints';

export const AdminComplaintsPage: React.FC = () => {
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

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [successNote, setSuccessNote] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(complaints));
  }, [complaints]);

  const handleAssign = (id: string, staffName: string) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'assigned',
              assignedTo: 'demo-maintenance-01',
              assignedToName: staffName,
              assignedDepartment: 'Central Maintenance Squad',
              updatedAt: new Date().toLocaleString()
            }
          : c
      )
    );
    setSuccessNote(`Assigned to ${staffName}.`);
    setTimeout(() => setSuccessNote(null), 3000);
  };

  const handleStatusChange = (id: string, status: ComplaintStatus) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              updatedAt: new Date().toLocaleString(),
              resolvedAt: status === 'resolved' ? new Date().toLocaleString() : c.resolvedAt
            }
          : c
      )
    );
  };

  const handlePriorityChange = (id: string, priority: ComplaintPriority) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
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
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.complaints} (Central Oversight)</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Dispatch engineering staff, recalibrate priorities, and enforce SLA benchmarks
        </p>
      </div>

      {successNote && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successNote}</span>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search ticket number, issue, or student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-700 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Ticket Statuses</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon={AlertCircle}
            title="No Grievances Found"
            description="No complaint records match your current filter settings."
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
                    <span className="text-xs font-medium uppercase text-slate-500">• {c.category}</span>
                    <Badge variant={c.priority} />
                  </div>
                  <Badge variant={c.status} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{c.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {c.location}
                  </span>
                  <span>Student: <strong>{c.studentName}</strong></span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {String(c.createdAt)}
                  </span>
                </div>

                {c.resolutionNote && (
                  <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs space-y-0.5">
                    <p className="font-bold text-teal-900">Resolution Note:</p>
                    <p className="text-teal-800">{c.resolutionNote}</p>
                  </div>
                )}

                {/* Admin controls */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">Priority:</span>
                      <select
                        value={c.priority}
                        onChange={(e) => handlePriorityChange(c.id, e.target.value as ComplaintPriority)}
                        className="p-1 border border-slate-300 rounded bg-white text-slate-700 cursor-pointer"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">Status:</span>
                      <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value as ComplaintStatus)}
                        className="p-1 border border-slate-300 rounded bg-white text-slate-700 cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="assigned">Assigned</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {c.assignedToName ? (
                      <span className="text-slate-600 font-medium bg-slate-100 px-2.5 py-1 rounded">
                        Assigned: {c.assignedToName}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAssign(c.id, 'Bikash Jena')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer shadow-xs"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Assign to Bikash Jena</span>
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
