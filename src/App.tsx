import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import { LanguageProvider } from './i18n/LanguageContext.tsx';
import { AppShell } from './layouts/AppShell.tsx';

// Public Pages
import { LoginPage } from './pages/auth/LoginPage.tsx';

// Student Pages
import { StudentDashboardPage } from './pages/student/StudentDashboardPage.tsx';
import { StudentAttendancePage } from './pages/student/StudentAttendancePage.tsx';
import { StudentNoticesPage } from './pages/student/StudentNoticesPage.tsx';
import { StudentRequestsPage } from './pages/student/StudentRequestsPage.tsx';
import { StudentComplaintsPage } from './pages/student/StudentComplaintsPage.tsx';
import { StudentProfilePage } from './pages/student/StudentProfilePage.tsx';

// Faculty Pages
import { FacultyDashboardPage } from './pages/faculty/FacultyDashboardPage.tsx';
import { FacultyAttendancePage } from './pages/faculty/FacultyAttendancePage.tsx';

// Warden Pages
import { WardenDashboardPage } from './pages/warden/WardenDashboardPage.tsx';
import { WardenRequestsPage } from './pages/warden/WardenRequestsPage.tsx';
import { WardenComplaintsPage } from './pages/warden/WardenComplaintsPage.tsx';

// Maintenance Pages
import { MaintenanceDashboardPage } from './pages/maintenance/MaintenanceDashboardPage.tsx';
import { MaintenanceComplaintsPage } from './pages/maintenance/MaintenanceComplaintsPage.tsx';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.tsx';
import { AdminUsersPage } from './pages/admin/AdminUsersPage.tsx';
import { AdminClassesPage } from './pages/admin/AdminClassesPage.tsx';
import { AdminAttendancePage } from './pages/admin/AdminAttendancePage.tsx';
import { AdminRequestsPage } from './pages/admin/AdminRequestsPage.tsx';
import { AdminComplaintsPage } from './pages/admin/AdminComplaintsPage.tsx';
import { AdminNoticesPage } from './pages/admin/AdminNoticesPage.tsx';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage.tsx';
import { ParentDashboardPage } from './pages/parent/ParentDashboardPage.tsx';
import { SuperAdminDashboardPage } from './pages/admin/SuperAdminDashboardPage.tsx';

// Common Signature Pages
import { CampusMapPage } from './pages/common/CampusMapPage.tsx';
import { CampusIntelligencePage } from './pages/common/CampusIntelligencePage.tsx';
import { CopilotPage } from './pages/common/CopilotPage.tsx';

// Role Guard Component
const RoleGuard: React.FC<{
  allowedRoles: string[];
  children: React.ReactNode;
}> = ({ allowedRoles, children }) => {
  const { user, role } = useAuth();

  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  // During evaluation, if a user navigates to a role route outside their active role, redirect to their role's dashboard
  if (!allowedRoles.includes(role)) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return <>{children}</>;
};

