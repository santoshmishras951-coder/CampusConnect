import React from 'react';
import { Card } from '../../components/common/Card.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

export const SuperAdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-linear-to-br from-red-700 via-slate-800 to-indigo-900 rounded-3xl p-8 text-white shadow-xl border border-white/10 group transition-all duration-500">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-500/30 text-red-200 border border-red-400/30 uppercase tracking-widest">
            System Overlord Control
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mt-2 drop-shadow-md uppercase">
            WELCOME {user?.name || 'SUPER ADMIN'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            CampusConnect Infrastructure Root • {user?.email}
          </p>
        </div>
      </div>
      <Card title="Global Infrastructure Overview" subtitle="System-wide real-time metrics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <p className="text-sm">Total Hostels and Students...</p>
          <p className="text-sm">Manage Administrators...</p>
          <p className="text-sm">Reports and Analytics...</p>
          <p className="text-sm">System Settings...</p>
        </div>
      </Card>
    </div>
  );
};
