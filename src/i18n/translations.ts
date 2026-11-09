export interface Translations {
  appName: string;
  campusTagline: string;
  campusSubtitle: string;
  // Navigation
  dashboard: string;
  attendance: string;
  notices: string;
  requests: string;
  complaints: string;
  profile: string;
  users: string;
  classes: string;
  analytics: string;
  campusMap: string;
  intelligence: string;
  logout: string;
  login: string;
  // Actions
  applyLeave: string;
  requestGatePass: string;
  newGatePassOrLeave: string;
  submitComplaint: string;
  reportIssue: string;
  createNotice: string;
  publishNotice: string;
  markAttendance: string;
  approve: string;
  reject: string;
  assign: string;
  resolve: string;
  viewDetails: string;
  filter: string;
  save: string;
  cancel: string;
  refresh: string;
  delete: string;
  restore: string;
  showQrCode: string;
  hideQrCode: string;
  scanQrDetails: string;
  uploadPhoto: string;
  verifyAttendance: string;
  // Statuses
  pending: string;
  approved: string;
  rejected: string;
  assigned: string;
  inProgress: string;
  resolved: string;
  closed: string;
  expired: string;
  // Common labels
  collegeName: string;
  studentId: string;
  studentName: string;
  classAndSection: string;
  hostelRoom: string;
  category: string;
  location: string;
  priority: string;
  status: string;
  date: string;
  time: string;
  reason: string;
  actions: string;
  language: string;
  welcomeBack: string;
  quickActions: string;
  recentActivity: string;
  noData: string;
  dateOfBirth: string;
  registrationNumber: string;
  // Gate pass & Leave workflow
  activeRequests: string;
  historyAndArchive: string;
  wardenContact: string;
  wardenMobile: string;
  qrValidStayDays: string;
  validForStayDaysNote: string;
  timeRemaining: string;
  showSecurityQr: string;
  securityMustScanValidDays: string;
  passExpiredDaysNotice: string;
  rejectionReasonLabel: string;
  deletedByStudent: string;
  // Grievance / Issue Helpdesk
  grievanceRedressalTitle: string;
  grievanceRedressalDesc: string;
  writeAnyIssuePrompt: string;
  issueTitleLabel: string;
  issueDescLabel: string;
  // Notices
  noticeBoardTitle: string;
  noticeBoardDesc: string;
  noNoticesBlank: string;
  facultyNoticeWaiting: string;
  // Notifications
  notificationsTitle: string;
  markAllRead: string;
  clearAll: string;
  noNotifications: string;
}

