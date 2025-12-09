import { useState } from 'react';
import { Customer, ParkingSpot, Vehicle } from '../App';
import { 
  UserCircle, 
  Mail, 
  Phone, 
  Home, 
  Calendar, 
  Briefcase, 
  Car, 
  Edit2, 
  Save, 
  X,
  Users,
  Clock
} from 'lucide-react';

interface CustomerProfileProps {
  customers: Customer[];
  parkingSpots: ParkingSpot[];
  history: Array<Vehicle & { waktuKeluar?: Date; durasi?: string }>;
  onUpdateCustomer: (customer: Customer) => void;
}

export function CustomerProfile({ 
  customers, 
  parkingSpots, 
  history,
  onUpdateCustomer 
}: CustomerProfileProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(customers[0] || null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Customer | null>(null);

  const handleEdit = () => {
    setEditForm(selectedCustomer);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editForm) {
      onUpdateCustomer(editForm);
      setSelectedCustomer(editForm);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditForm(null);
    setIsEditing(false);
  };

  const formatTanggal = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCustomerParkingStatus = (customerId: string) => {
    const parkedVehicles = parkingSpots.filter(
      spot => spot.vehicle?.customerId === customerId && spot.status === 'Terisi'
    );
    return parkedVehicles;
  };

  const getCustomerHistory = (nomorKamar: string) => {
    return history.filter(h => h.nomorKamar === nomorKamar);
  };

  const hitungLamaTinggal = (tanggalMasuk: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(tanggalMasuk).getTime();
    const bulan = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    return bulan;
  };

  if (!selectedCustomer) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Users className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-600">Tidak ada data customer</p>
      </div>
    );
  }

  const parkedVehicles = getCustomerParkingStatus(selectedCustomer.id);
  const customerHistory = getCustomerHistory(selectedCustomer.nomorKamar);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Customer List Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-gray-900 mb-4">Daftar Penghuni</h3>
          <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
            {customers.map(customer => (
              <button
                key={customer.id}
                onClick={() => {
                  setSelectedCustomer(customer);
                  setIsEditing(false);
                }}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedCustomer.id === customer.id
                    ? 'bg-indigo-100 border-2 border-indigo-600'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-600 p-2 rounded-full">
                    <UserCircle className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{customer.nama}</p>
                    <p className="text-gray-600">Kamar {customer.nomorKamar}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Detail */}
      <div className="lg:col-span-2 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-full">
                <UserCircle className="text-white" size={48} />
              </div>
              <div>
                <h2 className="text-gray-900">{selectedCustomer.nama}</h2>
                <p className="text-gray-600">Penghuni Kamar {selectedCustomer.nomorKamar}</p>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Edit2 size={18} />
                Edit Profil
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save size={18} />
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X size={18} />
                  Batal
                </button>
              </div>
            )}
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3">
              <Mail className="text-indigo-600 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-gray-600">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm?.email || ''}
                    onChange={e => setEditForm({ ...editForm!, email: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900">{selectedCustomer.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-indigo-600 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-gray-600">Nomor Telepon</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm?.telepon || ''}
                    onChange={e => setEditForm({ ...editForm!, telepon: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900">{selectedCustomer.telepon}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Home className="text-indigo-600 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-gray-600">Nomor Kamar</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm?.nomorKamar || ''}
                    onChange={e => setEditForm({ ...editForm!, nomorKamar: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900">{selectedCustomer.nomorKamar}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="text-indigo-600 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-gray-600">Pekerjaan</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm?.pekerjaan || ''}
                    onChange={e => setEditForm({ ...editForm!, pekerjaan: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-900">{selectedCustomer.pekerjaan}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="text-indigo-600 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-gray-600">Tanggal Masuk</p>
                <p className="text-gray-900">{formatTanggal(selectedCustomer.tanggalMasuk)}</p>
                <p className="text-gray-500">
                  ({hitungLamaTinggal(selectedCustomer.tanggalMasuk)} bulan tinggal)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="text-indigo-600 mt-1" size={20} />
              <div className="flex-1">
                <p className="text-gray-600">Jenis Kelamin</p>
                <p className="text-gray-900">{selectedCustomer.jenisKelamin}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registered Vehicles */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Kendaraan Terdaftar</h3>
          {selectedCustomer.kendaraan.length === 0 ? (
            <p className="text-gray-600 text-center py-4">Belum ada kendaraan terdaftar</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCustomer.kendaraan.map((kendaraan, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <Car className="text-indigo-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{kendaraan.platNomor}</p>
                      <p className="text-gray-600">{kendaraan.merk}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {kendaraan.jenisKendaraan}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {kendaraan.warna}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Current Parking Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Status Parkir Saat Ini</h3>
          {parkedVehicles.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-700">Tidak ada kendaraan yang sedang parkir</p>
            </div>
          ) : (
            <div className="space-y-3">
              {parkedVehicles.map(spot => (
                <div
                  key={spot.id}
                  className="border-2 border-indigo-200 bg-indigo-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900">{spot.vehicle?.platNomor}</p>
                      <p className="text-gray-600">Spot: {spot.nomor}</p>
                      <p className="text-gray-500">
                        Masuk: {spot.vehicle && new Date(spot.vehicle.waktuMasuk).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-green-600 text-white rounded-lg">
                        Sedang Parkir
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Parking History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Riwayat Parkir</h3>
          {customerHistory.length === 0 ? (
            <p className="text-gray-600 text-center py-4">Belum ada riwayat parkir</p>
          ) : (
            <div className="space-y-3">
              {customerHistory.slice(0, 5).map(record => (
                <div
                  key={record.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="text-gray-500" size={20} />
                      <div>
                        <p className="text-gray-900">{record.platNomor}</p>
                        <p className="text-gray-600">
                          {new Date(record.waktuMasuk).toLocaleDateString('id-ID')}
                        </p>
                        {record.durasi && (
                          <p className="text-gray-500">Durasi: {record.durasi}</p>
                        )}
                      </div>
                    </div>
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
    </div>
  );
}
