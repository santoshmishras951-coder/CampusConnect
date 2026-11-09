import React from 'react';
import { BarChart3, Clock, CheckCircle2, AlertTriangle, Users, TrendingUp } from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';

export const AdminAnalyticsPage: React.FC = () => {
  const slaMetrics = [
    { title: 'SLA Compliance Rate', value: '94.2%', sub: 'Target > 90% closed < 24h', color: 'text-emerald-600', barColor: 'bg-emerald-500' },
    { title: 'Average Resolution Time', value: '4.2 hrs', sub: 'Calculated from resolved tickets', color: 'text-indigo-600', barColor: 'bg-indigo-500' },
    { title: 'First-Touch Response Time', value: '28 mins', sub: 'Average time until staff assignment', color: 'text-blue-600', barColor: 'bg-blue-500' },
    { title: 'Overdue Tickets', value: '0', sub: 'Zero tickets past SLA window', color: 'text-teal-600', barColor: 'bg-teal-500' }
  ];

  const categoryBreakdown = [
    { name: 'Water & Plumbing', total: 18, resolved: 17, avgHours: 3.2 },
    { name: 'Electricity & AC', total: 14, resolved: 13, avgHours: 2.8 },
    { name: 'Wi-Fi & Internet', total: 12, resolved: 10, avgHours: 4.5 },
    { name: 'Cleanliness & Waste', total: 22, resolved: 22, avgHours: 1.5 },
    { name: 'Hostel Furniture / Civil', total: 8, resolved: 7, avgHours: 6.1 }
  ];

  const monthlyTurnout = [
    { month: 'June', attendance: 86.2 },
    { month: 'July', attendance: 88.4 },
    { month: 'August', attendance: 84.1 },
    { month: 'September', attendance: 87.5 },
    { month: 'October (Current)', attendance: 85.8 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">University Analytics & SLA Performance</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Real-time service level agreement benchmarks, turnaround speed, and campus attendance metrics
        </p>
      </div>

      {/* SLA Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {slaMetrics.map((sla, idx) => (
          <Card key={idx}>
            <p className="text-xs font-medium text-slate-500">{sla.title}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{sla.value}</p>
            <p className="text-[11px] text-slate-500 mt-1">{sla.sub}</p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
              <div className={`h-full rounded-full ${sla.barColor}`} style={{ width: '94%' }} />
            </div>
          </Card>
        ))}
      </div>

      {/* Category SLA Table */}
      <Card title="Grievance SLA & Resolution Times by Category" subtitle="Benchmark metrics across campus operational divisions">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 font-semibold">Service Category</th>
                <th className="pb-3 font-semibold text-center">Total Received</th>
                <th className="pb-3 font-semibold text-center">Successfully Resolved</th>
                <th className="pb-3 font-semibold text-center">Avg Turnaround Time</th>
                <th className="pb-3 font-semibold text-right">Resolution Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categoryBreakdown.map((cat, i) => {
                const rate = ((cat.resolved / cat.total) * 100).toFixed(0);
                return (
                  <tr key={i} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 font-medium text-slate-900">{cat.name}</td>
                    <td className="py-3 text-center text-slate-600">{cat.total}</td>
                    <td className="py-3 text-center text-slate-800 font-semibold">{cat.resolved}</td>
                    <td className="py-3 text-center text-slate-600 font-mono">{cat.avgHours} hrs</td>
                    <td className="py-3 text-right">
                      <span className="font-bold text-emerald-600">{rate}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Longitudinal Attendance Trend */}
      <Card title="Campus Attendance Trend (Monthly Aggregate)" subtitle="Cross-departmental attendance patterns">
        <div className="space-y-4">
          {monthlyTurnout.map((t, idx) => (
            <div key={idx} className="space-y-1 text-xs">
              <div className="flex justify-between items-center text-slate-700 font-medium">
                <span>{t.month}</span>
                <span className="font-bold text-slate-900">{t.attendance}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${t.attendance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
