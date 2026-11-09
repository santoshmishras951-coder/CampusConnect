import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

export const MaintenanceDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const metrics = [
    { label: 'Assigned Work Orders', value: '2', subtext: 'In your active task queue', icon: Wrench, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Work In Progress', value: '1', subtext: 'Wi-Fi fiber repair', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Resolved This Week', value: '14', subtext: 'Water & electrical repairs', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg Resolution Time', value: '3.8 hrs', subtext: 'Within university 24h SLA', icon: Clock, color: 'text-teal-600', bg: 'bg-teal-50' }
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-linear-to-br from-orange-700 via-slate-800 to-indigo-900 rounded-3xl p-8 text-white shadow-xl border border-white/10 group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-orange-500/30 text-orange-200 border border-orange-400/30 uppercase tracking-widest">
                Field Maintenance & Engineering Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight mt-2 drop-shadow-md uppercase">
              WELCOME {user?.name || 'TECHNICIAN'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Physical Plant & Campus Maintenance • {user?.email}
            </p>
          </div>
        <Link
          to="/maintenance/complaints"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-orange-500 text-slate-950 hover:bg-orange-400 shadow-xs transition"
        >
          <Wrench className="w-4 h-4" />
          <span>My Assigned Jobs</span>
        </Link>
      </div>
    </div>

    {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Card key={idx}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">{m.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{m.value}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{m.subtext}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${m.bg} ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Access Task Card */}
      <Card
        title="Active Service Requests"
        subtitle="Current jobs assigned to you"
        action={
          <Link to="/maintenance/complaints" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            Open Work Orders <ArrowRight className="w-3 h-3" />
          </Link>
        }
      >
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                CC-CMP-1042
              </span>
              <span className="text-xs font-bold text-slate-900">Wi-Fi Router Disconnections</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-100 text-indigo-800 rounded">
                IN PROGRESS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Location: Mahanadi Hall, 3rd Floor East Wing Corridor</p>
          </div>
          <Link
            to="/maintenance/complaints"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shrink-0"
          >
            Update Status
          </Link>
        </div>
      </Card>
    </div>
  );
};
