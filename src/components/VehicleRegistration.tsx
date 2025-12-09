import { useState } from 'react';
import { ParkingSpot, Vehicle } from '../App';
import { Car, Bike, CheckCircle2 } from 'lucide-react';

interface VehicleRegistrationProps {
  parkingSpots: ParkingSpot[];
  onRegister: (vehicle: Omit<Vehicle, 'id' | 'waktuMasuk'>, spotId: string) => void;
}

export function VehicleRegistration({ parkingSpots, onRegister }: VehicleRegistrationProps) {
  const [formData, setFormData] = useState({
    platNomor: '',
    jenisKendaraan: 'Motor' as 'Motor' | 'Mobil',
    namaPemilik: '',
    nomorKamar: '',
  });

  const [selectedSpot, setSelectedSpot] = useState<string>('');

  const availableSpots = parkingSpots.filter(
    spot => spot.status === 'Tersedia' && spot.tipe === formData.jenisKendaraan
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpot) {
      alert('Silakan pilih spot parkir terlebih dahulu');
      return;
    }
    
    onRegister(formData, selectedSpot);
    
    // Reset form
    setFormData({
      platNomor: '',
      jenisKendaraan: 'Motor',
      namaPemilik: '',
      nomorKamar: '',
    });
    setSelectedSpot('');
    
    alert('Kendaraan berhasil terdaftar!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-gray-900 mb-6">Registrasi Kendaraan Baru</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Nomor Plat Kendaraan
              </label>
              <input
                type="text"
                required
                value={formData.platNomor}
                onChange={e => setFormData({ ...formData, platNomor: e.target.value })}
                placeholder="Contoh: B 1234 XYZ"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Jenis Kendaraan
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Motor"
                    checked={formData.jenisKendaraan === 'Motor'}
                    onChange={e => {
                      setFormData({ ...formData, jenisKendaraan: 'Motor' });
                      setSelectedSpot('');
                    }}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <Bike size={20} className="text-gray-700" />
                  <span className="text-gray-700">Motor</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Mobil"
                    checked={formData.jenisKendaraan === 'Mobil'}
                    onChange={e => {
                      setFormData({ ...formData, jenisKendaraan: 'Mobil' });
                      setSelectedSpot('');
                    }}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <Car size={20} className="text-gray-700" />
                  <span className="text-gray-700">Mobil</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Nama Pemilik
              </label>
              <input
                type="text"
                required
                value={formData.namaPemilik}
                onChange={e => setFormData({ ...formData, namaPemilik: e.target.value })}
                placeholder="Nama lengkap"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Nomor Kamar
              </label>
              <input
                type="text"
                required
                value={formData.nomorKamar}
                onChange={e => setFormData({ ...formData, nomorKamar: e.target.value })}
                placeholder="Contoh: A-101"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Parking Spot Selection */}
          <div>
            <label className="block text-gray-700 mb-3">
              Pilih Spot Parkir yang Tersedia ({availableSpots.length} tersedia)
            </label>
            
            {availableSpots.length === 0 ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-700">
                  Maaf, tidak ada spot parkir {formData.jenisKendaraan.toLowerCase()} yang tersedia saat ini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {availableSpots.map(spot => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setSelectedSpot(spot.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedSpot === spot.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-green-300 bg-green-50 hover:border-green-500'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-gray-900">{spot.nomor}</span>
                      {selectedSpot === spot.id && (
                        <CheckCircle2 className="text-indigo-600" size={20} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={availableSpots.length === 0}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Daftarkan Kendaraan
            </button>
          </div>
        </form>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-blue-900 mb-2">Informasi</h3>
        <ul className="text-blue-800 space-y-1 list-disc list-inside">
          <li>Pastikan nomor plat kendaraan sudah benar</li>
          <li>Pilih spot parkir yang sesuai dengan jenis kendaraan</li>
          <li>Sistem akan mencatat waktu masuk secara otomatis</li>
          <li>Untuk mengeluarkan kendaraan, klik tombol "Keluar" pada dashboard</li>
        </ul>
      </div>
    </div>
  );
}
