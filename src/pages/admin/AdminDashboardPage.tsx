import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  FileText,
  AlertCircle,
  Clock,
  BarChart3,
  CheckCircle2,
  Bell,
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const metrics = [
    { label: 'Total Active Students', value: '1,420', subtext: 'Enrolled across all branches', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Pending Gate & Leave', value: '7', subtext: 'Require administrative sign-off', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Open Grievances', value: '12', subtext: '3 high priority, 0 safety alerts', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Avg Resolution Time', value: '4.2 hrs', subtext: 'Target SLA < 24 hrs (94% on-time)', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  const categoryBreakdown = [
    { name: 'Water & Plumbing', count: 5, color: 'bg-blue-500', pct: '41%' },
    { name: 'Electricity & AC', count: 3, color: 'bg-amber-500', pct: '25%' },
    { name: 'Wi-Fi & Network', count: 2, color: 'bg-indigo-500', pct: '17%' },
    { name: 'Cleanliness', count: 2, color: 'bg-teal-500', pct: '17%' }
  ];

  return (
    <div className="space-y-6">
      {/* Admin Welcome Banner */}
      <div className="relative overflow-hidden bg-linear-to-br from-slate-900 via-indigo-950 to-purple-900 rounded-3xl p-8 text-white shadow-xl border border-white/10 group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30 uppercase tracking-widest">
                Dean & Central Administration
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight mt-2 drop-shadow-md uppercase">
              WELCOME {user?.name || 'ADMIN'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Campus Executive Cockpit • {user?.email}
            </p>
          </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/notices"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Publish Circular</span>
          </Link>
          <Link
            to="/admin/analytics"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Full SLA Report</span>
          </Link>
        </div>
      </div>
    </div>

    {/* Primary KPI Metrics */}
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

      {/* Main Administrative Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <div className="lg:col-span-1">
          <Card title="Grievances by Category" subtitle="Distribution of active tickets">
            <div className="space-y-4">
              {categoryBreakdown.map((cat, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span>{cat.name}</span>
                    <span className="font-bold">{cat.count} ({cat.pct})</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: cat.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Queues */}
        <div className="lg:col-span-2 space-y-6">
          <Card
            title="Pending Requests Queue"
            subtitle="Recent student gate-passes and leave filings requiring administrative audit"
            action={
              <Link to="/admin/requests" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            }
          >
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900 uppercase">Verification Hub</span>
                    <span className="text-[10px] text-slate-400 font-mono tracking-tighter">GATE-PASS-AUDIT-ACTIVE</span>
                    <Badge variant="pending" />
                  </div>
                  <p className="text-xs text-slate-600 mt-1 font-medium">Verify recent student exit/entry requests from hostel wardens.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Central Campus • Awaiting Final Review</p>
                </div>
                <Link
                  to="/admin/requests"
                  className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shrink-0 text-center"
                >
                  Inspect & Sign
                </Link>
              </div>
            </div>
          </Card>

          <Card
            title="Campus Complaint Dispatch Queue"
            subtitle="Tickets awaiting assignment or priority reassessment"
            action={
              <Link to="/admin/complaints" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                Manage Queue <ArrowRight className="w-3 h-3" />
              </Link>
            }
          >
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                      CC-CMP-1042
                    </span>
                    <span className="text-xs font-bold text-slate-900">Wi-Fi Router Disconnections</span>
                    <Badge variant="medium" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Assigned to: Bikash Jena (Hardware & Telecom)</p>
                </div>
                <Badge variant="in_progress" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
