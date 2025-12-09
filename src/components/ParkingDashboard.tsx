import { ParkingSpot } from '../App';
import { Car, Bike, CheckCircle2, XCircle, LogOut, Wrench } from 'lucide-react';

interface ParkingDashboardProps {
  parkingSpots: ParkingSpot[];
  onRemoveVehicle: (spotId: string) => void;
}

export function ParkingDashboard({ parkingSpots, onRemoveVehicle }: ParkingDashboardProps) {
  const motorSpots = parkingSpots.filter(spot => spot.tipe === 'Motor');
  const mobilSpots = parkingSpots.filter(spot => spot.tipe === 'Mobil');

  const motorTersedia = motorSpots.filter(spot => spot.status === 'Tersedia').length;
  const mobilTersedia = mobilSpots.filter(spot => spot.status === 'Tersedia').length;

  const formatWaktu = (date: Date) => {
    return new Date(date).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const hitungDurasi = (waktuMasuk: Date) => {
    const now = new Date();
    const durasi = Math.floor((now.getTime() - new Date(waktuMasuk).getTime()) / 60000);
    const jam = Math.floor(durasi / 60);
    const menit = durasi % 60;
    return jam > 0 ? `${jam} jam ${menit} menit` : `${menit} menit`;
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Motor</p>
              <p className="text-indigo-900 mt-1">{motorSpots.length}</p>
            </div>
            <Bike className="text-indigo-600" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Motor Tersedia</p>
              <p className="text-green-600 mt-1">{motorTersedia}</p>
            </div>
            <CheckCircle2 className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Mobil</p>
              <p className="text-indigo-900 mt-1">{mobilSpots.length}</p>
            </div>
            <Car className="text-indigo-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Mobil Tersedia</p>
              <p className="text-green-600 mt-1">{mobilTersedia}</p>
            </div>
            <CheckCircle2 className="text-green-600" size={32} />
          </div>
        </div>
      </div>

      {/* Parking Spots - Motor */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bike className="text-indigo-600" size={24} />
          <h2 className="text-gray-900">Area Parkir Motor</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {motorSpots.map(spot => (
            <div
              key={spot.id}
              className={`border-2 rounded-lg p-4 transition-all ${
                spot.status === 'Tersedia'
                  ? 'border-green-300 bg-green-50'
                  : 'border-red-300 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-900">{spot.nomor}</span>
                {spot.status === 'Tersedia' ? (
                  <CheckCircle2 className="text-green-600" size={20} />
                ) : (
                  <XCircle className="text-red-600" size={20} />
                )}
              </div>
              {spot.vehicle && (
                <div className="space-y-1 pt-2 border-t border-gray-300">
                  <p className="text-gray-700 truncate">{spot.vehicle.platNomor}</p>
                  <p className="text-gray-600 truncate">{spot.vehicle.namaPemilik}</p>
                  <p className="text-gray-500">Kamar {spot.vehicle.nomorKamar}</p>
                  <p className="text-gray-500">{hitungDurasi(spot.vehicle.waktuMasuk)}</p>
                  <button
                    onClick={() => onRemoveVehicle(spot.id)}
                    className="w-full mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <LogOut size={16} />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Parking Spots - Mobil */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Car className="text-indigo-600" size={24} />
          <h2 className="text-gray-900">Area Parkir Mobil</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mobilSpots.map(spot => (
            <div
              key={spot.id}
              className={`border-2 rounded-lg p-4 transition-all ${
                spot.status === 'Tersedia'
                  ? 'border-green-300 bg-green-50'
                  : 'border-red-300 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-900">{spot.nomor}</span>
                {spot.status === 'Tersedia' ? (
                  <CheckCircle2 className="text-green-600" size={24} />
                ) : (
                  <XCircle className="text-red-600" size={24} />
                )}
              </div>
              {spot.vehicle && (
                <div className="space-y-1 pt-2 border-t border-gray-300">
                  <p className="text-gray-700">{spot.vehicle.platNomor}</p>
                  <p className="text-gray-600">{spot.vehicle.namaPemilik}</p>
                  <p className="text-gray-500">Kamar {spot.vehicle.nomorKamar}</p>
                  <p className="text-gray-500">Masuk: {formatWaktu(spot.vehicle.waktuMasuk)}</p>
                  <p className="text-gray-500">Durasi: {hitungDurasi(spot.vehicle.waktuMasuk)}</p>
                  <button
                    onClick={() => onRemoveVehicle(spot.id)}
                    className="w-full mt-2 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Keluar Parkir
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}