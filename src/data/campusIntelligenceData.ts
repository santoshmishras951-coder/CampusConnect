export interface IntelligenceRiskItem {
  id: string;
  facilityId: string;
  facilityName: string;
  category: 'Plumbing' | 'Electrical' | 'HVAC' | 'Network' | 'Civil';
  riskScore: number; // 0 - 100
  riskLevel: 'Low' | 'Medium' | 'Elevated' | 'Critical';
  factors: {
    recurrenceRate: number; // e.g. 85
    ticketAgeSeverity: number; // e.g. 90
    assetWearFactor: number; // e.g. 70
    usageStress: number; // e.g. 60
  };
  explanation: string;
  recommendedAction: string;
  estimatedFailureWindow: string;
  recurringTicketCount: number;
}

export interface VolumeTrendItem {
  category: string;
  thisWeekCount: number;
  lastWeekCount: number;
  changePct: number;
  direction: 'up' | 'down' | 'stable';
  primaryHotspot: string;
}

export interface OverdueTicketItem {
  ticketId: string;
  facility: string;
  location: string;
  category: string;
  description: string;
  reportedAt: string;
  hoursElapsed: number;
  slaTargetHours: number;
  assignedStaff: string;
  urgency: 'high' | 'critical' | 'medium';
}

export interface PreventiveWorkOrder {
  id: string;
  title: string;
  facility: string;
  category: string;
  priority: 'urgent' | 'high' | 'routine';
  scheduledDate: string;
  estimatedHours: number;
  status: 'recommended' | 'dispatched' | 'completed';
  assignedTechnician: string;
  roiRationale: string;
}

export const INITIAL_RISK_ITEMS: IntelligenceRiskItem[] = [
  {
    id: 'risk-1',
    facilityId: 'b-mahanadi-hostel',
    facilityName: 'Mahanadi Hall of Residence (Block B)',
    category: 'Plumbing',
    riskScore: 88,
    riskLevel: 'Critical',
    factors: {
      recurrenceRate: 92,
      ticketAgeSeverity: 85,
      assetWearFactor: 80,
      usageStress: 95
    },
    explanation: '4 repeat water pressure drops and pipe joint seepage reported in 12 days. High vibration detected in 3rd stage rooftop centrifugal booster pump.',
    recommendedAction: 'Execute preventive overhaul of rooftop booster pump impeller and replace 65mm check valve before morning peak usage.',
    estimatedFailureWindow: '24 - 48 Hours',
    recurringTicketCount: 4
  },
  {
    id: 'risk-2',
    facilityId: 'b-library',
    facilityName: 'Central Digital Library (2nd Floor)',
    category: 'Network',
    riskScore: 74,
    riskLevel: 'Elevated',
    factors: {
      recurrenceRate: 78,
      ticketAgeSeverity: 65,
      assetWearFactor: 70,
      usageStress: 85
    },
    explanation: 'Wi-Fi Access Point AP-204 experienced 32 packet drops and auto-reboots under heavy student concourse loads (160+ concurrent endpoints).',
    recommendedAction: 'Rebalance RF channels and upgrade PoE switch power budget to prevent thermal throttling on 5GHz radio.',
    estimatedFailureWindow: '3 - 5 Days',
    recurringTicketCount: 3
  },
  {
    id: 'risk-3',
    facilityId: 'b-aryabhata',
    facilityName: 'Aryabhata Block (Lecture Hall 101)',
    category: 'HVAC',
    riskScore: 68,
    riskLevel: 'Medium',
    factors: {
      recurrenceRate: 60,
      ticketAgeSeverity: 72,
      assetWearFactor: 65,
      usageStress: 75
    },
    explanation: 'Air circulation temperature sensor intermittent drift; compressor cycling 3x faster than baseline rating.',
    recommendedAction: 'Inspect refrigerant pressure lines and clean return air electrostatic dust filters.',
    estimatedFailureWindow: '5 - 7 Days',
    recurringTicketCount: 2
  },
  {
    id: 'risk-4',
    facilityId: 'b-admin',
    facilityName: 'Admin Secretariat Complex',
    category: 'Electrical',
    riskScore: 32,
    riskLevel: 'Low',
    factors: {
      recurrenceRate: 20,
      ticketAgeSeverity: 30,
      assetWearFactor: 40,
      usageStress: 35
    },
    explanation: 'Load balanced across dual-source transformer. Sub-panel B breaker thermography within normal thermal delta (+3.2°C).',
    recommendedAction: 'Routine quarterly infrared scan scheduled for next month.',
    estimatedFailureWindow: 'No immediate failure risk',
    recurringTicketCount: 0
  }
];

