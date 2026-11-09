import React, { useState } from 'react';
import {
  MapPin,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Info,
  Clock,
  Layers,
  Search,
  Filter,
  Eye,
  PlusCircle,
  X,
  ShieldCheck,
  Activity,
  Maximize2,
  Calendar,
  Wrench,
  Wifi,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';
import { Card } from '../../components/common/Card.tsx';
import { Badge } from '../../components/common/Badge.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import {
  CampusBuilding,
  INITIAL_CAMPUS_BUILDINGS,
  FacilitySpace
} from '../../data/campusDigitalTwinData.ts';

export const CampusMapPage: React.FC = () => {
  const { user, role } = useAuth();
  const { t } = useLanguage();

  const [buildings, setBuildings] = useState<CampusBuilding[]>(INITIAL_CAMPUS_BUILDINGS);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('b-aryabhata');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [onlyIssuesFilter, setOnlyIssuesFilter] = useState<boolean>(false);
  const [onlyAccessibleFilter, setOnlyAccessibleFilter] = useState<boolean>(false);
  const [selectedFloor, setSelectedFloor] = useState<string>('All');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newNoticeText, setNewNoticeText] = useState('');
  const [selectedFacilitySpace, setSelectedFacilitySpace] = useState<FacilitySpace | null>(null);
  const [bookSuccess, setBookSuccess] = useState<string | null>(null);

  const selectedBuilding = buildings.find((b) => b.id === selectedBuildingId) || buildings[0];

  const filteredBuildings = buildings.filter((b) => {
    if (categoryFilter !== 'all' && b.category !== categoryFilter) return false;
    if (onlyIssuesFilter && b.openIssuesCount === 0) return false;
    if (onlyAccessibleFilter && (!b.accessibility.wheelchairRamp || !b.accessibility.elevators)) return false;
    return true;
  });

  const handleUpdateStatus = (buildingId: string, newStatus: CampusBuilding['status']) => {
    setBuildings((prev) =>
      prev.map((b) => (b.id === buildingId ? { ...b, status: newStatus } : b))
    );
  };

  const handleAddBuildingNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeText.trim() || !selectedBuilding) return;

    const newNotice = {
      id: `bn-${Date.now()}`,
      title: newNoticeText.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      priority: 'normal' as const
    };

    setBuildings((prev) =>
      prev.map((b) =>
        b.id === selectedBuilding.id
          ? { ...b, notices: [newNotice, ...b.notices] }
          : b
      )
    );
    setNewNoticeText('');
    setIsUpdateModalOpen(false);
  };

  const handleReserveSpace = (space: FacilitySpace) => {
    if (space.status === 'occupied' || space.status === 'maintenance') return;
    setBuildings((prev) =>
      prev.map((b) => {
        if (b.id !== selectedBuilding.id) return b;
        return {
          ...b,
          facilities: b.facilities.map((f) =>
            f.id === space.id ? { ...f, status: f.status === 'reserved' ? 'available' : 'reserved' } : f
          )
        };
      })
    );
    setBookSuccess(`Reservation status updated for ${space.name}`);
    setTimeout(() => setBookSuccess(null), 3500);
  };

  const getStatusColor = (status: CampusBuilding['status']) => {
    switch (status) {
      case 'operational':
        return 'fill-emerald-500/20 stroke-emerald-600 text-emerald-700 bg-emerald-50';
      case 'maintenance_alert':
        return 'fill-rose-500/25 stroke-rose-600 text-rose-700 bg-rose-50';
      case 'high_occupancy':
        return 'fill-amber-500/20 stroke-amber-600 text-amber-700 bg-amber-50';
    }
  };

  const getCategoryBadge = (cat: CampusBuilding['category']) => {
    switch (cat) {
      case 'academic': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'hostel': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'lab': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'library': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'admin': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'healthcare': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cafeteria': return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Digital Twin
            </span>
            <span className="text-xs text-slate-300">Spatial Campus Topology & IoT Sensor Grid</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Campus Digital Twin & Facility Navigator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Interactive spatial representation of campus blocks, accessibility ramps, live maintenance issues, and room booking availability.
          </p>
        </div>

        {/* Telemetry Legend Badges */}
        <div className="flex flex-wrap items-center gap-2 bg-black/30 p-2.5 rounded-xl border border-white/10 text-[11px]">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>IoT Sensor Telemetry</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-blue-950/60 text-blue-300 border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>Staff Audited</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-600/30">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>Grounded Simulation</span>
          </div>
        </div>
      </div>

      {bookSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{bookSuccess}</span>
        </div>
      )}

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span>Filter Facility Type:</span>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">All Campus Facilities (8)</option>
            <option value="academic">Academic Blocks</option>
            <option value="hostel">Student Hostels</option>
            <option value="library">Digital Libraries</option>
            <option value="lab">Research Labs & GPU Cluster</option>
            <option value="admin">Administrative Offices</option>
            <option value="healthcare">Health Center & Clinic</option>
            <option value="cafeteria">Dining & Food Court</option>
          </select>

          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyIssuesFilter}
              onChange={(e) => setOnlyIssuesFilter(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500"
            />
            <span>Active Issues Only</span>
          </label>

          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyAccessibleFilter}
              onChange={(e) => setOnlyAccessibleFilter(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Wheelchair & Ramp Accessible</span>
          </label>
        </div>

        {/* Administration Update Button */}
        {['admin', 'maintenance', 'warden'].includes(role || '') && (
          <button
            type="button"
            onClick={() => setIsUpdateModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Update Building Status / Post Notice</span>
          </button>
        )}
      </div>

      {/* Main Spatial Twin Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Map Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Campus Spatial Plan (Topological Twin)</span>
            </div>
            <span className="text-[11px] text-slate-400">Click any block to inspect real-time digital dossier</span>
          </div>

          {/* SVG Map Schematic */}
          <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden select-none">
            {/* Campus Pathways, Green Lawns & Walkways Grid */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1e293b" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              <rect width="100" height="100" fill="#0f172a" />
              <rect width="100" height="100" fill="url(#grid)" />

              {/* Central Green Quadrangle */}
              <circle cx="48" cy="50" r="14" fill="#064e3b" fillOpacity="0.25" stroke="#10b981" strokeWidth="0.3" strokeDasharray="1,1" />
              <text x="48" y="50" fill="#34d399" fontSize="2.2" textAnchor="middle" opacity="0.6" fontWeight="bold">
                Central Campus Quad & Amphitheatre
              </text>

              {/* Connecting Walkways & Accessible Pathways */}
              {/* North-South Spine */}
              <line x1="48" y1="5" x2="48" y2="95" stroke="#475569" strokeWidth="2" strokeDasharray="2,2" opacity="0.6" />
              {/* East-West Transit Axis */}
              <line x1="5" y1="50" x2="95" y2="50" stroke="#475569" strokeWidth="2" strokeDasharray="2,2" opacity="0.6" />
              {/* Hostel Loop Pathway */}
              <line x1="70" y1="20" x2="70" y2="70" stroke="#38bdf8" strokeWidth="1" strokeDasharray="1.5,1.5" opacity="0.5" />
              <text x="71" y="45" fill="#38bdf8" fontSize="1.8" opacity="0.5" transform="rotate(90, 71, 45)">
                Accessible Paved Ramp Way
              </text>

              {/* Main University Entry Gate */}
              <rect x="42" y="93" width="12" height="5" rx="1" fill="#1e293b" stroke="#64748b" strokeWidth="0.5" />
              <text x="48" y="96.5" fill="#94a3b8" fontSize="2" textAnchor="middle" fontWeight="bold">
                MAIN GATE & RFID SCANNER
              </text>

              {/* Render Building Footprints */}
              {filteredBuildings.map((b) => {
                const isSelected = b.id === selectedBuildingId;
                const isIssue = b.openIssuesCount > 0;

                let fillColor = '#1e293b';
                let strokeColor = isSelected ? '#6366f1' : '#475569';

                if (b.category === 'academic') fillColor = '#1e1b4b';
                else if (b.category === 'hostel') fillColor = '#311005';
                else if (b.category === 'library') fillColor = '#082f49';
                else if (b.category === 'lab') fillColor = '#2e1065';
                else if (b.category === 'healthcare') fillColor = '#022c22';
                else if (b.category === 'cafeteria') fillColor = '#431407';

                if (isIssue) strokeColor = '#f43f5e';

                return (
                  <g
                    key={b.id}
                    onClick={() => setSelectedBuildingId(b.id)}
                    className="cursor-pointer transition duration-200 group"
                  >
                    {/* Shadow / Pulse */}
                    {isSelected && (
                      <rect
                        x={b.coordinates.x - 1}
                        y={b.coordinates.y - 1}
                        width={b.dimensions.width + 2}
                        height={b.dimensions.height + 2}
                        rx="2"
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="0.8"
                        strokeDasharray="2,2"
                        className="animate-pulse"
                      />
                    )}

                    {/* Building Body */}
                    <rect
                      x={b.coordinates.x}
                      y={b.coordinates.y}
                      width={b.dimensions.width}
                      height={b.dimensions.height}
                      rx="1.5"
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? '1.2' : '0.6'}
                      opacity={isSelected ? 1 : 0.88}
                      className="group-hover:opacity-100 transition"
                    />

                    {/* Building Code Badge */}
                    <rect
                      x={b.coordinates.x + 1}
                      y={b.coordinates.y + 1}
                      width="5"
                      height="2.5"
                      rx="0.5"
                      fill="#0f172a"
                      opacity="0.8"
                    />
                    <text
                      x={b.coordinates.x + 3.5}
                      y={b.coordinates.y + 2.8}
                      fill="#e2e8f0"
                      fontSize="1.6"
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {b.code}
                    </text>

                    {/* Building Name */}
                    <text
                      x={b.coordinates.x + b.dimensions.width / 2}
                      y={b.coordinates.y + b.dimensions.height / 2 + 0.5}
                      fill={isSelected ? '#ffffff' : '#cbd5e1'}
                      fontSize="2.1"
                      textAnchor="middle"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      className="select-none pointer-events-none"
                    >
                      {b.name.length > 20 ? b.name.slice(0, 18) + '...' : b.name}
                    </text>

                    {/* Indicator: Open Issue Warning Icon */}
                    {isIssue && (
                      <g transform={`translate(${b.coordinates.x + b.dimensions.width - 3.5}, ${b.coordinates.y + 1})`}>
                        <circle cx="1.5" cy="1.5" r="1.5" fill="#f43f5e" />
                        <text x="1.5" y="2.2" fill="#ffffff" fontSize="1.8" textAnchor="middle" fontWeight="bold">!</text>
                      </g>
                    )}

                    {/* Indicator: Wheelchair accessible icon symbol */}
                    {b.accessibility.wheelchairRamp && (
                      <g transform={`translate(${b.coordinates.x + 1}, ${b.coordinates.y + b.dimensions.height - 3.2})`}>
                        <rect width="4.5" height="2.2" rx="0.5" fill="#0284c7" opacity="0.85" />
                        <text x="2.25" y="1.6" fill="#ffffff" fontSize="1.3" textAnchor="middle" fontWeight="bold">♿ RAMP</text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Quick Map Overlay Controls */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-xs p-2 rounded-lg border border-slate-700/60 text-[10px] text-slate-300 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-indigo-500 inline-block" /> Selected
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-rose-500 inline-block" /> Issue Alert
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-sky-500 inline-block" /> ♿ Accessible
              </span>
            </div>
          </div>

          {/* Quick Building Selector Horizontal Scroll */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 overflow-x-auto flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase shrink-0">Blocks:</span>
            {buildings.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBuildingId(b.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold shrink-0 cursor-pointer transition ${
                  b.id === selectedBuildingId
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {b.code} - {b.name.split(' ')[0]}
                {b.openIssuesCount > 0 && (
                  <span className="ml-1.5 px-1 py-0.2 bg-rose-500 text-white rounded text-[10px]">
                    {b.openIssuesCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Selected Building Dossier Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-t-4 border-t-indigo-600">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getCategoryBadge(selectedBuilding.category)}`}>
                      {selectedBuilding.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-500">
                      Code: {selectedBuilding.code}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    {selectedBuilding.name}
                  </h2>
                </div>

                {/* Telemetry type badge */}
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Activity className="w-3 h-3 text-emerald-600" />
                    {selectedBuilding.telemetryType === 'live_iot' ? 'IoT Live' : 'Verified'}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{selectedBuilding.totalArea}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedBuilding.description}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 my-3 text-center">
              <div className="p-2 rounded-lg bg-slate-50">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Floors</p>
                <p className="text-sm font-bold text-slate-900">{selectedBuilding.floors} Levels</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-50">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Active Issues</p>
                <p className={`text-sm font-bold ${selectedBuilding.openIssuesCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {selectedBuilding.openIssuesCount}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-slate-50">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Accessibility</p>
                <p className="text-sm font-bold text-indigo-700">
                  {selectedBuilding.accessibility.wheelchairRamp ? 'Wheelchair Ready' : 'Standard'}
                </p>
              </div>
            </div>

            {/* Accessibility Features Checklist */}
            <div className="space-y-1.5 pb-3 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Accessibility Infrastructure:</span>
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <span className={`flex items-center gap-1 ${selectedBuilding.accessibility.wheelchairRamp ? 'text-emerald-700 font-medium' : 'text-slate-400'}`}>
                  {selectedBuilding.accessibility.wheelchairRamp ? '✓ Ramp at entrance' : '✗ No Ramp'}
                </span>
                <span className={`flex items-center gap-1 ${selectedBuilding.accessibility.elevators ? 'text-emerald-700 font-medium' : 'text-slate-400'}`}>
                  {selectedBuilding.accessibility.elevators ? '✓ Elevators available' : '✗ Staircase only'}
                </span>
                <span className={`flex items-center gap-1 ${selectedBuilding.accessibility.accessibleRestrooms ? 'text-emerald-700 font-medium' : 'text-slate-400'}`}>
                  {selectedBuilding.accessibility.accessibleRestrooms ? '✓ Accessible restrooms' : '✗ Standard restrooms'}
                </span>
                <span className={`flex items-center gap-1 ${selectedBuilding.accessibility.brailleSignage ? 'text-emerald-700 font-medium' : 'text-slate-400'}`}>
                  {selectedBuilding.accessibility.brailleSignage ? '✓ Braille floor sign' : '✗ Standard signs'}
                </span>
              </div>
            </div>

            {/* Bookable Rooms / Facilities in this Building */}
            <div className="space-y-2 py-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Available Facilities & Space Booking
                </h4>
                <span className="text-[10px] text-slate-400">Real-time status</span>
              </div>

              <div className="space-y-2">
                {selectedBuilding.facilities.map((fac) => {
                  const isAvailable = fac.status === 'available';
                  const isReserved = fac.status === 'reserved';
                  return (
                    <div
                      key={fac.id}
                      className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{fac.name}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                            {fac.floor}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Capacity: {fac.capacity} • Equip: {fac.equipment.join(', ')}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            fac.status === 'available'
                              ? 'bg-emerald-100 text-emerald-800'
                              : fac.status === 'occupied'
                              ? 'bg-amber-100 text-amber-800'
                              : fac.status === 'reserved'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {fac.status}
                        </span>

                        {(isAvailable || isReserved) && (
                          <button
                            type="button"
                            onClick={() => handleReserveSpace(fac)}
                            className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer transition ${
                              isReserved
                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                          >
                            {isReserved ? 'Reserved (Cancel)' : 'Reserve'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Open Maintenance Issues */}
            <div className="space-y-2 py-3 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                <span>Active Service Tickets ({selectedBuilding.openComplaints.length})</span>
                {selectedBuilding.openComplaints.length > 0 && (
                  <span className="text-[10px] text-rose-600 font-semibold">Priority Action Required</span>
                )}
              </h4>

              {selectedBuilding.openComplaints.length === 0 ? (
                <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No open faults or maintenance flags recorded for this block.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedBuilding.openComplaints.map((c) => (
                    <div key={c.id} className="p-2.5 rounded-lg border border-rose-100 bg-rose-50/50 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-bold text-rose-800 uppercase">{c.id} • {c.category}</span>
                        <span className="text-[10px] text-slate-400">{c.reportedAt}</span>
                      </div>
                      <p className="font-semibold text-slate-900 mt-1">{c.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Maintenance History */}
            {selectedBuilding.maintenanceHistory.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Recent Facility Maintenance Log
                </h4>
                <div className="space-y-1.5">
                  {selectedBuilding.maintenanceHistory.map((m) => (
                    <div key={m.id} className="p-2 rounded bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-medium text-slate-800">{m.description}</span>
                        <p className="text-[10px] text-slate-400">Technician: {m.technician} • {m.date}</p>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Facility Update Modal for Authorized Users */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Facility Status Update (Authorized)</h3>
                <p className="text-xs text-slate-500">Update operational mode or attach safety notice to {selectedBuilding.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsUpdateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddBuildingNotice} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Operational Status</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedBuilding.id, 'operational')}
                    className={`p-2 rounded-lg text-xs font-semibold border ${
                      selectedBuilding.status === 'operational'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Operational
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedBuilding.id, 'maintenance_alert')}
                    className={`p-2 rounded-lg text-xs font-semibold border ${
                      selectedBuilding.status === 'maintenance_alert'
                        ? 'bg-rose-50 border-rose-500 text-rose-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Under Maintenance
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedBuilding.id, 'high_occupancy')}
                    className={`p-2 rounded-lg text-xs font-semibold border ${
                      selectedBuilding.status === 'high_occupancy'
                        ? 'bg-amber-50 border-amber-500 text-amber-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    High Occupancy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Broadcast Facility Notice to Building</label>
                <input
                  type="text"
                  placeholder="e.g., Scheduled water tank cleaning Oct 16 (09:00 - 12:00 PM)"
                  value={newNoticeText}
                  onChange={(e) => setNewNoticeText(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
                >
                  Save Facility State
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
