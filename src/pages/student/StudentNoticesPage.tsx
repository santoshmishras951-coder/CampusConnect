import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Tag, AlertCircle, WifiOff } from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { NoticeItem } from '../../types/index.ts';
import { getStoredNotices } from '../../utils/notificationService.ts';

export const StudentNoticesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [notices, setNotices] = useState<NoticeItem[]>(() => getStoredNotices());
  const [selectedTarget, setSelectedTarget] = useState<string>('all');

  useEffect(() => {
    const handleUpdate = () => {
      setNotices(getStoredNotices());
    };
    window.addEventListener('campusconnect:notices_updated', handleUpdate);
    return () => {
      window.removeEventListener('campusconnect:notices_updated', handleUpdate);
    };
  }, []);

  const filteredNotices = notices.filter((n) => {
    return selectedTarget === 'all' || n.targetType === selectedTarget;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.noticeBoardTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t.noticeBoardDesc}
          </p>
        </div>
        {/* Offline cache notice banner */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-xs font-medium self-start sm:self-auto">
          <WifiOff className="w-4 h-4 text-blue-600" />
          <span>Notices are cached locally for offline review</span>
        </div>
      </div>

      {/* Target Filter (No search field per user request) */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <span className="text-xs font-semibold text-slate-700">Filter Notices:</span>
        <select
          value={selectedTarget}
          onChange={(e) => setSelectedTarget(e.target.value)}
          className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Audiences</option>
          <option value="hostel">Hostel Specific</option>
          <option value="class">Class & Academic</option>
        </select>
      </div>

      {/* Notices List: White / Blank clean state if no notices */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="min-h-[360px] bg-white rounded-2xl border border-slate-200/80 p-12 flex flex-col items-center justify-center text-center shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mb-4 border border-slate-100">
              <Bell className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">{t.noNoticesBlank}</h3>
            <p className="text-xs text-slate-500 max-w-md mt-1 leading-relaxed">
              {t.facultyNoticeWaiting}
            </p>
          </div>
        ) : (
          filteredNotices.map((notice) => {
            let displayTitle = notice.title;
            let displayBody = notice.body;

            if (language === 'odia' && notice.titleOr) displayTitle = notice.titleOr;
            else if (language === 'hindi' && notice.titleHi) displayTitle = notice.titleHi;
            else if (language === 'telugu' && notice.titleTe) displayTitle = notice.titleTe;
            else if (language === 'chinese' && notice.titleZh) displayTitle = notice.titleZh;

            if (language === 'odia' && notice.bodyOr) displayBody = notice.bodyOr;
            else if (language === 'hindi' && notice.bodyHi) displayBody = notice.bodyHi;
            else if (language === 'telugu' && notice.bodyTe) displayBody = notice.bodyTe;
            else if (language === 'chinese' && notice.bodyZh) displayBody = notice.bodyZh;

            return (
              <Card key={notice.id} className="hover:border-slate-300 transition bg-white">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase tracking-wider text-[10px]">
                        {notice.targetType}
                      </span>
                      {notice.priority === 'urgent' && <Badge variant="urgent" label="Urgent Circular" />}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {String(notice.publishedAt)}
                      </span>
                      <span className="font-medium text-slate-700">By: {notice.publishedByName || notice.publishedBy}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{displayTitle}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {displayBody}
                    </p>
                  </div>

                  {notice.cachedAt && (
                    <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-50 flex items-center justify-between">
                      <span>Target: {notice.targetType === 'all' ? 'Entire University Campus' : 'Designated Cohort'}</span>
                      <span className="italic">Signed & Published</span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