export const INITIAL_VOLUME_TRENDS: VolumeTrendItem[] = [
  { category: 'Plumbing & Water', thisWeekCount: 14, lastWeekCount: 8, changePct: 75, direction: 'up', primaryHotspot: 'Mahanadi Hall (Block B)' },
  { category: 'Wi-Fi & Network', thisWeekCount: 9, lastWeekCount: 6, changePct: 50, direction: 'up', primaryHotspot: 'Central Digital Library' },
  { category: 'Electrical & Lighting', thisWeekCount: 7, lastWeekCount: 11, changePct: -36, direction: 'down', primaryHotspot: 'Aryabhata Lecture Theatres' },
  { category: 'HVAC & Cooling', thisWeekCount: 5, lastWeekCount: 4, changePct: 25, direction: 'up', primaryHotspot: 'Aryabhata LH-101' },
  { category: 'Sanitation & Housekeeping', thisWeekCount: 6, lastWeekCount: 7, changePct: -14, direction: 'down', primaryHotspot: 'Cafeteria Upper Deck' }
];

export const INITIAL_OVERDUE_TICKETS: OverdueTicketItem[] = [
  {
    ticketId: 'CC-CMP-911',
    facility: 'Mahanadi Hall of Residence',
    location: 'Block B, 3rd Floor Washrooms',
    category: 'Plumbing',
    description: 'Severe water pressure drop during morning rush (06:30 - 08:30 AM). Student taps running dry.',
    reportedAt: 'Today, 06:45 AM',
    hoursElapsed: 6.2,
    slaTargetHours: 4.0,
    assignedStaff: 'R. K. Verma (Senior Plumber)',
    urgency: 'critical'
  },
  {
    ticketId: 'CC-CMP-1042',
    facility: 'Central Digital Library',
    location: '2nd Floor Group Study Pods',
    category: 'Network',
    description: 'High packet loss and disconnections interrupting student online exam research sessions.',
    reportedAt: 'Yesterday, 04:15 PM',
    hoursElapsed: 18.5,
    slaTargetHours: 12.0,
    assignedStaff: 'Priya Panda (Telecom Engineer)',
    urgency: 'high'
  }
];

export const INITIAL_PREVENTIVE_WORK_ORDERS: PreventiveWorkOrder[] = [
  {
    id: 'PWO-2026-081',
    title: 'Hostel Booster Pump Overhaul & Check Valve Replacement',
    facility: 'Mahanadi Hall of Residence',
    category: 'Plumbing',
    priority: 'urgent',
    scheduledDate: 'Oct 15, 2026 - 02:00 PM',
    estimatedHours: 2.5,
    status: 'recommended',
    assignedTechnician: 'R. K. Verma',
    roiRationale: 'Prevents total water shutoff for 240 hostel residents and saves ~₹18,000 in emergency emergency tanker procurement.'
  },
  {
    id: 'PWO-2026-082',
    title: 'Access Point AP-204 Firmware Rollback & PoE Budget Optimization',
    facility: 'Central Digital Library',
    category: 'Network',
    priority: 'high',
    scheduledDate: 'Oct 15, 2026 - 05:30 PM',
    estimatedHours: 1.5,
    status: 'recommended',
    assignedTechnician: 'Priya Panda',
    roiRationale: 'Eliminates repeat complaints during upcoming semester exams with zero hardware capex.'
  },
  {
    id: 'PWO-2026-083',
    title: 'Aryabhata LH-101 AC Return Air Duct Filter Cleansing',
    facility: 'Aryabhata Academic Block',
    category: 'HVAC',
    priority: 'routine',
    scheduledDate: 'Oct 16, 2026 - 08:00 AM',
    estimatedHours: 2.0,
    status: 'recommended',
    assignedTechnician: 'Bikash Jena',
    roiRationale: 'Improves heat exchange efficiency by 18% and reduces classroom compressor thermal strain.'
  }
];
