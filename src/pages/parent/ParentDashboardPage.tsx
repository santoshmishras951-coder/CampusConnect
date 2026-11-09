import React, { useState, useEffect } from 'react';
import { 
  User, 
  CalendarCheck, 
  FileText, 
  Phone, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertCircle,
  GraduationCap,
  Building2,
  PhoneCall
} from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { EmptyState } from '../../components/common/EmptyState.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { CampusRequest } from '../../types/index.ts';

const STORAGE_KEY = 'campusconnect_requests';

export const ParentDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [requests, setRequests] = useState<CampusRequest[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const allRequests = JSON.parse(saved);
        // In a real app, we would filter by childId
        setRequests(allRequests);
      } catch (err) {
        console.error('Failed to load requests for parent view:', err);
      }
    }
  }, []);

  const childName = "Aarav Mohapatra";
  const childRegNo = "2401292268";

  return (
    <div className="space-y-6">
      {/* Child Identity Header */}
      <div className="relative overflow-hidden bg-linear-to-br from-indigo-700 via-slate-800 to-sky-900 rounded-3xl p-8 text-white shadow-xl border border-white/10 group transition-all duration-500">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-black uppercase drop-shadow-md">
              {childName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-xs font-bold text-sky-300 uppercase tracking-widest mb-1">Parent Access Portal</p>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-md uppercase">
                WELCOME {user?.name || 'PARENT'}!
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100 mt-2 font-medium">
                Monitoring Registered Child Profile
              </p>
              <p className="text-[11px] text-indigo-200/80 mt-1">
                Unified Parent Control Dashboard • CampusConnect
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 bg-black/20 p-3 rounded-2xl border border-white/5">
            <span className="text-[10px] text-sky-300 font-bold uppercase tracking-wider">Verified Contact</span>
            <span className="text-sm font-black">+91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Attendance</p>
            <p className="text-lg font-bold text-slate-900">84.6%</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Leaves</p>
            <p className="text-lg font-bold text-slate-900">{requests.filter(r => r.status === 'approved' && r.type === 'leave').length}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Security Status</p>
            <p className="text-lg font-bold text-slate-900">On Campus</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Requests & Gate Passes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Child's Leave & Gate Pass History</h2>
          </div>

          {requests.length === 0 ? (
            <EmptyState 
              icon={FileText}
              title="No Requests Yet"
              description="Any leave requests submitted by your child will appear here for your reference."
            />
          ) : (
            requests.map((req) => (
              <Card key={req.id} className="hover:border-slate-300 transition">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {req.type === 'gate_pass' ? '🚪 Gate Pass' : '✈️ Leave'}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">#{req.id}</span>
                    </div>
                    <Badge variant={req.status} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-900">{req.reason}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <CalendarCheck className="w-3.5 h-3.5" />
                        From: {new Date(req.startDate).toLocaleDateString()}
                      </span>
                      {req.endDate && (
                        <span className="flex items-center gap-1">
                          <CalendarCheck className="w-3.5 h-3.5" />
                          To: {new Date(req.endDate).toLocaleDateString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-bold text-indigo-700">
                        <Clock className="w-3.5 h-3.5" />
                        Stay: {req.stayDuration || 1} Days {req.semester && `• ${req.semester}`}
                      </span>
                      {req.destination && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {req.destination}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Warden Contact Log */}
                  <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                      <PhoneCall className="w-4 h-4 text-indigo-600" />
                      <span>Warden Verification Status</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {req.status === 'approved' 
                        ? `The Warden (${req.reviewedByName || 'Hostel Warden'}) confirmed this request with you via phone call before approval.`
                        : req.status === 'pending'
                        ? "The Warden will call your registered mobile number shortly to verify this request. Approval is only granted after parental consent."
                        : "This request was reviewed and rejected. No further action needed."}
                    </p>
                  </div>

                  {req.reviewNote && (
                    <div className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-50">
                      Warden's Remark: "{req.reviewNote}"
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Sidebar Contacts */}
        <div className="space-y-6">
          <Card title="Hostel Warden Contacts" subtitle="For quick verification or emergency">
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-900">Dr. Ramesh Chandra Sahoo</p>
                <p className="text-[10px] text-slate-500 mb-2">Primary Hostel Warden</p>
                <a 
                  href="tel:+919861099887"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-lg hover:bg-indigo-700 transition w-full justify-center"
                >
                  <Phone className="w-3 h-3" />
                  Call Warden
                </a>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-900">Asst. Warden Desk</p>
                <p className="text-[10px] text-slate-500 mb-2">Emergency/Morning Support</p>
                <a 
                  href="tel:9668139559"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-[10px] font-bold rounded-lg hover:bg-slate-50 transition w-full justify-center"
                >
                  <Phone className="w-3 h-3" />
                  Call Asst. Warden
                </a>
              </div>
            </div>
          </Card>

          <Card title="Attendance Policy" subtitle="GEC Academic Requirements">
            <div className="space-y-3 text-[11px] text-slate-600">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <p>Minimum 75% attendance is required for semester exam eligibility.</p>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <p>All gate entries and exits are logged via biometric scanners.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
