import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle2, XCircle, Clock, MapPin, User, Search } from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { EmptyState } from '../../components/common/EmptyState.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { CampusRequest } from '../../types/index.ts';

const STORAGE_KEY = 'campusconnect_requests';

export const AdminRequestsPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [requests, setRequests] = useState<CampusRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [requests]);

  const handleAdminDecision = (id: string, decision: 'approved' | 'rejected') => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: decision,
              reviewedBy: user?.uid || 'demo-admin-01',
              reviewedByName: user?.name || 'Santosh Mishra (Dean Academics)',
              reviewNote: `Administrative decision: ${decision.toUpperCase()} by Central Office.`,
              updatedAt: new Date().toLocaleString()
            }
          : r
      )
    );
    setSuccessNote(`Request #${id} marked as ${decision.toUpperCase()}`);
    setTimeout(() => setSuccessNote(null), 4000);
  };

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.requests} (Central Campus Ledger)</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Audit campus leaves, off-campus travel permits, and review decisions
          </p>
        </div>
      </div>

      {successNote && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successNote}</span>
        </div>
      )}

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by student name, roll number, or reason..."
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
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Request Cards */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No Requests Match Filter"
            description="No leave or gate-pass requests correspond to your current search query."
          />
        ) : (
          filtered.map((req) => (
            <Card key={req.id} className="hover:border-slate-300 transition">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {req.type === 'gate_pass' ? '🚪 Gate Pass' : '✈️ Campus Leave'}
                    </span>
                    <span className="font-mono text-xs text-slate-400">#{req.id}</span>
                  </div>
                  <Badge variant={req.status} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{req.reason}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1.5">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {req.studentName} ({req.studentRoll || req.studentId}) {req.semester && `• ${req.semester}`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(req.startDate).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </span>
                    {req.destination && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {req.destination}
                      </span>
                    )}
                  </div>
                </div>

                {req.reviewNote && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                    <p className="font-semibold text-slate-800">Review Note ({req.reviewedByName}):</p>
                    <p className="text-slate-600 mt-0.5">{req.reviewNote}</p>
                  </div>
                )}

                {req.status === 'pending' && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleAdminDecision(req.id, 'rejected')}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 cursor-pointer"
                    >
                      Administrative Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdminDecision(req.id, 'approved')}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs cursor-pointer"
                    >
                      Administrative Approve
                    </button>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
