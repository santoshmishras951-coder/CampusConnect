import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Mail, Lock, Languages, Plus } from 'lucide-react';
import { useAuth, DEFAULT_PROFILES } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { UserRole } from '../../types/index.ts';
import { CampusLogo } from '../../components/common/CampusLogo.tsx';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { t, language, setLanguage, addLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddLang, setShowAddLang] = useState(false);
  const [newLangInput, setNewLangInput] = useState('');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Removed setEmail(DEFAULT_PROFILES[role].email) to keep it blank as requested
  };

  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLangInput.trim()) {
      addLanguage(newLangInput.trim());
      setNewLangInput('');
      setShowAddLang(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, selectedRole);
      navigate(`/${selectedRole}/dashboard`);
    } catch {
      setError('Invalid credentials or account inactive.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Top language selector */}
      <div className="absolute top-6 right-6 flex flex-wrap items-center gap-1.5 bg-white rounded-xl p-1.5 border border-slate-200 shadow-xs z-20">
        <div className="flex items-center gap-1 text-xs text-slate-500 mr-1 pl-1">
          <Languages className="w-3.5 h-3.5 text-indigo-600" />
        </div>
        {availableLanguages.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => setLanguage(opt.key)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg cursor-pointer transition ${
              language === opt.key ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {opt.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowAddLang(!showAddLang)}
          className="px-2 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-indigo-700 cursor-pointer flex items-center gap-0.5"
          title="Add any custom language (e.g. Chinese)"
        >
          <Plus className="w-3 h-3" /> Add
        </button>
      </div>

      {showAddLang && (
        <div className="absolute top-18 right-6 p-3 bg-white rounded-xl shadow-xl border border-slate-200 z-30">
          <form onSubmit={handleAddLanguage} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. Chinese"
              value={newLangInput}
              onChange={(e) => setNewLangInput(e.target.value)}
              className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg text-slate-800"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold"
            >
              Add
            </button>
          </form>
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-2">
          <CampusLogo size="xl" showSubtitle={false} />
        </div>
        <p className="mt-1 text-xs font-bold text-indigo-600 uppercase tracking-widest">
          Smart University Management Portal
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Simplifying everyday campus life for students, faculty & administrators
        </p>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xs border border-slate-200/80 rounded-2xl sm:px-10">
          {/* Persona selector for testing */}
          <div className="mb-6 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Select Login Account:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className={`p-2 rounded-lg text-left font-medium border cursor-pointer transition ${
                  selectedRole === 'student'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('faculty')}
                className={`p-2 rounded-lg text-left font-medium border cursor-pointer transition ${
                  selectedRole === 'faculty'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                👨‍🏫 Faculty
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('warden')}
                className={`p-2 rounded-lg text-left font-medium border cursor-pointer transition ${
                  selectedRole === 'warden'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                🏢 Warden
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('maintenance')}
                className={`p-2 rounded-lg text-left font-medium border cursor-pointer transition ${
                  selectedRole === 'maintenance'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                🔧 Maintenance
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className={`w-full mt-2 p-2 rounded-lg text-left font-medium border cursor-pointer transition text-xs ${
                selectedRole === 'admin'
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              🛡️ Campus Administrator
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs border border-rose-200">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700">
                Email Address
              </label>
              <div className="mt-1 relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <div className="mt-1 relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-xs text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer"
            >
              {isSubmitting ? 'Authenticating...' : `${t.login} as ${selectedRole.toUpperCase()}`}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
            <p>CampusConnect Unified Smart Portal</p>
            <p className="mt-1 text-[11px] text-slate-400">
              Role-Based Access Control enforced at database & UI layer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
