export interface FacilitySpace {
  id: string;
  name: string;
  type: 'classroom' | 'lab' | 'auditorium' | 'conference' | 'study_pod' | 'clinic_bed' | 'dining_hall';
  capacity: number;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  floor: string;
  equipment: string[];
}

export interface BuildingNotice {
  id: string;
  title: string;
  date: string;
  priority: 'normal' | 'urgent';
}

export interface MaintenanceRecord {
  id: string;
  category: 'Plumbing' | 'Electrical' | 'HVAC' | 'Network' | 'Carpentry' | 'Civil';
  description: string;
  date: string;
  status: 'resolved' | 'in_progress' | 'scheduled';
  technician: string;
}

export interface CampusBuilding {
  id: string;
  name: string;
  code: string;
  category: 'academic' | 'hostel' | 'library' | 'lab' | 'admin' | 'cafeteria' | 'healthcare';
  description: string;
  floors: number;
  totalArea: string;
  status: 'operational' | 'maintenance_alert' | 'high_occupancy';
  telemetryType: 'live_iot' | 'staff_verified' | 'simulated';
  openIssuesCount: number;
  accessibility: {
    wheelchairRamp: boolean;
    elevators: boolean;
    brailleSignage: boolean;
    accessibleRestrooms: boolean;
    tactilePaving: boolean;
  };
  coordinates: { x: number; y: number }; // Percentage on SVG campus schematic (0-100)
  dimensions: { width: number; height: number };
  facilities: FacilitySpace[];
  openComplaints: {
    id: string;
    title: string;
    category: string;
    severity: 'low' | 'medium' | 'high';
    reportedAt: string;
  }[];
  maintenanceHistory: MaintenanceRecord[];
  notices: BuildingNotice[];
}

