import { useState } from 'react';
import { ParkingSpot, Customer } from '../App';
import { List, Search, Car, Bike, Clock, User, Home, Phone } from 'lucide-react';

interface ActiveVehicleListProps {
  parkingSpots: ParkingSpot[];
  customers: Customer[];
}

export function ActiveVehicleList({ parkingSpots, customers }: ActiveVehicleListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'Semua' | 'Motor' | 'Mobil'>('Semua');

  const activeVehicles = parkingSpots.filter(spot => spot.status === 'Terisi' && spot.vehicle);

  const filteredVehicles = activeVehicles.filter(spot => {
    const vehicle = spot.vehicle!;
    const typeMatch = filterType === 'Semua' || vehicle.jenisKendaraan === filterType;
    const searchMatch = 
      vehicle.platNomor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.namaPemilik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.nomorKamar.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && searchMatch;
  });

  const getCustomerInfo = (customerId?: string) => {
    if (!customerId) return null;
    return customers.find(c => c.id === customerId);
  };

  const hitungDurasi = (waktuMasuk: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(waktuMasuk).getTime();
    const jam = Math.floor(diff / (1000 * 60 * 60));
    const menit = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${jam} jam ${menit} menit`;
  };

  const formatWaktu = (date: Date) => {
    return new Date(date).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3">
          <List className="text-indigo-600" size={32} />
          <div>
            <h2 className="text-gray-900">Daftar Kendaraan Aktif</h2>
            <p className="text-gray-600">
              {activeVehicles.length} kendaraan sedang parkir
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Cari Kendaraan</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari plat nomor, nama, atau kamar..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Filter Jenis</label>
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Aktif</p>
              <p className="text-indigo-900 mt-1">{activeVehicles.length}</p>
            </div>
            <Car className="text-indigo-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Motor Aktif</p>
              <p className="text-blue-600 mt-1">
                {activeVehicles.filter(s => s.vehicle?.jenisKendaraan === 'Motor').length}
              </p>
            </div>
            <Bike className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Mobil Aktif</p>
              <p className="text-purple-600 mt-1">
                {activeVehicles.filter(s => s.vehicle?.jenisKendaraan === 'Mobil').length}
              </p>
            </div>
            <Car className="text-purple-600" size={32} />
          </div>
        </div>
      </div>

      {/* Vehicle List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-gray-900 mb-4">
          Daftar Kendaraan ({filteredVehicles.length} dari {activeVehicles.length})
        </h3>
        
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12">
            <Car className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">
              {searchQuery ? 'Tidak ada kendaraan yang sesuai pencarian' : 'Tidak ada kendaraan aktif'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredVehicles.map(spot => {
              const vehicle = spot.vehicle!;
              const customer = getCustomerInfo(vehicle.customerId);
              
              return (
                <div
                  key={spot.id}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Vehicle Info */}
                    <div className="flex items-start gap-3">
                      <div className="bg-indigo-100 p-3 rounded-lg">
                        {vehicle.jenisKendaraan === 'Motor' ? (
                          <Bike className="text-indigo-600" size={24} />
                        ) : (
                          <Car className="text-indigo-600" size={24} />
                        )}
                      </div>
                      <div>
                        <p className="text-gray-900">{vehicle.platNomor}</p>
                        <span className={`inline-block px-2 py-1 rounded text-white mt-1 ${
                          vehicle.jenisKendaraan === 'Motor' ? 'bg-blue-500' : 'bg-purple-500'
                        }`}>
                          {vehicle.jenisKendaraan}
                        </span>
                        <p className="text-gray-600 mt-2">Spot: {spot.nomor}</p>
                        {vehicle.qrCode && (
                          <p className="text-gray-500">QR: {vehicle.qrCode}</p>
                        )}
                      </div>
                    </div>

                    {/* Owner Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <User size={18} className="text-gray-500" />
                        <span>{vehicle.namaPemilik}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Home size={18} className="text-gray-500" />
                        <span>Kamar {vehicle.nomorKamar}</span>
                      </div>
                      {customer && (
                        <>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Phone size={18} className="text-gray-500" />
                            <span>{customer.telepon}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Time Info */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-gray-700">
                        <Clock size={18} className="text-gray-500 mt-1" />
                        <div>
                          <p>Masuk: {formatWaktu(vehicle.waktuMasuk)}</p>
                          <p className="text-indigo-600 mt-1">
                            Durasi: {hitungDurasi(vehicle.waktuMasuk)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Customer Info */}
                  {customer && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="text-gray-700">{customer.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Pekerjaan</p>
                          <p className="text-gray-700">{customer.pekerjaan}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Jenis Kelamin</p>
                          <p className="text-gray-700">{customer.jenisKelamin}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Kendaraan Terdaftar</p>
                          <p className="text-gray-700">{customer.kendaraan.length} unit</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Export Button */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <button
          onClick={() => alert('Fitur export data akan segera tersedia dalam format CSV/Excel')}
          className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Export Data ke Excel
        </button>
      </div>
    </div>
  );
}