export const defaultTranslations: Record<string, Translations> = {
  english: {
    appName: 'CampusConnect',
    campusTagline: 'Smart Campus Management Portal',
    campusSubtitle: 'Unified University Operations & Student Hub',
    dashboard: 'Dashboard',
    attendance: 'Attendance',
    notices: 'Notice Board',
    requests: 'Leave & Gate Pass',
    complaints: 'Grievances & Issues',
    profile: 'My Profile',
    users: 'User Management',
    classes: 'Class Rosters',
    analytics: 'Analytics & SLA',
    campusMap: 'Campus Digital Twin',
    intelligence: 'Predictive Intelligence',
    logout: 'Sign Out',
    login: 'Sign In',
    applyLeave: 'Apply Leave',
    requestGatePass: 'Request Gate Pass',
    newGatePassOrLeave: 'New Gate Pass / Leave',
    submitComplaint: 'Report an Issue / Helpdesk',
    reportIssue: 'Report Any Issue',
    createNotice: 'Publish Notice',
    publishNotice: 'Publish Official Notice',
    markAttendance: 'Mark Attendance',
    approve: 'Approve',
    reject: 'Reject',
    assign: 'Assign Staff',
    resolve: 'Mark Resolved',
    viewDetails: 'View Details',
    filter: 'Filter',
    save: 'Save Changes',
    cancel: 'Cancel',
    refresh: 'Refresh Data',
    delete: 'Delete',
    restore: 'Restore',
    showQrCode: 'Show Digital ID QR',
    hideQrCode: 'Hide QR Code',
    scanQrDetails: 'Scan & Verify Identity',
    uploadPhoto: 'Upload Profile Photo',
    verifyAttendance: 'Verify Attendance Access',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    assigned: 'Assigned',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
    expired: 'Expired',
    collegeName: 'College / Institute Name',
    studentId: 'Student Registration ID',
    studentName: 'Student Name',
    classAndSection: 'Class & Section',
    hostelRoom: 'Hostel / Room',
    category: 'Category',
    location: 'Location',
    priority: 'Priority',
    status: 'Status',
    date: 'Date',
    time: 'Time',
    reason: 'Reason',
    actions: 'Actions',
    language: 'Language',
    welcomeBack: 'WELCOME',
    quickActions: 'Quick Actions',
    recentActivity: 'Recent Activity',
    noData: 'No records found',
    dateOfBirth: 'Date of Birth (DOB)',
    registrationNumber: 'Registration Number',
    activeRequests: 'Active Gate Passes & Leaves',
    historyAndArchive: 'History & Archive',
    wardenContact: 'Hostel Warden Helpline',
    wardenMobile: 'Warden Mobile No',
    qrValidStayDays: 'QR Code Valid for Assigned Stay Duration',
    validForStayDaysNote: 'Must be scanned by Main Gate security within the assigned duration, otherwise student cannot exit or re-enter.',
    timeRemaining: 'Validity Remaining',
    showSecurityQr: 'Show Exit Gate QR',
    securityMustScanValidDays: 'Scan at Main Gate within assigned days',
    passExpiredDaysNotice: 'This gate pass has expired as the assigned stay duration has elapsed. Student cannot exit campus. Moved to History.',
    rejectionReasonLabel: 'Rejection Reason from Warden',
    deletedByStudent: 'Deleted by Student (Stored in History)',
    grievanceRedressalTitle: 'Student Grievances, Issues & Assistance',
    grievanceRedressalDesc: 'Share whatever issue you are facing on campus — from room repairs to academics, health or personal help.',
    writeAnyIssuePrompt: 'Whatever issue you face, write it here. Our faculty, warden, and administration will assist you.',
    issueTitleLabel: 'Issue Summary / Subject',
    issueDescLabel: 'Describe whatever issue you are facing in detail',
    noticeBoardTitle: 'Official Notice Board',
    noticeBoardDesc: 'Official announcements published by faculty and campus authorities.',
    noNoticesBlank: 'Notice Board is clear. No notices published yet.',
    facultyNoticeWaiting: 'Whenever faculty or authorities release a notice, it will appear here immediately.',
    notificationsTitle: 'Notifications & Authority Alerts',
    markAllRead: 'Mark all read',
    clearAll: 'Clear all',
    noNotifications: 'No new notifications'
  },
  odia: {
    appName: 'କ୍ୟାମ୍ପସ-କନେକ୍ଟ (CampusConnect)',
    campusTagline: 'ସ୍ମାର୍ଟ କ୍ୟାମ୍ପସ ପୋର୍ଟାଲ',
    campusSubtitle: 'ବିଶ୍ୱବିଦ୍ୟାଳୟ ପରିଚାଳନା ଓ ଛାତ୍ର ସେବା କେନ୍ଦ୍ର',
    dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
    attendance: 'ଉପସ୍ଥିତି (Attendance)',
    notices: 'ସୂଚନା ଫଳକ (Notice Board)',
    requests: 'ଛୁଟି ଏବଂ ଗେଟ୍ ପାସ୍ (Requests)',
    complaints: 'ଅଭିଯୋଗ ଓ ସହାୟତା (Issues)',
    profile: 'ମୋର ପ୍ରୋଫାଇଲ୍ (Profile)',
    users: 'ଉପଭୋକ୍ତା ପରିଚାଳନା',
    classes: 'ଶ୍ରେଣୀ ତାଲିକା (Classes)',
    analytics: 'ବିଶ୍ଳେଷଣ ଓ ସ୍ଥିତି (Analytics)',
    campusMap: 'କ୍ୟାମ୍ପସ ଡିଜିଟାଲ୍ ମାନଚିତ୍ର',
    intelligence: 'ପୂର୍ବାନୁମାନ ବୁଦ୍ଧିମତା (AI)',
    logout: 'ଲଗ୍ ଆଉଟ୍ (Sign Out)',
    login: 'ଲଗ୍ ଇନ୍ (Sign In)',
    applyLeave: 'ଛୁଟି ଆବେଦନ କରନ୍ତୁ',
    requestGatePass: 'ଗେଟ୍ ପାସ୍ ଅନୁରୋଧ',
    newGatePassOrLeave: 'ନୂଆ ଗେଟ୍ ପାସ୍ / ଛୁଟି',
    submitComplaint: 'ସମସ୍ୟା / ଅଭିଯୋଗ ଦାଖଲ କରନ୍ତୁ',
    reportIssue: 'ଯେକୌଣସି ସମସ୍ୟା ଜଣାନ୍ତୁ',
    createNotice: 'ସୂଚନା ପ୍ରକାଶ କରନ୍ତୁ',
    publishNotice: 'ସରକାରୀ ସୂଚନା ପ୍ରକାଶ କରନ୍ତୁ',
    markAttendance: 'ଉପସ୍ଥିତି ଦିଅନ୍ତୁ',
    approve: 'ଅନୁମୋଦନ କରନ୍ତୁ (Approve)',
    reject: 'ଖାରଜ କରନ୍ତୁ (Reject)',
    assign: 'କର୍ମଚାରୀଙ୍କୁ ନ୍ୟସ୍ତ କରନ୍ତୁ',
    resolve: 'ସମାଧାନ ହେଲା ଚିହ୍ନଟ କରନ୍ତୁ',
    viewDetails: 'ବିବରଣୀ ଦେଖନ୍ତୁ',
    filter: 'ଫିଲ୍ଟର୍',
    save: 'ସଂରକ୍ଷଣ କରନ୍ତୁ',
    cancel: 'ବାତିଲ କରନ୍ତୁ',
    refresh: 'ତାଜା କରନ୍ତୁ',
    delete: 'ହଟାନ୍ତୁ (Delete)',
    restore: 'ପୁନରୁଦ୍ଧାର କରନ୍ତୁ',
    showQrCode: 'ଡିଜିଟାଲ୍ ଆଇଡି QR ଦେଖନ୍ତୁ',
    hideQrCode: 'QR କୋଡ୍ ଲୁଚାନ୍ତୁ',
    scanQrDetails: 'ପରିଚୟ ଯାଞ୍ଚ କରନ୍ତୁ',
    uploadPhoto: 'ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ',
    verifyAttendance: 'ଉପସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ',
    pending: 'ବିଚାରାଧୀନ (Pending)',
    approved: 'ଅନୁମୋଦିତ (Approved)',
    rejected: 'ପ୍ରତ୍ୟାଖ୍ୟାତ (Rejected)',
    assigned: 'ନ୍ୟସ୍ତ (Assigned)',
    inProgress: 'ଚାଲୁ ରହିଛି (In Progress)',
    resolved: 'ସମାହିତ (Resolved)',
    closed: 'ବନ୍ଦ (Closed)',
    expired: 'ସମୟ ସମାପ୍ତ (Expired)',
    collegeName: 'କଲେଜ / ଶିକ୍ଷାନୁଷ୍ଠାନର ନାମ',
    studentId: 'ଛାତ୍ର ପଞ୍ଜୀକରଣ ସଂଖ୍ୟା (Reg No)',
    studentName: 'ଛାତ୍ରଙ୍କ ନାମ',
    classAndSection: 'ଶ୍ରେଣୀ ଓ ବିଭାଗ',
    hostelRoom: 'ଛାତ୍ରାବାସ / କୋଠରୀ',
    category: 'ବର୍ଗ (Category)',
    location: 'ସ୍ଥାନ (Location)',
    priority: 'ପ୍ରାଥମିକତା (Priority)',
    status: 'ସ୍ଥିତି (Status)',
    date: 'ତାରିଖ',
    time: 'ସମୟ',
    reason: 'କାରଣ',
    actions: 'କାର୍ଯ୍ୟାନୁଷ୍ଠାନ',
    language: 'ଭାଷା (Language)',
    welcomeBack: 'ସ୍ୱାଗତ',
    quickActions: 'ତ୍ୱରିତ କାର୍ଯ୍ୟ',
    recentActivity: 'ସାମ୍ପ୍ରତିକ କାର୍ଯ୍ୟକଳାପ',
    noData: 'କୌଣସି ତଥ୍ୟ ମିଳିଲା ନାହିଁ',
    dateOfBirth: 'ଜନ୍ମ ତାରିଖ (DOB)',
    registrationNumber: 'ପଞ୍ଜୀକରଣ ନମ୍ବର',
    activeRequests: 'ସକ୍ରିୟ ଗେଟ୍ ପାସ୍ ଓ ଛୁଟି',
    historyAndArchive: 'ପୂର୍ବ ଇତିହାସ (History & Archive)',
    wardenContact: 'ଛାତ୍ରାବାସ ୱାର୍ଡେନଙ୍କ ସହାୟତା',
    wardenMobile: 'ୱାର୍ଡେନ ମୋବାଇଲ ନମ୍ବର',
    qrValidStayDays: 'QR କୋଡ୍ ଆବଣ୍ଟିତ ଅବଧି ପାଇଁ ବୈଧ',
    validForStayDaysNote: 'ଆବଣ୍ଟିତ ଅବଧି ମଧ୍ୟରେ ମୁଖ୍ୟ ଫାଟକ ସୁରକ୍ଷା କର୍ମୀଙ୍କ ଦ୍ୱାରା ସ୍କାନ କରିବା ବାଧ୍ୟତାମୂଳକ, ନଚେତ୍ ଛାତ୍ର ବାହାରକୁ ଯାଇପାରିବେ ନାହିଁ।',
    timeRemaining: 'ବାକି ଥିବା ସମୟ',
    showSecurityQr: 'ଫାଟକ QR କୋଡ୍ ଦେଖନ୍ତୁ',
    securityMustScanValidDays: 'ଆବଣ୍ଟିତ ଦିନ ମଧ୍ୟରେ ମୁଖ୍ୟ ଫାଟକରେ ସ୍କାନ କରନ୍ତୁ',
    passExpiredDaysNotice: 'ଆବଣ୍ଟିତ ଅବଧି ବିତିଯାଇଥିବାରୁ ଏହି ଗେଟ୍ ପାସ୍ ଅବୈଧ ହୋଇଛି। ଛାତ୍ର ବାହାରକୁ ଯାଇପାରିବେ ନାହିଁ।',
    rejectionReasonLabel: 'ୱାର୍ଡେନଙ୍କ ପ୍ରତ୍ୟାଖ୍ୟାନ କାରଣ',
    deletedByStudent: 'ଛାତ୍ରଙ୍କ ଦ୍ୱାରା ବିଲୋପିତ (ଇତିହାସରେ ସୁରକ୍ଷିତ)',
    grievanceRedressalTitle: 'ଛାତ୍ର ସମସ୍ୟା ଓ ଅଭିଯୋଗ ନିବାରଣ',
    grievanceRedressalDesc: 'ଆପଣ ଯେକୌଣସି ସମସ୍ୟା ସମ୍ମୁଖୀନ ହେଉଛନ୍ତି, ଏଠାରେ ବିସ୍ତୃତ ଭାବେ ଲେଖନ୍ତୁ - କର୍ତ୍ତୃପକ୍ଷ ତୁରନ୍ତ ସହାୟତା କରିବେ।',
    writeAnyIssuePrompt: 'ଆପଣ ଯେକୌଣସି ଅସୁବିଧା ଭୋଗୁଛନ୍ତି ଲେଖନ୍ତୁ, କେବଳ ଅଭିଯୋଗ ନୁହେଁ।',
    issueTitleLabel: 'ସମସ୍ୟାର ସଂକ୍ଷିପ୍ତ ଶିରୋନାମା',
    issueDescLabel: 'ସମସ୍ୟା ବିଷୟରେ ବିସ୍ତୃତ ଭାବେ ଲେଖନ୍ତୁ',
    noticeBoardTitle: 'ଅଫିସିଆଲ୍ ନୋଟିସ୍ ବୋର୍ଡ',
    noticeBoardDesc: 'ଅଧ୍ୟାପକ ଏବଂ କ୍ୟାମ୍ପସ ପ୍ରଶାସନ ଦ୍ୱାରା ପ୍ରକାଶିତ ସୂଚନା।',
    noNoticesBlank: 'ନୋଟିସ୍ ବୋର୍ଡ ଖାଲି ଅଛି। ବର୍ତ୍ତମାନ କୌଣସି ନୋଟିସ୍ ନାହିଁ।',
    facultyNoticeWaiting: 'ଶିକ୍ଷକ ବା କର୍ତ୍ତୃପକ୍ଷ କୌଣସି ନୂଆ ସୂଚନା ଜାରି କଲେ ତାହା ଏଠାରେ ଦେଖାଯିବ।',
    notificationsTitle: 'ବିଜ୍ଞପ୍ତି ଏବଂ ସତର୍କତା',
    markAllRead: 'ସବୁ ପଢ଼ାଗଲା ଚିହ୍ନଟ କରନ୍ତୁ',
    clearAll: 'ସଫା କରନ୍ତୁ',
    noNotifications: 'କୌଣସି ନୂଆ ବିଜ୍ଞପ୍ତି ନାହିଁ'
  },
  hindi: {
    appName: 'कैंपसकनेक्ट (CampusConnect)',
    campusTagline: 'स्मार्ट कैंपस प्रबंधन पोर्टल',
    campusSubtitle: 'एकीकृत विश्वविद्यालय संचालन एवं छात्र केंद्र',
    dashboard: 'डैशबोर्ड',
    attendance: 'उपस्थिति (Attendance)',
    notices: 'सूचना पट्ट (Notice Board)',
    requests: 'अवकाश एवं गेट पास',
    complaints: 'शिकायत व समस्या समाधान',
    profile: 'मेरी प्रोफ़ाइल',
    users: 'उपयोगकर्ता प्रबंधन',
    classes: 'कक्षा सूची (Classes)',
    analytics: 'विश्लेषण एवं एसएलए',
    campusMap: 'कैंपस डिजिटल ट्विन',
    intelligence: 'पूर्वानुमान बुद्धिमत्ता',
    logout: 'साइन आउट',
    login: 'साइन इन',
    applyLeave: 'अवकाश आवेदन करें',
    requestGatePass: 'गेट पास का अनुरोध करें',
    newGatePassOrLeave: 'नया गेट पास / अवकाश आवेदन',
    submitComplaint: 'समस्या या शिकायत दर्ज करें',
    reportIssue: 'अपनी कोई भी समस्या लिखें',
    createNotice: 'सूचना प्रकाशित करें',
    publishNotice: 'आधिकारिक सूचना प्रकाशित करें',
    markAttendance: 'उपस्थिति दर्ज करें',
    approve: 'स्वीकृत करें',
    reject: 'अस्वीकृत करें',
    assign: 'कर्मचारी नियुक्त करें',
    resolve: 'समाधान चिह्नित करें',
    viewDetails: 'विवरण देखें',
    filter: 'फ़िल्टर',
    save: 'परिवर्तन सहेजें',
    cancel: 'रद्द करें',
    refresh: 'रिफ्रेश करें',
    delete: 'हटाएं (Delete)',
    restore: 'पुनर्स्थापित करें',
    showQrCode: 'डिजिटल आईडी क्यूआर कोड देखें',
    hideQrCode: 'क्यूआर कोड छुपाएं',
    scanQrDetails: 'पहचान सत्यापित करें',
    uploadPhoto: 'फ़ोटो अपलोड करें',
    verifyAttendance: 'उपस्थिति पहुंच सत्यापित करें',
    pending: 'लंबित (Pending)',
    approved: 'स्वीकृत (Approved)',
    rejected: 'अस्वीकृत (Rejected)',
    assigned: 'नियुक्त (Assigned)',
    inProgress: 'प्रगति पर (In Progress)',
    resolved: 'समाधानित (Resolved)',
    closed: 'बंद (Closed)',
    expired: 'समाप्त (Expired)',
    collegeName: 'कॉलेज / संस्थान का नाम',
    studentId: 'छात्र पंजीकरण संख्या (ID)',
    studentName: 'छात्र का नाम',
    classAndSection: 'कक्षा एवं अनुभाग',
    hostelRoom: 'छात्रावास / कमरा',
    category: 'श्रेणी (Category)',
    location: 'स्थान (Location)',
    priority: 'प्राथमिकता (Priority)',
    status: 'स्थिति (Status)',
    date: 'तारीख',
    time: 'समय',
    reason: 'कारण',
    actions: 'कार्रवाई',
    language: 'भाषा (Language)',
    welcomeBack: 'स्वागत है',
    quickActions: 'त्वरित कार्रवाई',
    recentActivity: 'हाल की गतिविधि',
    noData: 'कोई रिकॉर्ड नहीं मिला',
    dateOfBirth: 'जन्म तिथि (DOB)',
    registrationNumber: 'पंजीकरण संख्या',
    activeRequests: 'सक्रिय गेट पास और अवकाश',
    historyAndArchive: 'इतिहास और संग्रह (History)',
    wardenContact: 'हॉस्टल वार्डन हेल्पलाइन',
    wardenMobile: 'वार्डन मोबाइल नंबर',
    qrValidStayDays: 'क्यूआर कोड आवंटित अवधि के लिए मान्य है',
    validForStayDaysNote: 'छात्र को आवंटित अवधि के भीतर मुख्य द्वार सुरक्षा पर यह क्यूआर स्कैन कराना अनिवार्य है, अन्यथा बाहर जाने की अनुमति नहीं होगी।',
    timeRemaining: 'शेष वैधता',
    showSecurityQr: 'गेट सुरक्षा क्यूआर देखें',
    securityMustScanValidDays: 'आवंटित दिनों में मुख्य द्वार पर स्कैन कराएं',
    passExpiredDaysNotice: 'आवंटित अवधि बीत जाने के कारण गेट पास समाप्त हो चुका है। छात्र बाहर नहीं जा सकते। इतिहास में सहेजा गया।',
    rejectionReasonLabel: 'वार्डन द्वारा अस्वीकृति का कारण',
    deletedByStudent: 'छात्र द्वारा हटाया गया (इतिहास में सुरक्षित)',
    grievanceRedressalTitle: 'छात्र समस्या, शिकायत एवं सहायता मंच',
    grievanceRedressalDesc: 'कैंपस में आपको जो भी समस्या आ रही हो, यहां निसंकोच लिखें — प्रशासन आपकी सहायता करेगा।',
    writeAnyIssuePrompt: 'केवल शिकायत ही नहीं, जो भी समस्या या सहायता चाहिए, यहां लिखें।',
    issueTitleLabel: 'समस्या का शीर्षक',
    issueDescLabel: 'समस्या का विस्तृत विवरण लिखें',
    noticeBoardTitle: 'आधिकारिक सूचना पट्ट (Notice Board)',
    noticeBoardDesc: 'शिक्षकों और अधिकारियों द्वारा जारी आधिकारिक परिपत्र।',
    noNoticesBlank: 'सूचना पट्ट खाली है। अभी कोई सूचना प्रकाशित नहीं है।',
    facultyNoticeWaiting: 'जैसे ही शिक्षक या प्रशासन कोई सूचना जारी करेंगे, वह यहां तुरंत प्रदर्शित होगी।',
    notificationsTitle: 'सूचनाएं एवं अलर्ट',
    markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
    clearAll: 'साफ़ करें',
    noNotifications: 'कोई नई सूचना नहीं है'
  },
  telugu: {
    appName: 'క్యాంపస్‌కనెక్ట్ (CampusConnect)',
    campusTagline: 'స్మార్ట్ క్యాంపస్ నిర్వహణ పోర్టల్',
    campusSubtitle: 'విశ్వవిద్యాలయ పరిపాలన మరియు విద్యార్థుల సేవా కేంద్రం',
    dashboard: 'డాష్‌బోర్డ్',
    attendance: 'హాజరు (Attendance)',
    notices: 'నోటీసు బోర్డు (Notice Board)',
    requests: 'సెలవు & గేట్ పాస్',
    complaints: 'సమస్యలు & పరిష్కారాలు',
    profile: 'నా ప్రొఫైల్',
    users: 'వినియోగదారుల నిర్వహణ',
    classes: 'తరగతి జాబితాలు',
    analytics: 'విశ్లేషణలు & SLA',
    campusMap: 'క్యాంపస్ డిజిటల్ ట్విన్',
    intelligence: 'ప్రిడిక్టివ్ ఇంటెలిజెన్స్',
    logout: 'లాగ్ అవుట్',
    login: 'సైన్ ఇన్',
    applyLeave: 'సెలవు దరఖాస్తు',
    requestGatePass: 'గేట్ పాస్ అభ్యర్థన',
    newGatePassOrLeave: 'కొత్త గేట్ పాస్ / సెలవు',
    submitComplaint: 'సమస్యను నమోదు చేయండి',
    reportIssue: 'మీ సమస్యను రాయండి',
    createNotice: 'నోటీసు ప్రచురించండి',
    publishNotice: 'అధికారిక నోటీసు ప్రచురించండి',
    markAttendance: 'హాజరు నమోదు చేయండి',
    approve: 'ఆమోదించండి',
    reject: 'తిరస్కరించండి',
    assign: 'సిబ్బందిని కేటాయించండి',
    resolve: 'పరిష్కరించబడిందిగా గుర్తించండి',
    viewDetails: 'వివరాలు చూడండి',
    filter: 'ఫిల్టర్',
    save: 'మార్పులను భద్రపరచండి',
    cancel: 'రద్దు చేయండి',
    refresh: 'తాజాకరించండి',
    delete: 'తొలగించు (Delete)',
    restore: 'పునరుద్ధరించు',
    showQrCode: 'డిజిటల్ ఐడి క్యూఆర్ కోడ్ చూపించు',
    hideQrCode: 'క్యూఆర్ కోడ్ దాచు',
    scanQrDetails: 'గుర్తింపును ధృవీకరించండి',
    uploadPhoto: 'ఫోటోను అప్‌లోడ్ చేయండి',
    verifyAttendance: 'హాజరు యాక్సెస్‌ను ధృవీకరించండి',
    pending: 'పెండింగ్‌లో ఉంది',
    approved: 'ఆమోదించబడింది',
    rejected: 'తిరస్కరించబడింది',
    assigned: 'కేటాయించబడింది',
    inProgress: 'పురోగతిలో ఉంది',
    resolved: 'పరిష్కరించబడింది',
    closed: 'ముగిసింది',
    expired: 'గడువు ముగిసింది',
    collegeName: 'కళాశాల / సంస్థ పేరు',
    studentId: 'విద్యార్థి రిజిస్ట్రేషన్ ఐడి',
    studentName: 'విద్యార్థి పేరు',
    classAndSection: 'తరగతి & విభాగం',
    hostelRoom: 'హాస్టల్ / గది',
    category: 'వర్గం',
    location: 'ప్రాంతం',
    priority: 'ప్రాధాన్యత',
    status: 'స్థితి',
    date: 'తేదీ',
    time: 'సమయం',
    reason: 'కారణం',
    actions: 'చర్యలు',
    language: 'భాష (Language)',
    welcomeBack: 'స్వాగతం',
    quickActions: 'త్వరిత చర్యలు',
    recentActivity: 'ఇటీవలి కార్యాచరణ',
    noData: 'ఎలాంటి రికార్డులు కనుగొనబడలేదు',
    dateOfBirth: 'పుట్టిన తేదీ (DOB)',
    registrationNumber: 'రిజిస్ట్రేషన్ నంబర్',
    activeRequests: 'యాక్టివ్ గేట్ పాస్‌లు & సెలవులు',
    historyAndArchive: 'చరిత్ర & ఆర్కైవ్ (History)',
    wardenContact: 'హాస్టల్ వార్డెన్ హెల్ప్‌లైన్',
    wardenMobile: 'వార్డెన్ మొబైల్ నంబర్',
    qrValidStayDays: 'QR కోడ్ కేటాయించిన కాలానికి మాత్రమే చెల్లుబాటు అవుతుంది',
    validForStayDaysNote: 'విద్యార్థి కేటాయించిన కాలంలో మెయిన్ గేట్ భద్రత వద్ద QR స్కాన్ చేయించుకోవాలి, లేకుంటే బయటకు వెళ్లడం సాధ్యం కాదు.',
    timeRemaining: 'మిగిలిన సమయం',
    showSecurityQr: 'గేట్ QR కోడ్ చూపించు',
    securityMustScanValidDays: 'కేటాయించిన రోజుల్లో మెయిన్ గేట్ వద్ద స్కాన్ చేయాలి',
    passExpiredDaysNotice: 'కేటాయించిన కాలం పూర్తయినందున ఈ గేట్ పాస్ రద్దయింది. విద్యార్థి బయటకు వెళ్లలేరు. చరిత్రకు తరలించబడింది.',
    rejectionReasonLabel: 'వార్డెన్ తిరస్కరణ కారణం',
    deletedByStudent: 'విద్యార్థి తొలగించారు (చరిత్రలో భద్రంగా ఉంది)',
    grievanceRedressalTitle: 'విద్యార్థుల సమస్యలు మరియు ఫిర్యాదుల సహాయ కేంద్రం',
    grievanceRedressalDesc: 'క్యాంపస్‌లో మీరు ఎదుర్కొంటున్న ఏదైనా సమస్యను ఇక్కడ రాయండి — సహాయం అందించబడుతుంది.',
    writeAnyIssuePrompt: 'ఫిర్యాదు మాత్రమే కాదు, మీరు ఎదుర్కొనే ఏ సమస్యనైనా రాయండి.',
    issueTitleLabel: 'సమస్య శీర్షిక',
    issueDescLabel: 'మీ సమస్యను వివరంగా వివరించండి',
    noticeBoardTitle: 'అధికారిక నోటీసు బోర్డు',
    noticeBoardDesc: 'అధ్యాపకులు మరియు పరిపాలన విభాగం ప్రచురించిన నోటీసులు.',
    noNoticesBlank: 'నోటీసు బోర్డు ఖాళీగా ఉంది. ఇంకా నోటీసులు ఏవీ లేవు.',
    facultyNoticeWaiting: 'అధ్యాపకులు లేదా అధికారులు ఏదైనా నోటీసు విడుదల చేస్తే, అది ఇక్కడ కనిపిస్తుంది.',
    notificationsTitle: 'నోటిఫికేషన్‌లు & హెచ్చరికలు',
    markAllRead: 'అన్నీ చదివినట్లు గుర్తించు',
    clearAll: 'అన్నీ తొలగించు',
    noNotifications: 'కొత్త నోటిఫికేషన్‌లు లేవు'
  },
  chinese: {
    appName: '校园通 (CampusConnect)',
    campusTagline: '智能校园综合管理平台',
    campusSubtitle: '统一大学运营与学生数字中心',
    dashboard: '仪表板 (Dashboard)',
    attendance: '学生考勤 (Attendance)',
    notices: '校园公告栏 (Notice Board)',
    requests: '请假与校门通行证',
    complaints: '校园事务与诉求中心',
    profile: '学生完整档案 (Profile)',
    users: '系统人员权限管理',
    classes: '班级花名册',
    analytics: '运行分析与SLA指标',
    campusMap: '校园数字孪生',
    intelligence: '预测性智能运营',
    logout: '安全退出',
    login: '系统登录',
    applyLeave: '提交请假申请',
    requestGatePass: '申请校门通行证',
    newGatePassOrLeave: '新建出入证 / 请假申请',
    submitComplaint: '提交困难求助 / 报修',
    reportIssue: '反馈遇到的任何问题',
    createNotice: '发布官方通知',
    publishNotice: '发布院系官方通告',
    markAttendance: '点名登记出勤',
    approve: '审批通过 (Approve)',
    reject: '驳回申请 (Reject)',
    assign: '派工给维修人员',
    resolve: '确认已解决',
    viewDetails: '查看详情',
    filter: '条件筛选',
    save: '保存所有修改',
    cancel: '取消',
    refresh: '刷新数据',
    delete: '删除 (Delete)',
    restore: '恢复记录',
    showQrCode: '显示数字身份二维码',
    hideQrCode: '隐藏二维码',
    scanQrDetails: '扫码核验学生身份',
    uploadPhoto: '上传免冠登记照片',
    verifyAttendance: '安全验证考勤权限',
    pending: '待处理 (Pending)',
    approved: '已批准 (Approved)',
    rejected: '已驳回 (Rejected)',
    assigned: '已派工 (Assigned)',
    inProgress: '处理中 (In Progress)',
    resolved: '已解决 (Resolved)',
    closed: '已归档 (Closed)',
    expired: '已过期 (Expired)',
    collegeName: '所属学院 / 大学名称',
    studentId: '学生学籍注册号 (Student ID)',
    studentName: '学生姓名',
    classAndSection: '班级与专业',
    hostelRoom: '学生宿舍与房间号',
    category: '事务类别',
    location: '具体地点',
    priority: '紧急程度',
    status: '当前状态',
    date: '日期',
    time: '时间',
    reason: '事由',
    actions: '操作',
    language: '系统语言 (Language)',
    welcomeBack: '欢迎回来',
    quickActions: '快捷通道',
    recentActivity: '近期动态',
    noData: '暂无相关记录',
    dateOfBirth: '出生日期 (DOB)',
    registrationNumber: '学籍注册号',
    activeRequests: '进行中的出入证与请假',
    historyAndArchive: '历史记录与归档 (History)',
    wardenContact: '宿舍舍监服务热线',
    wardenMobile: '舍监手机联系方式',
    qrValidStayDays: '通行二维码在分配的停留时间内有效',
    validForStayDaysNote: '获得审批后须在分配的停留时间内由学校正门安保扫码核验放行，超时将无法外出。',
    timeRemaining: '有效倒计时',
    showSecurityQr: '出示正门通行二维码',
    securityMustScanValidDays: '在分配的天数内前往校门扫码核验',
    passExpiredDaysNotice: '审批已超过分配的停留时间，通行证自动失效，学生无法出校。已自动移入历史记录。',
    rejectionReasonLabel: '舍监驳回理由说明',
    deletedByStudent: '学生主动删除 (已保存在历史归档中)',
    grievanceRedressalTitle: '学生诉求、困难求助与维权服务中心',
    grievanceRedressalDesc: '无论是宿舍报修、课业困难、身体健康还是生活困扰，均可在此处写下，学校各部门将全力协助。',
    writeAnyIssuePrompt: '在此如实写下您遇到的任何问题或困难，不仅仅是报修，任何事均可提出。',
    issueTitleLabel: '问题概要 / 主题',
    issueDescLabel: '请详细描述您遇到的问题或所需协助',
    noticeBoardTitle: '官方通知与公告栏',
    noticeBoardDesc: '由各院系教师及学校管理部门发布的官方通告。',
    noNoticesBlank: '公告栏目前暂无新通知。',
    facultyNoticeWaiting: '当教师或校方管理部门发布任何通知时，将立即在此完整呈现。',
    notificationsTitle: '官方通告与提醒中心',
    markAllRead: '全部标记为已读',
    clearAll: '清空列表',
    noNotifications: '暂无新提醒'
  }
};

// Aliases helper (e.g. 'telgu' -> 'telugu', 'hindhi' -> 'hindi', 'chainess'/'chinese' -> 'chinese')
export const normalizeLanguageKey = (lang: string): string => {
  const clean = lang.trim().toLowerCase();
  if (clean === 'en' || clean === 'english') return 'english';
  if (clean === 'or' || clean === 'odia' || clean === 'oriya') return 'odia';
  if (clean === 'hi' || clean === 'hindi' || clean === 'hindhi') return 'hindi';
  if (clean === 'te' || clean === 'telugu' || clean === 'telgu') return 'telugu';
  if (clean === 'zh' || clean === 'chinese' || clean === 'chainess' || clean === 'chineese') return 'chinese';
  return clean;
};
