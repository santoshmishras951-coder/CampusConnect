import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types/index.ts';

// Default sample profile data
export const DEFAULT_PROFILES: Record<UserRole, UserProfile> = {
  student: {
    uid: 'std-user-01',
    name: 'Aarav Mohapatra',
    email: 'aarav.m@campusconnect.edu',
    role: 'student',
    studentId: 'CC-2024-CSE-042',
    regNo: 'CC-2024-CSE-042',
    collegeName: 'Government College of Engineering & Technology',
    dob: '2004-06-15',
    photoUrl: '', // Will be set on upload or onboarding
    classId: 'class-cse-3a',
    className: 'B.Tech Computer Science',
    section: 'Section A',
    academicYear: '3rd Year (2024-2028)',
    hostelId: 'Mahanadi Hall of Residence',
    hostelRoom: 'Room 304, 3rd Floor East',
    phone: '+91 98765 43210',
    guardianPhone: '+91 98610 11223',
    bloodGroup: 'O+ Positive',
    address: 'Sector 5, University Campus Enclave',
    preferredLanguage: 'english',
    active: true,
    hasCompletedProfile: true
  },
  faculty: {
    uid: 'fac-user-01',
    name: 'Prof. Subhashree Dash',
    email: 's.dash@campusconnect.edu',
    role: 'faculty',
    className: 'Department of Computer Science & Engineering',
    phone: '+91 94370 11223',
    preferredLanguage: 'english',
    active: true,
    hasCompletedProfile: true
  },
  warden: {
    uid: 'wrd-user-01',
    name: 'Dr. Ramesh Chandra Sahoo',
    email: 'warden@campusconnect.edu',
    role: 'warden',
    hostelId: 'Mahanadi Hall of Residence',
    phone: '+91 98610 99887',
    preferredLanguage: 'english',
    active: true,
    hasCompletedProfile: true
  },
  maintenance: {
    uid: 'mnt-user-01',
    name: 'Bikash Jena',
    email: 'bikash.maint@campusconnect.edu',
    role: 'maintenance',
    phone: '+91 99370 55443',
    preferredLanguage: 'odia',
    active: true,
    hasCompletedProfile: true
  },
  parent: {
    uid: 'prt-user-01',
    name: 'Suresh Mohapatra',
    email: 'suresh.m@campusconnect.edu',
    role: 'parent',
    phone: '+91 99370 12345',
    preferredLanguage: 'english',
    active: true,
    hasCompletedProfile: true
  },
  admin: {
    uid: 'adm-user-01',
    name: 'Santosh Mishra',
    email: 'santoshmishras951@gmail.com',
    role: 'admin',
    phone: '+91 94371 00001',
    preferredLanguage: 'english',
    active: true,
    hasCompletedProfile: true
  },
  super_admin: {
    uid: 'super-adm-01',
    name: 'Super Admin',
    email: 'super.admin@campusconnect.edu',
    role: 'admin', // Mapping super_admin to 'admin' role in logic, or I should update UserRole
    phone: '+91 94371 00002',
    preferredLanguage: 'english',
    active: true,
    hasCompletedProfile: true
  }
};

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  role: UserRole | null;
  switchDemoRole: (role: UserRole) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  // Attendance Verification Gate (Reg No + DOB)
  isAttendanceUnlocked: boolean;
  verifyAndUnlockAttendance: (regNo: string, dob: string) => boolean;
  lockAttendance: () => void;
  isFirebaseConnected: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('campusconnect_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PROFILES.student;
      }
    }
    return DEFAULT_PROFILES.student;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [isFirebaseConnected] = useState<boolean>(false);
  const [isAttendanceUnlocked, setIsAttendanceUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('campusconnect_att_unlocked') === 'true';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('campusconnect_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('campusconnect_active_user');
    }
  }, [user]);

  const switchDemoRole = (newRole: UserRole) => {
    const selected = DEFAULT_PROFILES[newRole];
    setUser(selected);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated: UserProfile = {
        ...prev,
        ...updates,
        hasCompletedProfile: true
      };
      localStorage.setItem('campusconnect_active_user', JSON.stringify(updated));
      return updated;
    });
  };

  const extractNameFromEmail = (email: string): string => {
    if (!email) return 'USER';
    const prefix = email.split('@')[0];
    // Match only the first contiguous block of letters (A-Z, a-z)
    const match = prefix.match(/[a-zA-Z]+/);
    const name = match ? match[0] : prefix;
    return name.toUpperCase();
  };

  const login = async (email: string, requestedRole: UserRole = 'student'): Promise<boolean> => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const lowerEmail = email.toLowerCase();
    // Try to find a profile by email, but prioritize the requestedRole for the session
    const profileTemplateRole = (Object.keys(DEFAULT_PROFILES) as UserRole[]).find(
      (r) => DEFAULT_PROFILES[r].email.toLowerCase() === lowerEmail
    ) || requestedRole;

    const extractedName = extractNameFromEmail(email);

    const loggedInUser: UserProfile = {
      ...DEFAULT_PROFILES[profileTemplateRole],
      email: email || DEFAULT_PROFILES[profileTemplateRole].email,
      role: requestedRole, // Explicitly set the role selected in the UI
      name: extractedName // Override name based on email prefix
    };

    setUser(loggedInUser);
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAttendanceUnlocked(false);
    sessionStorage.removeItem('campusconnect_att_unlocked');
  };

  const verifyAndUnlockAttendance = (regNo: string, dob: string): boolean => {
    if (!user) return false;
    const cleanReg = regNo.trim().toUpperCase();
    const cleanDob = dob.trim();

    const expectedReg = (user.regNo || user.studentId || 'CC-2024-CSE-042').trim().toUpperCase();
    const expectedDob = (user.dob || '2004-06-15').trim();

    if (cleanReg === expectedReg && cleanDob === expectedDob) {
      setIsAttendanceUnlocked(true);
      sessionStorage.setItem('campusconnect_att_unlocked', 'true');
      return true;
    }
    return false;
  };

  const lockAttendance = () => {
    setIsAttendanceUnlocked(false);
    sessionStorage.removeItem('campusconnect_att_unlocked');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        role: user?.role || null,
        switchDemoRole,
        updateUserProfile,
        login,
        logout,
        isAttendanceUnlocked,
        verifyAndUnlockAttendance,
        lockAttendance,
        isFirebaseConnected
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
