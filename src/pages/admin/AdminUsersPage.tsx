import React, { useState } from 'react';
import { Users, Search, Filter, ShieldCheck, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { UserRole } from '../../types/index.ts';

interface UserRecord {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  identifier: string;
  department: string;
  active: boolean;
}

const SAMPLE_USERS: UserRecord[] = [
  { uid: 'u1', name: 'Aarav Mohapatra', email: 'aarav.m@campusconnect.edu', role: 'student', identifier: 'CC-2024-CSE-042', department: 'Computer Science', active: true },
  { uid: 'u2', name: 'Prof. Subhashree Dash', email: 's.dash@campusconnect.edu', role: 'faculty', identifier: 'EMP/FAC/108', department: 'Computer Science', active: true },
  { uid: 'u3', name: 'Dr. Ramesh Chandra Sahoo', email: 'warden.mahanadi@campusconnect.edu', role: 'warden', identifier: 'EMP/WRD/04', department: 'Hostel Administration', active: true },
  { uid: 'u4', name: 'Bikash Jena', email: 'bikash.maint@campusconnect.edu', role: 'maintenance', identifier: 'EMP/MNT/22', department: 'Estate & Maintenance', active: true },
  { uid: 'u5', name: 'Santosh Mishra', email: 'santoshmishras951@gmail.com', role: 'admin', identifier: 'EMP/ADM/01', department: 'Dean Academic Affairs', active: true },
  { uid: 'u6', name: 'Aakash Jena', email: 'aakash.j@campusconnect.edu', role: 'student', identifier: 'CC-2024-CSE-041', department: 'Computer Science', active: true },
  { uid: 'u7', name: 'Ananya Pattnaik', email: 'ananya.p@campusconnect.edu', role: 'student', identifier: 'CC-2024-CSE-043', department: 'Computer Science', active: true },
  { uid: 'u8', name: 'Dr. P. Patra', email: 'p.patra@campusconnect.edu', role: 'faculty', identifier: 'EMP/FAC/112', department: 'Computer Science', active: true }
];

export const AdminUsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filtered = SAMPLE_USERS.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.identifier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">User & RBAC Directory</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Campus-wide roster of students, faculty, wardens, maintenance crew and administrators
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Total Registered:</span>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
            {SAMPLE_USERS.length} Directory Accounts
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, email, roll number or employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-700 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="faculty">Faculty</option>
            <option value="warden">Hostel Wardens</option>
            <option value="maintenance">Maintenance</option>
            <option value="admin">Administrators</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 font-semibold">User Name & ID</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Department</th>
                <th className="pb-3 font-semibold text-right">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.uid} className="hover:bg-slate-50/70 transition">
                  <td className="py-3">
                    <p className="font-semibold text-slate-900">{u.name}</p>
                    <p className="text-[11px] font-mono text-slate-400">{u.identifier}</p>
                  </td>
                  <td className="py-3 text-slate-600 font-mono text-[11px]">{u.email}</td>
                  <td className="py-3">
                    <Badge variant={u.role} />
                  </td>
                  <td className="py-3 text-slate-600">{u.department}</td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