export const INITIAL_CAMPUS_BUILDINGS: CampusBuilding[] = [
  {
    id: 'b-aryabhata',
    name: 'Aryabhata Academic Block',
    code: 'AB-01',
    category: 'academic',
    description: 'Main academic hub housing Computer Science, IT, and Electronics lecture theatres.',
    floors: 5,
    totalArea: '48,000 sq ft',
    status: 'operational',
    telemetryType: 'live_iot',
    openIssuesCount: 1,
    accessibility: {
      wheelchairRamp: true,
      elevators: true,
      brailleSignage: true,
      accessibleRestrooms: true,
      tactilePaving: true,
    },
    coordinates: { x: 22, y: 35 },
    dimensions: { width: 18, height: 16 },
    facilities: [
      { id: 'lh-101', name: 'Smart Lecture Theatre 101', type: 'classroom', capacity: 120, status: 'occupied', floor: '1st Floor', equipment: ['4K Projector', 'Acoustic Mic Pods', 'Dual Whiteboards'] },
      { id: 'lh-204', name: 'Lecture Hall 204 (CSE-3A)', type: 'classroom', capacity: 75, status: 'available', floor: '2nd Floor', equipment: ['Smart Interactive Display', 'Lecture Capture Camera'] },
      { id: 'seminar-hall', name: 'Dr. Vikram Sarabhai Seminar Hall', type: 'auditorium', capacity: 250, status: 'reserved', floor: 'Ground Floor', equipment: ['Stage Audio Rig', 'Simultaneous Streamer'] }
    ],
    openComplaints: [
      { id: 'cc-cmp-301', title: 'AC Temperature Sensor Failure in LH-101', category: 'HVAC', severity: 'medium', reportedAt: 'Today, 08:30 AM' }
    ],
    maintenanceHistory: [
      { id: 'm-101', category: 'Electrical', description: 'Replaced LED luminaire array in 2nd floor corridor', date: 'Oct 12, 2026', status: 'resolved', technician: 'Bikash Jena' },
      { id: 'm-102', category: 'Network', description: 'Upgraded access point PoE switch in Server Rack 2', date: 'Oct 08, 2026', status: 'resolved', technician: 'Priya Panda' }
    ],
    notices: [
      { id: 'n-ab1', title: 'Lecture Hall 204 sanitized and reserved for CSE Mid-Sem exams', date: 'Oct 14, 2026', priority: 'normal' }
    ]
  },
  {
    id: 'b-kalam-lab',
    name: 'Kalam Advanced Computing & Robotics Hub',
    code: 'KH-02',
    category: 'lab',
    description: 'Cutting-edge AI research clusters, robotics fabrication lab, and NVIDIA GPU clusters.',
    floors: 3,
    totalArea: '26,500 sq ft',
    status: 'operational',
    telemetryType: 'live_iot',
    openIssuesCount: 0,
    accessibility: {
      wheelchairRamp: true,
      elevators: true,
      brailleSignage: true,
      accessibleRestrooms: true,
      tactilePaving: false,
    },
    coordinates: { x: 44, y: 22 },
    dimensions: { width: 16, height: 14 },
    facilities: [
      { id: 'lab-ai', name: 'Generative AI & Computer Vision Lab', type: 'lab', capacity: 45, status: 'occupied', floor: '2nd Floor', equipment: ['8x NVIDIA H100 Cluster', 'Workstations', 'High-speed Fiber'] },
      { id: 'lab-robotics', name: 'Autonomous Robotics & Mechatronics Bay', type: 'lab', capacity: 30, status: 'available', floor: '1st Floor', equipment: ['3D Printers', 'Oscilloscopes', 'CNC Mill'] }
    ],
    openComplaints: [],
    maintenanceHistory: [
      { id: 'm-201', category: 'HVAC', description: 'Precision server room chiller maintenance cycle complete', date: 'Oct 11, 2026', status: 'resolved', technician: 'R. K. Verma' }
    ],
    notices: [
      { id: 'n-kh1', title: 'Late-night GPU lab access enabled for final-year project teams', date: 'Oct 13, 2026', priority: 'normal' }
    ]
  },
  {
    id: 'b-library',
    name: 'Central Digital Library & Research Center',
    code: 'LIB-01',
    category: 'library',
    description: '3-floor digital depository with silent reading zones, multimedia rooms, and 24x7 study bays.',
    floors: 3,
    totalArea: '34,000 sq ft',
    status: 'maintenance_alert',
    telemetryType: 'live_iot',
    openIssuesCount: 1,
    accessibility: {
      wheelchairRamp: true,
      elevators: true,
      brailleSignage: true,
      accessibleRestrooms: true,
      tactilePaving: true,
    },
    coordinates: { x: 44, y: 44 },
    dimensions: { width: 17, height: 16 },
    facilities: [
      { id: 'lib-silent', name: 'Ground Floor Silent Reading Room', type: 'study_pod', capacity: 160, status: 'occupied', floor: 'Ground Floor', equipment: ['Ergonomic Desks', 'Individual Charging Plugs'] },
      { id: 'lib-pod-3', name: 'Collaborative Group Study Pod B', type: 'study_pod', capacity: 8, status: 'available', floor: '2nd Floor', equipment: ['Smart Whiteboard', 'Cast Display'] },
      { id: 'lib-media', name: 'Digital Archives & E-Journal Terminal', type: 'lab', capacity: 50, status: 'occupied', floor: '1st Floor', equipment: ['IEEE Xplore Terminals', 'Scanners'] }
    ],
    openComplaints: [
      { id: 'cc-cmp-1042', title: 'Wi-Fi AP Packet Drops on 2nd Floor Study Pods', category: 'Network', severity: 'medium', reportedAt: 'Yesterday, 04:15 PM' }
    ],
    maintenanceHistory: [
      { id: 'm-301', category: 'Electrical', description: 'Emergency UPS battery bank load test passed', date: 'Oct 05, 2026', status: 'resolved', technician: 'Bikash Jena' }
    ],
    notices: [
      { id: 'n-lib1', title: 'Library hours extended to 01:00 AM for semester exam preparations', date: 'Oct 10, 2026', priority: 'urgent' }
    ]
  },
  {
    id: 'b-mahanadi-hostel',
    name: 'Mahanadi Hall of Residence (Boys)',
    code: 'HR-01',
    category: 'hostel',
    description: 'Residential facility housing 240 engineering undergraduates across Blocks A & B.',
    floors: 4,
    totalArea: '52,000 sq ft',
    status: 'maintenance_alert',
    telemetryType: 'staff_verified',
    openIssuesCount: 2,
    accessibility: {
      wheelchairRamp: true,
      elevators: false,
      brailleSignage: false,
      accessibleRestrooms: true,
      tactilePaving: false,
    },
    coordinates: { x: 70, y: 20 },
    dimensions: { width: 22, height: 20 },
    facilities: [
      { id: 'hostel-common', name: 'Student Recreation & TV Lounge', type: 'auditorium', capacity: 80, status: 'available', floor: 'Ground Floor', equipment: ['Table Tennis', 'TV Screen'] },
      { id: 'hostel-study', name: 'Hostel Night Reading Room', type: 'study_pod', capacity: 40, status: 'occupied', floor: '1st Floor', equipment: ['High Speed Wi-Fi', 'Study Desks'] },
      { id: 'hostel-mess', name: 'Mahanadi Dining Hall', type: 'dining_hall', capacity: 200, status: 'available', floor: 'Ground Floor', equipment: ['Steam Bain-marie', 'UV Water Purifiers'] }
    ],
    openComplaints: [
      { id: 'cc-cmp-911', title: 'Water Pressure Drop in 3rd Floor Washrooms (Block B)', category: 'Plumbing', severity: 'high', reportedAt: 'Today, 06:45 AM' },
      { id: 'cc-cmp-914', title: 'Corridor Light Flicker near Room 304', category: 'Electrical', severity: 'low', reportedAt: 'Yesterday, 09:15 PM' }
    ],
    maintenanceHistory: [
      { id: 'm-401', category: 'Plumbing', description: 'Replaced main booster pump impeller on roof storage', date: 'Oct 09, 2026', status: 'resolved', technician: 'R. K. Verma' },
      { id: 'm-402', category: 'Network', description: 'Outdoor fiber patch splice repair between Admin and Hostel', date: 'Oct 02, 2026', status: 'resolved', technician: 'Priya Panda' }
    ],
    notices: [
      { id: 'n-mhn1', title: 'Biometric gate entry strictly enforced at 09:30 PM curfew', date: 'Oct 14, 2026', priority: 'urgent' }
    ]
  },
  {
    id: 'b-brahmaputra-hostel',
    name: 'Brahmaputra Hall of Residence (Girls)',
    code: 'HR-02',
    category: 'hostel',
    description: 'Modern residential hostel for 220 female students with biometric security turnstiles.',
    floors: 4,
    totalArea: '49,000 sq ft',
    status: 'operational',
    telemetryType: 'staff_verified',
    openIssuesCount: 0,
    accessibility: {
      wheelchairRamp: true,
      elevators: true,
      brailleSignage: true,
      accessibleRestrooms: true,
      tactilePaving: true,
    },
    coordinates: { x: 70, y: 55 },
    dimensions: { width: 22, height: 18 },
    facilities: [
      { id: 'bp-gym', name: 'Fitness & Aerobics Center', type: 'study_pod', capacity: 30, status: 'available', floor: 'Ground Floor', equipment: ['Cardio Rig', 'Yoga Mats'] },
      { id: 'bp-mess', name: 'Brahmaputra Dining Hall', type: 'dining_hall', capacity: 180, status: 'occupied', floor: 'Ground Floor', equipment: ['Commercial Kitchen', 'Purified Dispensers'] }
    ],
    openComplaints: [],
    maintenanceHistory: [
      { id: 'm-501', category: 'Civil', description: 'Solar rooftop water heater descaling complete', date: 'Oct 06, 2026', status: 'resolved', technician: 'Dilip Pradhan' }
    ],
    notices: [
      { id: 'n-bp1', title: 'New badminton court lighting active until 08:30 PM', date: 'Oct 11, 2026', priority: 'normal' }
    ]
  },
  {
    id: 'b-admin',
    name: 'Administrative Secretariat & Vice-Chancellor Complex',
    code: 'ADM-01',
    category: 'admin',
    description: 'University executive suites, Academic Affairs, Examination Branch, and Registrar Office.',
    floors: 4,
    totalArea: '38,000 sq ft',
    status: 'operational',
    telemetryType: 'live_iot',
    openIssuesCount: 0,
    accessibility: {
      wheelchairRamp: true,
      elevators: true,
      brailleSignage: true,
      accessibleRestrooms: true,
      tactilePaving: true,
    },
    coordinates: { x: 18, y: 65 },
    dimensions: { width: 20, height: 18 },
    facilities: [
      { id: 'adm-board', name: 'Senate Syndicate Boardroom', type: 'conference', capacity: 40, status: 'available', floor: '3rd Floor', equipment: ['Video Conferencing Bar', 'Encrypted Telephony'] },
      { id: 'adm-exam', name: 'Confidential Examination Center', type: 'conference', capacity: 30, status: 'reserved', floor: '2nd Floor', equipment: ['Biometric Vault', 'High-capacity Scanner'] },
      { id: 'adm-helpdesk', name: 'One-Stop Student Affairs Secretariat', type: 'conference', capacity: 60, status: 'available', floor: 'Ground Floor', equipment: ['Token Management System', 'Verification Desks'] }
    ],
    openComplaints: [],
    maintenanceHistory: [
      { id: 'm-601', category: 'HVAC', description: 'Central VRV condenser service complete', date: 'Oct 01, 2026', status: 'resolved', technician: 'R. K. Verma' }
    ],
    notices: [
      { id: 'n-adm1', title: 'Proctor office drop-in hours: 03:00 PM - 05:00 PM daily', date: 'Oct 12, 2026', priority: 'normal' }
    ]
  },
  {
    id: 'b-health',
    name: 'Campus Health Center & 24x7 Emergency Clinic',
    code: 'HC-01',
    category: 'healthcare',
    description: 'Fully equipped 12-bed infirmary with on-duty physician, basic pathology, and ambulance bay.',
    floors: 2,
    totalArea: '14,000 sq ft',
    status: 'operational',
    telemetryType: 'staff_verified',
    openIssuesCount: 0,
    accessibility: {
      wheelchairRamp: true,
      elevators: true,
      brailleSignage: true,
      accessibleRestrooms: true,
      tactilePaving: true,
    },
    coordinates: { x: 44, y: 72 },
    dimensions: { width: 16, height: 14 },
    facilities: [
      { id: 'hc-triage', name: 'Emergency Triage & Consultation', type: 'clinic_bed', capacity: 4, status: 'available', floor: 'Ground Floor', equipment: ['Defibrillator', 'ECG', 'Oxygen Manifold'] },
      { id: 'hc-ward', name: 'Patient Observation Ward', type: 'clinic_bed', capacity: 8, status: 'available', floor: '1st Floor', equipment: ['Nurse Call Station', 'Infusion Pumps'] }
    ],
    openComplaints: [],
    maintenanceHistory: [
      { id: 'm-701', category: 'Electrical', description: 'Emergency medical line UPS test passed without switchover delay', date: 'Oct 10, 2026', status: 'resolved', technician: 'Bikash Jena' }
    ],
    notices: [
      { id: 'n-hc1', title: 'Free annual dental and ophthalmology screening this Friday', date: 'Oct 13, 2026', priority: 'normal' }
    ]
  },
  {
    id: 'b-cafeteria',
    name: 'Central Student Hub & Cafeteria',
    code: 'HUB-01',
    category: 'cafeteria',
    description: 'Multi-cuisine campus dining hall, bookstore, and student co-curricular lounge.',
    floors: 2,
    totalArea: '22,000 sq ft',
    status: 'high_occupancy',
    telemetryType: 'live_iot',
    openIssuesCount: 0,
    accessibility: {
      wheelchairRamp: true,
      elevators: true,
      brailleSignage: false,
      accessibleRestrooms: true,
      tactilePaving: true,
    },
    coordinates: { x: 18, y: 15 },
    dimensions: { width: 17, height: 14 },
    facilities: [
      { id: 'cafe-main', name: 'Ground Floor Dining Hall', type: 'dining_hall', capacity: 250, status: 'occupied', floor: 'Ground Floor', equipment: ['Digital Token Display', 'POS Terminals'] },
      { id: 'cafe-lounge', name: 'Upper Deck Student Union Lounge', type: 'study_pod', capacity: 60, status: 'available', floor: '1st Floor', equipment: ['Acoustic Seating', 'Charging Pods'] }
    ],
    openComplaints: [],
    maintenanceHistory: [],
    notices: [
      { id: 'n-cf1', title: 'Evening nutritious snacks service starts at 04:30 PM', date: 'Oct 14, 2026', priority: 'normal' }
    ]
  }
];
