import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  Bell,
  FileText,
  AlertCircle,
  User,
  Users,
  BookOpen,
  BarChart3,
  LogOut,
  Menu,
  X,
  Languages,
  Plus,
  Wrench,
  ChevronDown,
  WifiOff,
  UserCheck,
  CheckCircle2,
  MapPin,
  Cpu,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import { UserRole, InAppNotification } from '../types/index.ts';
import { CampusLogo } from '../components/common/CampusLogo.tsx';
import { ChatbotButton } from '../components/common/ChatbotButton.tsx';
import { StudentProfileEditModal } from '../components/student/StudentProfileEditModal.tsx';
import {
  getStoredNotifications,
  markNotificationsAsRead,
  clearAllNotifications
} from '../utils/notificationService.ts';

export const AppShell: React.FC = () => {
  const { user, role, switchDemoRole, logout } = useAuth();
  const { language, setLanguage, addLanguage, availableLanguages, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [customLangInput, setCustomLangInput] = useState('');
  const [showAddLangInput, setShowAddLangInput] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isOffline] = useState(!navigator.onLine);
  const [notifications, setNotifications] = useState<InAppNotification[]>(() => getStoredNotifications());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('campusconnect_theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('campusconnect_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleUpdate = () => {
      setNotifications(getStoredNotifications());
    };
    const handleOpenEdit = () => {
      setIsEditProfileOpen(true);
    };
    window.addEventListener('campusconnect:notifications_updated', handleUpdate);
    window.addEventListener('campusconnect:open_profile_edit', handleOpenEdit);
    return () => {
      window.removeEventListener('campusconnect:notifications_updated', handleUpdate);
      window.removeEventListener('campusconnect:open_profile_edit', handleOpenEdit);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleChange = (newRole: UserRole) => {
    switchDemoRole(newRole);
    navigate(`/${newRole}/dashboard`);
    setProfileDropdownOpen(false);
  };

  const handleAddCustomLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (customLangInput.trim()) {
      addLanguage(customLangInput.trim());
      setCustomLangInput('');
      setShowAddLangInput(false);
      setLanguageMenuOpen(false);
    }
  };

  // Build role-based navigation items (Timetable removed per user request)
  const getNavLinks = () => {
    switch (role) {
      case 'super_admin':
        return [
          { to: '/admin/dashboard', label: 'Super Admin Dashboard', icon: LayoutDashboard },
          { to: '/admin/users', label: 'Manage Admins', icon: Users },
          { to: '/admin/analytics', label: 'Reports & Analytics', icon: BarChart3 },
        ];
      case 'admin':
        return [
          { to: '/admin/dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
          { to: '/admin/users', label: 'Student Registration', icon: Users },
          { to: '/warden/requests', label: 'Room Allocation', icon: FileText },
          { to: '/admin/notices', label: 'Hostel Notices', icon: Bell },
        ];
      case 'parent':
        return [
          { to: '/parent/dashboard', label: 'Parent Dashboard', icon: LayoutDashboard },
          { to: '/student/attendance', label: 'Attendance', icon: CalendarCheck },
          { to: '/student/requests', label: 'Leave Approvals', icon: FileText },
        ];
      case 'student':
        return [
          { to: '/student/dashboard', label: t.dashboard, icon: LayoutDashboard },
          { to: '/student/attendance', label: t.attendance, icon: CalendarCheck },
          { to: '/student/notices', label: t.notices, icon: Bell },
          { to: '/student/requests', label: t.requests, icon: FileText },
          { to: '/student/complaints', label: t.complaints, icon: AlertCircle },
          { to: '/campus-map', label: t.campusMap || 'Campus Map', icon: MapPin },
          { to: '/student/profile', label: t.profile, icon: User },
        ];
      case 'faculty':
        return [
          { to: '/faculty/dashboard', label: t.dashboard, icon: LayoutDashboard },
          { to: '/faculty/attendance', label: t.attendance, icon: CalendarCheck },
          { to: '/campus-map', label: t.campusMap || 'Campus Map', icon: MapPin },
        ];
      case 'warden':
        return [
          { to: '/warden/dashboard', label: t.dashboard, icon: LayoutDashboard },
          { to: '/warden/requests', label: t.requests, icon: FileText },
          { to: '/warden/complaints', label: t.complaints, icon: AlertCircle },
          { to: '/campus-map', label: t.campusMap || 'Campus Map', icon: MapPin },
        ];
      case 'maintenance':
        return [
          { to: '/maintenance/dashboard', label: t.dashboard, icon: LayoutDashboard },
          { to: '/maintenance/complaints', label: t.complaints, icon: Wrench },
          { to: '/campus-map', label: t.campusMap || 'Campus Map', icon: MapPin },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  const getRoleBadgeColor = (r: UserRole | null) => {
    switch (r) {
      case 'super_admin':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'admin':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'parent':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'warden':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'faculty':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getRoleDisplayName = (r: UserRole | null) => {
    switch (r) {
      case 'super_admin':
        return 'Super Admin';
      case 'admin':
        return 'Administrator';
      case 'parent':
        return 'Parent';
      case 'warden':
        return 'Hostel Warden';
      case 'faculty':
        return 'Faculty';
      case 'maintenance':
        return 'Maintenance Staff';
      default:
        return 'Student';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row text-slate-800 dark:text-slate-200">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-white dark:bg-slate-950 border-r border-slate-200/90 dark:border-slate-800 shadow-xs shrink-0 select-none">
        {/* Brand Header with Custom Logo */}
        <div className="h-16 flex items-center px-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
          <CampusLogo size="md" />
        </div>

        {/* Current Role Callout */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">Logged Role:</span>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getRoleBadgeColor(
              role
            )}`}
          >
            {getRoleDisplayName(role)}
          </span>
        </div>

        {/* Nav list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'
                  }`}
                />
                <span className="truncate">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>


        {/* User Footer Profile Card */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 border border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs uppercase shrink-0 overflow-hidden">
              {user?.photoUrl ? (
                <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name ? user.name.slice(0, 2) : 'CC'
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user?.name || 'Guest User'}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-mono">{user?.studentId || user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors cursor-pointer"
              title={t.logout}
              aria-label={t.logout}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
          {/* Mobile hamburger & brand */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <CampusLogo size="sm" showSubtitle={false} />
          </div>

          {/* Desktop Heading / Title info */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-800 rounded-md border border-indigo-100">
              CampusConnect Portal
            </span>
            <span className="text-xs text-slate-400">/</span>
            <span className="text-xs font-medium text-slate-600 capitalize">
              {role} {t.dashboard}
            </span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 ml-auto">
            {/* Multi-Language Selector Dropdown with "+ Add Language" */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 cursor-pointer transition"
                title="Change or Add Portal Language"
              >
                <Languages className="w-3.5 h-3.5 text-indigo-600" />
                <span className="capitalize font-semibold text-[11px]">
                  {language}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">{t.language}</span>
                    <button
                      type="button"
                      onClick={() => setShowAddLangInput(!showAddLangInput)}
                      className="text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-0.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Add Custom
                    </button>
                  </div>

                  {/* Add Language Form */}
                  {showAddLangInput && (
                    <form onSubmit={handleAddCustomLanguage} className="p-2 bg-indigo-50/70 border-b border-indigo-100">
                      <p className="text-[10px] text-indigo-900 font-medium mb-1">
                        Type any language (e.g. Chinese, chainess, French):
                      </p>
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          placeholder="e.g. Chinese"
                          value={customLangInput}
                          onChange={(e) => setCustomLangInput(e.target.value)}
                          className="flex-1 px-2 py-1 text-xs bg-white border border-indigo-200 rounded text-slate-800 focus:outline-hidden"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="px-2 py-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Available language items */}
                  <div className="py-1 max-h-56 overflow-y-auto">
                    {availableLanguages.map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => {
                          setLanguage(opt.key);
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-left cursor-pointer transition ${
                          language === opt.key
                            ? 'bg-indigo-50 text-indigo-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{opt.nativeLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Offline indicator if disconnected */}
            {isOffline && (
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-xs font-medium"
                title="Running in cached offline mode"
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Offline Cached</span>
              </div>
            )}

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer transition shadow-2xs"
              title={theme === 'dark' ? 'Click to switch to Light Theme' : 'Click to switch to Dark Theme'}
              aria-label="Toggle dark/light theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg relative cursor-pointer transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{t.notificationsTitle}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={markNotificationsAsRead}
                        className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                      >
                        {t.markAllRead}
                      </button>
                      <button
                        type="button"
                        onClick={clearAllNotifications}
                        className="text-[11px] text-slate-400 hover:text-rose-600 cursor-pointer"
                      >
                        {t.clearAll}
                      </button>
                    </div>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400">
                        <Bell className="w-6 h-6 mx-auto mb-1 opacity-30" />
                        <p className="text-xs">{t.noNotifications}</p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 transition ${n.read ? 'bg-white hover:bg-slate-50/70' : 'bg-indigo-50/40 hover:bg-indigo-50/70'}`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="font-semibold text-slate-800 line-clamp-1">{n.title}</span>
                            {!n.read && (
                              <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
                            )}
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed">{n.body}</p>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                            <span>{n.senderName ? `From: ${n.senderName}` : 'Campus Authority'}</span>
                            <span>{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar with Uploaded Photo Support */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 cursor-pointer text-slate-700 transition"
                aria-label="Open user menu"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-2xs overflow-hidden border border-indigo-400">
                  {user?.photoUrl ? (
                    <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user?.name ? user.name.slice(0, 2) : 'CC'
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-slate-800 leading-tight">{user?.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium capitalize">{role}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm uppercase overflow-hidden shrink-0 border border-indigo-300">
                      {user?.photoUrl ? (
                        <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user?.name ? user.name.slice(0, 2) : 'CC'
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate font-mono">{user?.studentId || user?.email}</p>
                      {user?.collegeName && (
                        <p className="text-[10px] text-indigo-700 font-medium truncate mt-0.5">{user.collegeName}</p>
                      )}
                      <span
                        className={`inline-block mt-1 text-[9px] font-semibold px-2 py-0.2 rounded-full border ${getRoleBadgeColor(
                          role
                        )}`}
                      >
                        {getRoleDisplayName(role)}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    {role === 'student' && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditProfileOpen(true);
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-indigo-700 hover:bg-indigo-50 font-semibold cursor-pointer"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Edit Profile & Photo</span>
                      </button>
                    )}
                    <NavLink
                      to={role === 'student' ? '/student/profile' : `/${role}/dashboard`}
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.profile}</span>
                    </NavLink>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t.logout}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 shadow-md z-20 space-y-3">
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        )}

        {/* Child Page Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900">
          <Outlet />
        </main>
      </div>

      {/* Edit Profile Modal */}
      <StudentProfileEditModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
      <ChatbotButton />
    </div>
  );
};
