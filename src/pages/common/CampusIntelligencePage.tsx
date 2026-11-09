import React, { useState } from 'react';
import {
  Cpu,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  Wrench,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Activity,
  Layers,
  Sparkles,
  BarChart2,
  Calendar,
  Send,
  Building2,
  Info
} from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import {
  IntelligenceRiskItem,
  VolumeTrendItem,
  OverdueTicketItem,
  PreventiveWorkOrder,
  INITIAL_RISK_ITEMS,
  INITIAL_VOLUME_TRENDS,
  INITIAL_OVERDUE_TICKETS,
  INITIAL_PREVENTIVE_WORK_ORDERS
} from '../../data/campusIntelligenceData.ts';

export const CampusIntelligencePage: React.FC = () => {
  const { user, role } = useAuth();
  const { t } = useLanguage();

  const [riskItems, setRiskItems] = useState<IntelligenceRiskItem[]>(INITIAL_RISK_ITEMS);
  const [volumeTrends] = useState<VolumeTrendItem[]>(INITIAL_VOLUME_TRENDS);
  const [overdueTickets] = useState<OverdueTicketItem[]>(INITIAL_OVERDUE_TICKETS);
  const [workOrders, setWorkOrders] = useState<PreventiveWorkOrder[]>(INITIAL_PREVENTIVE_WORK_ORDERS);
  const [selectedRisk, setSelectedRisk] = useState<IntelligenceRiskItem>(INITIAL_RISK_ITEMS[0]);
  const [dispatchAlert, setDispatchAlert] = useState<string | null>(null);

  const handleDispatchOrder = (orderId: string) => {
    setWorkOrders((prev) =>
      prev.map((wo) =>
        wo.id === orderId ? { ...wo, status: 'dispatched' } : wo
      )
    );
    const target = workOrders.find((w) => w.id === orderId);
    setDispatchAlert(`Preventive Work Order ${orderId} dispatched to ${target?.assignedTechnician || 'Technician'}!`);
    setTimeout(() => setDispatchAlert(null), 4000);
  };

  const getRiskBadgeColor = (level: IntelligenceRiskItem['riskLevel']) => {
    switch (level) {
      case 'Critical': return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Elevated': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Medium': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Low': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              Autonomous Predictive Engine
            </span>
            <span className="text-xs text-slate-300">Continuous Service Record Analysis & SLA Audit</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Predictive Campus Intelligence Cockpit
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Detects recurring grievances across facilities, calculates failure probabilities using transparent weighted rules, and automates preventive maintenance work orders.
          </p>
        </div>

        {/* Algorithm Score Formula Pill */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-slate-300 max-w-xs space-y-1">
          <p className="font-bold text-white text-[11px] uppercase tracking-wider flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" /> Transparent Rule Engine
          </p>
          <p className="text-[10px] text-slate-400 font-mono">
            Score = (Recurrence × 35%) + (Age × 30%) + (Wear × 20%) + (Load × 15%)
          </p>
        </div>
      </div>

      {dispatchAlert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{dispatchAlert}</span>
        </div>
      )}

      {/* Top Level Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-rose-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">High Risk Hotspots</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">2 Facilities</p>
              <p className="text-[11px] text-rose-600 mt-1 font-semibold">Mahanadi Hostel & Library</p>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Fastest Growing Issue</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">+75% WoW</p>
              <p className="text-[11px] text-amber-700 mt-1 font-semibold">Plumbing & Water Seepage</p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Overdue SLA Tickets</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{overdueTickets.length} Breaches</p>
              <p className="text-[11px] text-indigo-700 mt-1">Avg breach delay: 4.8 hrs</p>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Preventive Actions</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{workOrders.length} Ready</p>
              <p className="text-[11px] text-emerald-700 mt-1 font-semibold">Estimated ROI: ₹34,000</p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Section 1: Recurring Facility Hotspots & AI Risk Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Hotspots List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card
            title="Recurring Facility Complaint Hotspots"
            subtitle="Facilities with repetitive breakdowns triggering predictive warnings"
          >
            <div className="space-y-3">
              {riskItems.map((item) => {
                const isSelected = item.id === selectedRisk.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedRisk(item)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-500'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getRiskBadgeColor(item.riskLevel)}`}>
                          {item.riskLevel} Risk ({item.riskScore}/100)
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">{item.category}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-700">
                        {item.recurringTicketCount} Repeat Tickets
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900">{item.facilityName}</h4>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.explanation}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Est. Failure Window: <strong className="text-slate-800">{item.estimatedFailureWindow}</strong></span>
                      <span className="text-indigo-600 font-semibold flex items-center gap-0.5">
                        Inspect Breakdown <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Selected Hotspot Transparent Risk Factor Inspection (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card
            title={`Predictive Risk Factor Breakdown: ${selectedRisk.facilityName}`}
            subtitle="Transparent explainable model based on university service logs and telemetry"
          >
            <div className="space-y-5">
              {/* Risk Score Dial Header */}
              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase border ${getRiskBadgeColor(selectedRisk.riskLevel)}`}>
                      {selectedRisk.riskLevel} Severity
                    </span>
                    <span className="text-xs text-slate-300 font-medium">Domain: {selectedRisk.category}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-200 mt-2">
                    Estimated Time-to-Failure: <span className="text-rose-400 font-bold">{selectedRisk.estimatedFailureWindow}</span>
                  </p>
                </div>
                <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4">
                  <span className="text-3xl font-extrabold text-white">{selectedRisk.riskScore}</span>
                  <span className="text-sm text-slate-400"> / 100</span>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Composite Risk Index</p>
                </div>
              </div>

              {/* Individual Weight Factors */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Explainable Factor Weights:
                </h4>

                {/* Factor 1: Recurrence Rate (35%) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">Complaint Recurrence Velocity (Weight: 35%)</span>
                    <span className="font-bold text-slate-900">{selectedRisk.factors.recurrenceRate}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${selectedRisk.factors.recurrenceRate}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400">Frequency of identical grievances logged within trailing 14 days.</p>
                </div>

                {/* Factor 2: Ticket Age & SLA Severity (30%) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">Ticket Age & Unresolved Severity (Weight: 30%)</span>
                    <span className="font-bold text-slate-900">{selectedRisk.factors.ticketAgeSeverity}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${selectedRisk.factors.ticketAgeSeverity}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400">Accumulated aging hours exceeding standard university SLA thresholds.</p>
                </div>

                {/* Factor 3: Asset Wear Factor (20%) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">Physical Asset Depreciation & Age (Weight: 20%)</span>
                    <span className="font-bold text-slate-900">{selectedRisk.factors.assetWearFactor}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${selectedRisk.factors.assetWearFactor}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400">Service lifecycle and time elapsed since previous scheduled overhaul.</p>
                </div>

                {/* Factor 4: Usage Load Stress (15%) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">Facility Usage Load & Peak Concourse (Weight: 15%)</span>
                    <span className="font-bold text-slate-900">{selectedRisk.factors.usageStress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${selectedRisk.factors.usageStress}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400">Daily student throughput and active endpoint density during operational peak.</p>
                </div>
              </div>

              {/* Recommended Action Card */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-700 shrink-0" />
                  <h5 className="font-bold text-xs text-amber-900">Recommended Preventive Protocol:</h5>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {selectedRisk.recommendedAction}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Section 2: Volume Velocity Trend Analysis & Overdue SLA Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Velocity Table */}
        <Card
          title="Category Velocity Trend Analysis"
          subtitle="Week-over-week complaint surges detecting emerging facility breakdowns"
        >
          <div className="space-y-3">
            {volumeTrends.map((trend, i) => {
              const isUp = trend.direction === 'up';
              return (
                <div key={i} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{trend.category}</span>
                      <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        isUp ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isUp ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                        {trend.changePct > 0 ? `+${trend.changePct}%` : `${trend.changePct}%`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Primary Hotspot: {trend.primaryHotspot}</p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-800 text-sm">{trend.thisWeekCount}</span>
                    <span className="text-[10px] text-slate-400 block">vs {trend.lastWeekCount} last wk</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* SLA Overdue Tickets */}
        <Card
          title="Overdue Tickets Breaching University SLA"
          subtitle="High-impact grievances requiring immediate administrative intervention"
        >
          <div className="space-y-3">
            {overdueTickets.map((ticket) => (
              <div key={ticket.ticketId} className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded text-[10px]">
                      {ticket.ticketId}
                    </span>
                    <span className="font-bold text-slate-900">{ticket.category}</span>
                    <Badge variant="urgent" label="SLA Breached" />
                  </div>
                  <span className="text-rose-700 font-bold font-mono text-xs">
                    {ticket.hoursElapsed} hrs elapsed
                  </span>
                </div>

                <p className="font-semibold text-slate-800">{ticket.description}</p>

                <div className="pt-2 border-t border-rose-100 flex flex-wrap items-center justify-between text-[11px] text-slate-600 gap-2">
                  <span>Facility: <strong>{ticket.facility}</strong> ({ticket.location})</span>
                  <span>Assigned: <strong>{ticket.assignedStaff}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Main Section 3: Actionable Preventive Work Orders */}
      <Card
        title="Recommended Preventive Work Orders"
        subtitle="Automated high-ROI work orders generated by predictive intelligence"
      >
        <div className="space-y-3">
          {workOrders.map((wo) => {
            const isDispatched = wo.status === 'dispatched';
            return (
              <div
                key={wo.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {wo.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      wo.priority === 'urgent'
                        ? 'bg-rose-100 text-rose-800'
                        : wo.priority === 'high'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {wo.priority} Priority
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Facility: {wo.facility}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{wo.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{wo.roiRationale}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {wo.scheduledDate} ({wo.estimatedHours} hrs)
                    </span>
                    <span>Lead: <strong>{wo.assignedTechnician}</strong></span>
                  </div>
                </div>

                <div className="shrink-0">
                  {isDispatched ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Dispatched to Crew
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDispatchOrder(wo.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Preventive Work Order</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
