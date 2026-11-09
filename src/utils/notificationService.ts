import { InAppNotification, NoticeItem } from '../types/index.ts';

const NOTIFICATIONS_KEY = 'campusconnect_notifications';
const NOTICES_KEY = 'campusconnect_notices';

export const getStoredNotifications = (): InAppNotification[] => {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveNotification = (notification: Omit<InAppNotification, 'id' | 'createdAt' | 'read'>): InAppNotification => {
  const existing = getStoredNotifications();
  const newItem: InAppNotification = {
    ...notification,
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    createdAt: Date.now(),
    read: false
  };
  const updated = [newItem, ...existing];
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('campusconnect:notifications_updated'));
  return newItem;
};

export const markNotificationsAsRead = () => {
  const existing = getStoredNotifications();
  const updated = existing.map((n) => ({ ...n, read: true }));
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('campusconnect:notifications_updated'));
};

export const clearAllNotifications = () => {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([]));
  window.dispatchEvent(new CustomEvent('campusconnect:notifications_updated'));
};

export const getStoredNotices = (): NoticeItem[] => {
  try {
    const raw = localStorage.getItem(NOTICES_KEY);
    // User explicitly requested: "and in the notice board remove the image that i sent u. and also remove all notice keep it white or blank .whenever faculty send any notice then it show in the notice boad."
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const publishNewNotice = (notice: Omit<NoticeItem, 'id' | 'publishedAt' | 'active'>): NoticeItem => {
  const existing = getStoredNotices();
  const newNotice: NoticeItem = {
    ...notice,
    id: `notice-${Date.now()}`,
    publishedAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
    active: true,
    cachedAt: Date.now()
  };
  const updated = [newNotice, ...existing];
  localStorage.setItem(NOTICES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('campusconnect:notices_updated'));

  // Also broadcast an in-app notification to the bell icon for all students
  saveNotification({
    type: 'notice',
    title: `Official Circular: ${notice.title}`,
    body: notice.body.slice(0, 120) + (notice.body.length > 120 ? '...' : ''),
    senderName: notice.publishedByName || 'Campus Authority',
    relatedDocumentId: newNotice.id
  });

  return newNotice;
};
