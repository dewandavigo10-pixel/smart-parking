import { useState } from 'react';
import { ParkingSpot } from '../App';
import { Settings, AlertCircle, CheckCircle2, Wrench, Activity, Car, Bike } from 'lucide-react';

interface SlotManagementProps {
  parkingSpots: ParkingSpot[];
  onUpdateSpot: (spot: ParkingSpot) => void;
}

export function SlotManagement({ parkingSpots, onUpdateSpot }: SlotManagementProps) {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [filterStatus, setFilterStatus] = useState<'Semua' | 'Tersedia' | 'Terisi' | 'Rusak'>('Semua');
  const [filterType, setFilterType] = useState<'Semua' | 'Motor' | 'Mobil'>('Semua');

  const filteredSpots = parkingSpots.filter(spot => {
    const statusMatch = filterStatus === 'Semua' || spot.status === filterStatus;
    const typeMatch = filterType === 'Semua' || spot.tipe === filterType;
    return statusMatch && typeMatch;
  });

  const handleStatusChange = (spotId: string, newStatus: ParkingSpot['status']) => {
    const spot = parkingSpots.find(s => s.id === spotId);
    if (spot) {
      onUpdateSpot({ ...spot, status: newStatus });
      setSelectedSpot(null);
    }
  };

  const handleSensorChange = (spotId: string, newSensorStatus: ParkingSpot['sensorStatus']) => {
    const spot = parkingSpots.find(s => s.id === spotId);
    if (spot) {
      onUpdateSpot({ ...spot, sensorStatus: newSensorStatus });
      setSelectedSpot(null);
    }
  };

  const sensorNormal = parkingSpots.filter(s => s.sensorStatus === 'Normal').length;
  const sensorError = parkingSpots.filter(s => s.sensorStatus === 'Error').length;
  const slotRusak = parkingSpots.filter(s => s.status === 'Rusak').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3">
          <Settings className="text-indigo-600" size={32} />
          <div>
            <h2 className="text-gray-900">Manajemen Slot & Sensor</h2>
            <p className="text-gray-600">Kelola status slot parkir dan sensor</p>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Sensor Normal</p>
              <p className="text-green-600 mt-1">{sensorNormal}</p>
            </div>
            <Activity className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Sensor Error</p>
              <p className="text-red-600 mt-1">{sensorError}</p>
            </div>
            <AlertCircle className="text-red-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Slot Rusak</p>
              <p className="text-yellow-600 mt-1">{slotRusak}</p>
            </div>
            <Wrench className="text-yellow-600" size={32} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-gray-900 mb-4">Filter</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Status Slot</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Semua">Semua Status</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Terisi">Terisi</option>
              <option value="Rusak">Rusak</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Jenis Slot</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Semua">Semua Jenis</option>
              <option value="Motor">Motor</option>
              <option value="Mobil">Mobil</option>
            </select>
          </div>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-gray-900 mb-4">
          Daftar Slot ({filteredSpots.length} dari {parkingSpots.length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpots.map(spot => (
            <div
              key={spot.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedSpot?.id === spot.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : spot.status === 'Rusak'
                  ? 'border-yellow-300 bg-yellow-50'
                  : spot.sensorStatus === 'Error'
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedSpot(spot)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {spot.tipe === 'Motor' ? (
                    <Bike className="text-indigo-600" size={20} />
                  ) : (
                    <Car className="text-indigo-600" size={20} />
                  )}
                  <span className="text-gray-900">{spot.nomor}</span>
                </div>
                <span className={`px-2 py-1 rounded text-white ${
                  spot.status === 'Tersedia' ? 'bg-green-500' :
                  spot.status === 'Terisi' ? 'bg-red-500' :
                  'bg-yellow-500'
                }`}>
                  {spot.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Sensor:</span>
                  <span className={`flex items-center gap-1 ${
                    spot.sensorStatus === 'Normal' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {spot.sensorStatus === 'Normal' ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    {spot.sensorStatus}
                  </span>
                </div>
                
                {spot.vehicle && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-gray-700">{spot.vehicle.platNomor}</p>
                    <p className="text-gray-600">{spot.vehicle.namaPemilik}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Panel */}
      {selectedSpot && (
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-indigo-600">
          <h3 className="text-gray-900 mb-4">Edit Slot {selectedSpot.nomor}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Status Slot</label>
              <div className="flex gap-3">
                <button
                  onClick={() => handleStatusChange(selectedSpot.id, 'Tersedia')}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedSpot.status === 'Tersedia'
                      ? 'border-green-600 bg-green-50 text-green-900'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  disabled={selectedSpot.vehicle !== undefined}
                >
                  Tersedia
                </button>
                <button
                  onClick={() => handleStatusChange(selectedSpot.id, 'Rusak')}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedSpot.status === 'Rusak'
                      ? 'border-yellow-600 bg-yellow-50 text-yellow-900'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Rusak
                </button>
              </div>
              {selectedSpot.vehicle && (
                <p className="text-red-600 mt-2">
                  * Tidak bisa mengubah status saat ada kendaraan parkir
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Status Sensor</label>
              <div className="flex gap-3">
                <button
                  onClick={() => handleSensorChange(selectedSpot.id, 'Normal')}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedSpot.sensorStatus === 'Normal'
                      ? 'border-green-600 bg-green-50 text-green-900'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CheckCircle2 className="inline mr-2" size={18} />
                  Normal
                </button>
                <button
                  onClick={() => handleSensorChange(selectedSpot.id, 'Error')}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedSpot.sensorStatus === 'Error'
                      ? 'border-red-600 bg-red-50 text-red-900'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <AlertCircle className="inline mr-2" size={18} />
                  Error
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedSpot(null)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-blue-900 mb-2">Informasi</h3>
        <ul className="text-blue-800 space-y-1 list-disc list-inside">
          <li>Klik pada slot untuk mengedit status</li>
          <li>Status slot tidak bisa diubah saat ada kendaraan parkir</li>
          <li>Sensor error akan ditandai dengan warna merah</li>
          <li>Slot rusak akan dinonaktifkan dari sistem parkir</li>
        </ul>
      </div>
    </div>
  );
}
