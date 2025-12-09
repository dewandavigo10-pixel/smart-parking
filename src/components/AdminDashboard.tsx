import { ParkingSpot, Vehicle, Customer, Guard } from '../App';
import { 
  Car, 
  Bike, 
  TrendingUp, 
  Users, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AdminDashboardProps {
  parkingSpots: ParkingSpot[];
  history: Array<Vehicle & { waktuKeluar?: Date; durasi?: string }>;
  customers: Customer[];
  guards: Guard[];
}

export function AdminDashboard({ parkingSpots, history, customers, guards }: AdminDashboardProps) {
  const motorSpots = parkingSpots.filter(spot => spot.tipe === 'Motor');
  const mobilSpots = parkingSpots.filter(spot => spot.tipe === 'Mobil');
  
  const motorTersedia = motorSpots.filter(spot => spot.status === 'Tersedia').length;
  const mobilTersedia = mobilSpots.filter(spot => spot.status === 'Tersedia').length;
  const motorTerisi = motorSpots.filter(spot => spot.status === 'Terisi').length;
  const mobilTerisi = mobilSpots.filter(spot => spot.status === 'Terisi').length;
  
  const spotsRusak = parkingSpots.filter(spot => spot.status === 'Rusak').length;
  const sensorsError = parkingSpots.filter(spot => spot.sensorStatus === 'Error').length;
  
  const occupancyRate = ((motorTerisi + mobilTerisi) / parkingSpots.length * 100).toFixed(1);
  
  // Chart data
  const chartData = [
    { name: 'Motor', Tersedia: motorTersedia, Terisi: motorTerisi, Total: motorSpots.length },
    { name: 'Mobil', Tersedia: mobilTersedia, Terisi: mobilTerisi, Total: mobilSpots.length }
  ];

  const todayHistory = history.filter(h => {
    const today = new Date();
    const historyDate = new Date(h.waktuKeluar || h.waktuMasuk);
    return historyDate.toDateString() === today.toDateString();
  });

  const weeklyData = [
    { hari: 'Sen', kendaraan: 45 },
    { hari: 'Sel', kendaraan: 52 },
    { hari: 'Rab', kendaraan: 48 },
    { hari: 'Kam', kendaraan: 61 },
    { hari: 'Jum', kendaraan: 55 },
    { hari: 'Sab', kendaraan: 38 },
    { hari: 'Min', kendaraan: 42 },
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Okupansi Parkir</p>
              <p className="text-indigo-900 mt-1">{occupancyRate}%</p>
              <p className="text-gray-500">
                {motorTerisi + mobilTerisi} / {parkingSpots.length} terisi
              </p>
            </div>
            <TrendingUp className="text-indigo-600" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Penghuni</p>
              <p className="text-green-600 mt-1">{customers.length}</p>
              <p className="text-gray-500">Aktif terdaftar</p>
            </div>
            <Users className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Penjaga Kos</p>
              <p className="text-blue-600 mt-1">{guards.length}</p>
              <p className="text-gray-500">Bertugas</p>
            </div>
            <Activity className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Kendaraan Hari Ini</p>
              <p className="text-purple-600 mt-1">{todayHistory.length}</p>
              <p className="text-gray-500">Keluar masuk</p>
            </div>
            <Car className="text-purple-600" size={32} />
          </div>
        </div>
      </div>

      {/* Alerts */}
      {(spotsRusak > 0 || sensorsError > 0) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-yellow-600 mt-1" size={24} />
            <div>
              <h3 className="text-yellow-900">Perhatian!</h3>
              <ul className="text-yellow-800 mt-2 space-y-1">
                {spotsRusak > 0 && <li>• {spotsRusak} slot parkir dalam kondisi rusak</li>}
                {sensorsError > 0 && <li>• {sensorsError} sensor parkir mengalami error</li>}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Status Kapasitas Parkir</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Terisi" fill="#4f46e5" />
              <Bar dataKey="Tersedia" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Tren Kendaraan Mingguan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hari" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="kendaraan" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Motor Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bike className="text-indigo-600" size={24} />
            <h3 className="text-gray-900">Statistik Parkir Motor</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Slot</span>
              <span className="text-gray-900">{motorSpots.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-700">Tersedia</span>
              <span className="text-green-900">{motorTersedia}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-red-700">Terisi</span>
              <span className="text-red-900">{motorTerisi}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-yellow-700">Rusak</span>
              <span className="text-yellow-900">
                {motorSpots.filter(s => s.status === 'Rusak').length}
              </span>
            </div>
          </div>
        </div>

        {/* Mobil Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Car className="text-indigo-600" size={24} />
            <h3 className="text-gray-900">Statistik Parkir Mobil</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Slot</span>
              <span className="text-gray-900">{mobilSpots.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-700">Tersedia</span>
              <span className="text-green-900">{mobilTersedia}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-red-700">Terisi</span>
              <span className="text-red-900">{mobilTerisi}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-yellow-700">Rusak</span>
              <span className="text-yellow-900">
                {mobilSpots.filter(s => s.status === 'Rusak').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-gray-900 mb-4">Aktivitas Terbaru Hari Ini</h3>
        {todayHistory.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Belum ada aktivitas hari ini</p>
        ) : (
          <div className="space-y-3">
            {todayHistory.slice(0, 5).map(record => (
              <div key={record.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-500" size={20} />
                  <div>
                    <p className="text-gray-900">{record.platNomor}</p>
                    <p className="text-gray-600">{record.namaPemilik} - Kamar {record.nomorKamar}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">{record.durasi}</p>
                  <span className={`px-2 py-1 rounded text-white ${
                    record.jenisKendaraan === 'Motor' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {record.jenisKendaraan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