// Root index redirect
const RootRedirect: React.FC = () => {
  const { user, role } = useAuth();
  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={`/${role}/dashboard`} replace />;
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            {/* Public Auth */}
            <Route path="/login" element={<LoginPage />} />

            {/* Application Shell for Authenticated Routes */}
            <Route element={<AppShell />}>
              {/* Student Routes */}
              <Route
                path="/student/dashboard"
                element={
                  <RoleGuard allowedRoles={['student', 'admin']}>
                    <StudentDashboardPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/student/attendance"
                element={
                  <RoleGuard allowedRoles={['student', 'admin']}>
                    <StudentAttendancePage />
                  </RoleGuard>
                }
              />
              <Route
                path="/student/notices"
                element={
                  <RoleGuard allowedRoles={['student', 'admin']}>
                    <StudentNoticesPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/student/requests"
                element={
                  <RoleGuard allowedRoles={['student', 'admin']}>
                    <StudentRequestsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/student/complaints"
                element={
                  <RoleGuard allowedRoles={['student', 'admin']}>
                    <StudentComplaintsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/student/profile"
                element={
                  <RoleGuard allowedRoles={['student', 'admin']}>
                    <StudentProfilePage />
                  </RoleGuard>
                }
              />

              {/* Faculty Routes */}
              <Route
                path="/faculty/dashboard"
                element={
                  <RoleGuard allowedRoles={['faculty', 'admin']}>
                    <FacultyDashboardPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/faculty/attendance"
                element={
                  <RoleGuard allowedRoles={['faculty', 'admin']}>
                    <FacultyAttendancePage />
                  </RoleGuard>
                }
              />

              {/* Warden Routes */}
              <Route
                path="/warden/dashboard"
                element={
                  <RoleGuard allowedRoles={['warden', 'admin']}>
                    <WardenDashboardPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/warden/requests"
                element={
                  <RoleGuard allowedRoles={['warden', 'admin']}>
                    <WardenRequestsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/warden/complaints"
                element={
                  <RoleGuard allowedRoles={['warden', 'admin']}>
                    <WardenComplaintsPage />
                  </RoleGuard>
                }
              />

              {/* Maintenance Routes */}
              <Route
                path="/maintenance/dashboard"
                element={
                  <RoleGuard allowedRoles={['maintenance', 'admin']}>
                    <MaintenanceDashboardPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/maintenance/complaints"
                element={
                  <RoleGuard allowedRoles={['maintenance', 'admin']}>
                    <MaintenanceComplaintsPage />
                  </RoleGuard>
                }
              />
              {/* Parent Routes */}
              <Route
                path="/parent/dashboard"
                element={
                  <RoleGuard allowedRoles={['parent', 'admin']}>
                    <ParentDashboardPage />
                  </RoleGuard>
                }
              />

              {/* Administrator Routes */}
              <Route
                path="/super-admin/dashboard"
                element={
                  <RoleGuard allowedRoles={['super_admin']}>
                    <SuperAdminDashboardPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <RoleGuard allowedRoles={['admin', 'super_admin']}>
                    <AdminDashboardPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <RoleGuard allowedRoles={['admin']}>
                    <AdminUsersPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/admin/classes"
                element={
                  <RoleGuard allowedRoles={['admin']}>
                    <AdminClassesPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/admin/attendance"
                element={
                  <RoleGuard allowedRoles={['admin']}>
                    <AdminAttendancePage />
                  </RoleGuard>
                }
              />
              <Route
                path="/admin/requests"
                element={
                  <RoleGuard allowedRoles={['admin']}>
                    <AdminRequestsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/admin/complaints"
                element={
                  <RoleGuard allowedRoles={['admin']}>
                    <AdminComplaintsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/admin/notices"
                element={
                  <RoleGuard allowedRoles={['admin']}>
                    <AdminNoticesPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <RoleGuard allowedRoles={['admin']}>
                    <AdminAnalyticsPage />
                  </RoleGuard>
                }
              />

              {/* Campus Digital Twin Signature Route */}
              <Route
                path="/campus-map"
                element={
                  <RoleGuard allowedRoles={['student', 'faculty', 'warden', 'maintenance', 'admin']}>
                    <CampusMapPage />
                  </RoleGuard>
                }
              />

              {/* Predictive Campus Intelligence Signature Route */}
              <Route
                path="/intelligence"
                element={
                  <RoleGuard allowedRoles={['faculty', 'warden', 'maintenance', 'admin']}>
                    <CampusIntelligencePage />
                  </RoleGuard>
                }
              />
              {/* Copilot Route */}
              <Route
                path="/copilot"
                element={
                  <RoleGuard allowedRoles={['student', 'faculty', 'warden', 'maintenance', 'admin']}>
                    <CopilotPage />
                  </RoleGuard>
                }
              />
            </Route>

            {/* Root & Catch-All */}
            <Route path="/" element={<RootRedirect />} />
            <Route path="*" element={<RootRedirect />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
