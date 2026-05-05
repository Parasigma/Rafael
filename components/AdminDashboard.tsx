import React, { useState, useMemo } from 'react';
import { Guest, DashboardStats } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users, Utensils, CheckCircle, Bus, Filter, CarFront, Crown } from 'lucide-react';

interface AdminDashboardProps {
  guests: Guest[];
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ guests, onLogout }) => {
  // Filter States
  const [filterAttending, setFilterAttending] = useState<string>('all');
  const [filterDietary, setFilterDietary] = useState<string>('all');
  const [filterTransport, setFilterTransport] = useState<string>('all');
  const [filterCaptain, setFilterCaptain] = useState<string>('all');

  // --- Calculations for KPIs ---
  const stats: DashboardStats = {
    totalResponses: guests.length,
    attendingCount: guests.filter(g => g.attending === 'yes').length,
    notAttendingCount: guests.filter(g => g.attending === 'no').length,
    totalGuests: guests.reduce((acc, curr) => acc + (curr.attending === 'yes' ? 1 + curr.companions : 0), 0),
    dietaryCount: guests.filter(g => g.attending === 'yes' && g.dietaryRestrictions && g.dietaryRestrictions.trim() !== '').length
  };

  // --- Chart Data Preparation (Only for attending guests) ---
  const attendingGuests = guests.filter(g => g.attending === 'yes');

  // 1. Attendance Status (Includes everyone)
  const attendanceData = [
    { name: 'Sí', value: stats.attendingCount },
    { name: 'No', value: stats.notAttendingCount },
    { name: 'Pendiente', value: guests.filter(g => g.attending === 'pending').length }
  ];

  // 2. Transport (Only Attending)
  const transportData = [
    { name: 'Autobús', value: attendingGuests.filter(g => (g.needsTransport || '').toLowerCase().includes('sí')).length },
    { name: 'Coche Propio', value: attendingGuests.filter(g => !(g.needsTransport || '').toLowerCase().includes('sí')).length },
  ];

  // 3. Dietary Restrictions (Only Attending)
  const dietaryData = [
    { name: 'Sin Restricciones', value: attendingGuests.length - stats.dietaryCount },
    { name: 'Con Alergias/Dieta', value: stats.dietaryCount },
  ];

  // 4. Companions Distribution (Only Attending)
  const soloCount = attendingGuests.filter(g => g.companions === 0).length;
  const plusOneCount = attendingGuests.filter(g => g.companions === 1).length;
  const familyCount = attendingGuests.filter(g => g.companions > 1).length;

  const companionData = [
    { name: 'Solo', invitados: soloCount },
    { name: '+1', invitados: plusOneCount },
    { name: 'Familia (+2)', invitados: familyCount },
  ];

  // Colors
  const COLORS_ATTENDANCE = ['#4ade80', '#f87171', '#fbbf24']; // Green, Red, Amber
  const COLORS_TRANSPORT = ['#60a5fa', '#9ca3af']; // Blue, Gray
  const COLORS_DIETARY = ['#e5e7eb', '#f59e0b']; // Gray, Orange
  const BAR_COLOR = '#d4af37'; // Gold

  // --- Filter Logic for Table ---
  const filteredGuests = useMemo(() => {
    return guests.filter(guest => {
      // 1. Attendance Filter
      if (filterAttending !== 'all') {
        if (guest.attending !== filterAttending) return false;
      }

      // 2. Dietary Filter
      if (filterDietary === 'has_restriction') {
        if (!guest.dietaryRestrictions || !guest.dietaryRestrictions.trim()) return false;
      }

      // 3. Transport Filter
      if (filterTransport === 'needs_bus') {
        const t = (guest.needsTransport || '').toLowerCase();
        if (!t.includes('sí') && !t.includes('si') && !t.includes('yes')) return false;
      }

      // 4. Captain Filter
      if (filterCaptain === 'yes') {
        if (!guest.wantsToBeCaptain) return false;
      }

      return true;
    });
  }, [guests, filterAttending, filterDietary, filterTransport, filterCaptain]);

  return (
    <div className="min-h-screen bg-gray-50 pb-12 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl md:text-2xl font-cinzel text-gray-800">Panel de Control</h1>

        <button 
          onClick={onLogout}
          className="text-sm text-red-500 hover:text-red-700 font-sans"
        >
          Salir
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
            
            {/* 1. KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-wedding-gold">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-sans uppercase">Total Asistentes</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stats.totalGuests}</h3>
                  </div>
                  <Users className="h-8 w-8 text-wedding-gold opacity-50" />
                </div>
                <p className="text-xs text-gray-400 mt-2">Invitados + Acompañantes confirmados</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-400">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-sans uppercase">Confirmaciones</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stats.attendingCount}</h3>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400 opacity-50" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-400">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-sans uppercase">Autobús</p>
                    <h3 className="text-3xl font-bold text-gray-800">{transportData[0].value}</h3>
                  </div>
                  <Bus className="h-8 w-8 text-blue-400 opacity-50" />
                </div>
                <p className="text-xs text-gray-400 mt-2">Personas que requieren transporte</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-400">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-sans uppercase">Dietas Especiales</p>
                    <h3 className="text-3xl font-bold text-gray-800">{stats.dietaryCount}</h3>
                  </div>
                  <Utensils className="h-8 w-8 text-orange-400 opacity-50" />
                </div>
                <p className="text-xs text-gray-400 mt-2">Alergias o menús especiales</p>
              </div>
            </div>

            {/* 2. Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              {/* Attendance Chart */}
              <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
                 <h3 className="text-sm font-bold text-gray-700 mb-2 w-full text-left flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> Asistencia Global
                 </h3>
                 <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={attendanceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {attendanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS_ATTENDANCE[index % COLORS_ATTENDANCE.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{fontSize: '10px'}}/>
                      </PieChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Transport Chart */}
              <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
                 <h3 className="text-sm font-bold text-gray-700 mb-2 w-full text-left flex items-center gap-2">
                    <Bus className="w-4 h-4 text-blue-500" /> Transporte
                 </h3>
                 <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={transportData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {transportData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS_TRANSPORT[index % COLORS_TRANSPORT.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{fontSize: '10px'}}/>
                      </PieChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Dietary Chart */}
              <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
                 <h3 className="text-sm font-bold text-gray-700 mb-2 w-full text-left flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-orange-500" /> Menús Especiales
                 </h3>
                 <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dietaryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {dietaryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS_DIETARY[index % COLORS_DIETARY.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{fontSize: '10px'}}/>
                      </PieChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Companions Bar Chart */}
              <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
                 <h3 className="text-sm font-bold text-gray-700 mb-2 w-full text-left flex items-center gap-2">
                    <Users className="w-4 h-4 text-wedding-gold" /> Grupos
                 </h3>
                 <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={companionData} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} />
                        <YAxis tick={{fontSize: 10}} allowDecimals={false} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="invitados" fill={BAR_COLOR} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>

            </div>

            {/* 3. Detailed List Table (Full Width) */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-gray-700">Listado Detallado</h3>
                    
                    {/* Filters Toolbar */}
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Filter className="w-4 h-4" />
                      </div>
                      
                      <select 
                        value={filterAttending}
                        onChange={(e) => setFilterAttending(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-wedding-gold outline-none text-xs"
                      >
                        <option value="all">Todos los Estados</option>
                        <option value="yes">Asistirán</option>
                        <option value="no">No Asistirán</option>
                        <option value="pending">Pendientes</option>
                      </select>

                      <select 
                        value={filterDietary}
                        onChange={(e) => setFilterDietary(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-wedding-gold outline-none text-xs"
                      >
                        <option value="all">Dietas: Todas</option>
                        <option value="has_restriction">Con Restricciones</option>
                      </select>

                      <select 
                        value={filterTransport}
                        onChange={(e) => setFilterTransport(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-wedding-gold outline-none text-xs"
                      >
                         <option value="all">Transporte: Todos</option>
                         <option value="needs_bus">Requieren Bus</option>
                      </select>

                      <select 
                        value={filterCaptain}
                        onChange={(e) => setFilterCaptain(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-wedding-gold outline-none text-xs"
                      >
                         <option value="all">Rol: Todos</option>
                         <option value="yes">Voluntarios a Capitán</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                      <thead className="uppercase tracking-wider border-b border-gray-200 bg-gray-50 text-xs">
                        <tr>
                          <th scope="col" className="px-6 py-4 font-semibold text-gray-500">Nombre</th>
                          <th scope="col" className="px-6 py-4 font-semibold text-gray-500">Estado</th>
                          <th scope="col" className="px-6 py-4 font-semibold text-gray-500 text-center">Acompañantes</th>
                          <th scope="col" className="px-6 py-4 font-semibold text-gray-500 text-center">Transporte</th>
                          <th scope="col" className="px-6 py-4 font-semibold text-gray-500">Notas/Dietas</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredGuests.map((guest) => (
                          <tr key={guest.id} className={`hover:bg-pink-50/20 transition-colors group ${guest.wantsToBeCaptain ? 'bg-yellow-50/30' : ''}`}>
                            <td className="px-6 py-4 font-medium text-gray-900">
                                <div className="flex items-center gap-3">
                                    {guest.wantsToBeCaptain && (
                                        <div className="w-8 h-8 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center shadow-sm" title="Quiere ser Capitán">
                                            <Crown className="w-4 h-4 text-yellow-600 fill-yellow-400" />
                                        </div>
                                    )}
                                    <span className={guest.wantsToBeCaptain ? "text-yellow-900 font-semibold" : ""}>
                                        {guest.fullName}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                                guest.attending === 'yes' ? 'bg-green-100 text-green-700' : 
                                guest.attending === 'no' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                              }`}>
                                {guest.attending === 'yes' ? 'Confirmado' : guest.attending === 'no' ? 'No Asiste' : 'Pendiente'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                {guest.attending === 'yes' ? (
                                    <span className="text-gray-600 font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">
                                        {guest.companions === 0 ? 'Solo' : `+${guest.companions}`}
                                    </span>
                                ) : (
                                    <span className="text-gray-300">-</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {guest.attending === 'yes' && (
                                <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${guest.needsTransport === 'Sí' ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100' : 'text-gray-400'}`}>
                                  {guest.needsTransport === 'Sí' ? <Bus className="h-3 w-3" /> : <CarFront className="h-3 w-3" />}
                                  {guest.needsTransport === 'Sí' ? 'BUS' : 'Coche'}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-gray-500 truncate max-w-xs text-xs" title={`${guest.dietaryRestrictions} - ${guest.message}`}>
                              {guest.dietaryRestrictions && (
                                <div className="text-orange-600 flex items-center gap-1 font-medium mb-1">
                                    <Utensils className="h-3 w-3" /> 
                                    {guest.dietaryRestrictions}
                                </div>
                              )}
                              <span className="italic opacity-70">{guest.message}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredGuests.length === 0 && (
                    <div className="p-8 text-center text-gray-500 bg-gray-50/50">
                      No hay invitados que coincidan con los filtros seleccionados.
                    </div>
                  )}
            </div>
          </div>
      </div>
    </div>
  );
};