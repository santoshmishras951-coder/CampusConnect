export type UserRole = 'student' | 'faculty' | 'warden' | 'maintenance' | 'admin' | 'parent' | 'super_admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string; // Registration Number / Student ID e.g. CC-2024-CSE-042
  regNo?: string;
  collegeName?: string; // Name of their college / institution
  dob?: string; // YYYY-MM-DD
  photoUrl?: string; // Profile picture URL or Base64 Data URL
  classId?: string;
  className?: string;
  section?: string;
  hostelId?: string;
  hostelRoom?: string;
  phone?: string;
  bloodGroup?: string;
  guardianPhone?: string;
  address?: string;
  academicYear?: string;
  preferredLanguage?: string;
  active: boolean;
  hasCompletedProfile?: boolean;
  createdAt?: string | number;
}

export interface ClassItem {
  id: string;
  name: string;
  section: string;
  academicYear: string;
  teacherIds: string[];
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName?: string;
  classId: string;
  className?: string;
  section?: string;
  dateKey: string; // YYYY-MM-DD
  status: AttendanceStatus;
  markedBy: string;
  createdAt: string | number;
}

export type NoticeTargetType = 'all' | 'class' | 'section' | 'hostel';

export interface NoticeItem {
  id: string;
  title: string;
  titleOr?: string; // Odia
  titleHi?: string; // Hindi
  titleTe?: string; // Telugu
  titleZh?: string; // Chinese
  body: string;
  bodyOr?: string;
  bodyHi?: string;
  bodyTe?: string;
  bodyZh?: string;
  targetType: NoticeTargetType;
  targetIds?: string[];
  publishedBy: string;
  publishedByName?: string;
  publishedAt: string | number;
  active: boolean;
  priority?: 'normal' | 'urgent';
  cachedAt?: number;
}

export type RequestType = 'leave' | 'gate_pass';
export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface CampusRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentRoll?: string;
  className?: string;
  hostelId?: string;
  type: RequestType;
  reason: string;
  startDate: string;
  endDate?: string;
  destination?: string;
  status: RequestStatus;
  parentApprovalStatus?: 'pending' | 'approved' | 'rejected';
  familyMobileNo?: string;
  roomNo?: string;
  semester?: string; // e.g. 3rd Year (6th Sem)
  stayDuration?: number; // Total days
  reviewedBy?: string;
  reviewedByName?: string;
  reviewNote?: string;
  wardenPhone?: string; // Warden mobile number
  approvedAt?: number; // timestamp in ms when approved
  expiresAt?: number; // approvedAt + (stayDuration * days)
  isDeleted?: boolean; // stored in history if student deletes it
  deletedAt?: number;
  createdAt: string | number;
  updatedAt?: string | number;
}

export type ComplaintCategory =
  | 'general'
  | 'hostel'
  | 'water'
  | 'electricity'
  | 'wifi'
  | 'cleanliness'
  | 'maintenance'
  | 'academic'
  | 'health'
  | 'safety'
  | 'personal'
  | 'other';

export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';

export type ComplaintStatus =
  | 'pending'
  | 'assigned'
  | 'in_progress'
  | 'resolved'
  | 'closed';

export interface CampusComplaint {
  id: string;
  ticketNumber: string;
  studentId: string;
  studentName: string;
  studentRoll?: string;
  category: ComplaintCategory;
  location: string;
  title: string;
  description: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  assignedTo?: string;
  assignedToName?: string;
  assignedDepartment?: string;
  resolutionNote?: string;
  photoUrl?: string;
  createdAt: string | number;
  updatedAt?: string | number;
  resolvedAt?: string | number;
}

export interface ComplaintEvent {
  id: string;
  complaintId: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  oldStatus?: ComplaintStatus;
  newStatus?: ComplaintStatus;
  note?: string;
  createdAt: string | number;
}

export interface InAppNotification {
  id: string;
  recipientUid?: string;
  type: 'request' | 'complaint' | 'notice' | 'system';
  title: string;
  body: string;
  senderName?: string;
  relatedDocumentId?: string;
  read: boolean;
  createdAt: string | number;
}
