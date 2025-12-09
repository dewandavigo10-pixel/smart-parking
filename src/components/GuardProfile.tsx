import { useState } from 'react';
import { Guard } from '../App';
import { Users, Mail, Phone, Clock, Calendar, Shield, UserCircle } from 'lucide-react';

interface GuardProfileProps {
  guards: Guard[];
}

export function GuardProfile({ guards }: GuardProfileProps) {
  const [selectedGuard, setSelectedGuard] = useState<Guard | null>(guards[0] || null);

  const formatTanggal = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const hitungLamaKerja = (tanggalBergabung: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(tanggalBergabung).getTime();
    const bulan = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const tahun = Math.floor(bulan / 12);
    const sisaBulan = bulan % 12;
    
    if (tahun > 0) {
      return `${tahun} tahun ${sisaBulan} bulan`;
    }
    return `${bulan} bulan`;
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'Pagi':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Siang':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Malam':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getShiftTime = (shift: string) => {
    switch (shift) {
      case 'Pagi':
        return '06:00 - 14:00';
      case 'Siang':
        return '14:00 - 22:00';
      case 'Malam':
        return '22:00 - 06:00';
      default:
        return '-';
    }
  };

  if (!selectedGuard) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Users className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-600">Tidak ada data penjaga</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3">
          <Shield className="text-indigo-600" size={32} />
          <div>
            <h2 className="text-gray-900">Profil Penjaga Kos</h2>
            <p className="text-gray-600">Informasi petugas keamanan parkir</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Guard List Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-900 mb-4">Daftar Penjaga</h3>
            <div className="space-y-2">
              {guards.map(guard => (
                <button
                  key={guard.id}
                  onClick={() => setSelectedGuard(guard)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedGuard.id === guard.id
                      ? 'bg-indigo-100 border-2 border-indigo-600'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 p-2 rounded-full">
                      <UserCircle className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{guard.nama}</p>
                      <span className={`inline-block px-2 py-1 rounded border mt-1 ${getShiftColor(guard.shift)}`}>
                        Shift {guard.shift}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Shift Information */}
          <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <h3 className="text-gray-900 mb-3">Jadwal Shift</h3>
            <div className="space-y-2">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-900">Shift Pagi</p>
                <p className="text-yellow-700">06:00 - 14:00</p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-900">Shift Siang</p>
                <p className="text-orange-700">14:00 - 22:00</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-900">Shift Malam</p>
                <p className="text-blue-700">22:00 - 06:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Guard Detail */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-full">
                <UserCircle className="text-white" size={64} />
              </div>
              <div>
                <h2 className="text-gray-900">{selectedGuard.nama}</h2>
                <span className={`inline-block px-3 py-1 rounded border mt-2 ${getShiftColor(selectedGuard.shift)}`}>
                  Shift {selectedGuard.shift}
                </span>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Mail className="text-indigo-600 mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-gray-600">Email</p>
                  <p className="text-gray-900">{selectedGuard.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-indigo-600 mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-gray-600">Nomor Telepon</p>
                  <p className="text-gray-900">{selectedGuard.telepon}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-indigo-600 mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-gray-600">Jam Kerja</p>
                  <p className="text-gray-900">{getShiftTime(selectedGuard.shift)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="text-indigo-600 mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-gray-600">Tanggal Bergabung</p>
                  <p className="text-gray-900">{formatTanggal(selectedGuard.tanggalBergabung)}</p>
                  <p className="text-gray-500 mt-1">
                    ({hitungLamaKerja(selectedGuard.tanggalBergabung)} bekerja)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-900 mb-4">Tanggung Jawab</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-indigo-100 p-2 rounded">
                  <Shield className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="text-gray-900">Keamanan Area Parkir</p>
                  <p className="text-gray-600">Mengawasi keamanan kendaraan di area parkir</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-indigo-100 p-2 rounded">
                  <Users className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="text-gray-900">Pelayanan Penghuni</p>
                  <p className="text-gray-600">Membantu registrasi dan validasi kendaraan</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-indigo-100 p-2 rounded">
                  <Clock className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="text-gray-900">Monitoring 24/7</p>
                  <p className="text-gray-600">Mencatat keluar masuk kendaraan sesuai shift</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-900 mb-4">Statistik Kinerja Bulan Ini</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-green-900">145</p>
                <p className="text-green-700">Kendaraan Dilayani</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-blue-900">23</p>
                <p className="text-blue-700">Hari Hadir</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <p className="text-purple-900">0</p>
                <p className="text-purple-700">Komplain</p>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
            <h3 className="mb-4">Kontak Darurat</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Phone size={20} />
                <div>
                  <p className="text-white/80">Telepon</p>
                  <p>{selectedGuard.telepon}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} />
                <div>
                  <p className="text-white/80">Email</p>
                  <p>{selectedGuard.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Guards Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-gray-900 mb-4">Ringkasan Tim Penjaga</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700">Nama</th>
                <th className="text-left py-3 px-4 text-gray-700">Shift</th>
                <th className="text-left py-3 px-4 text-gray-700">Jam Kerja</th>
                <th className="text-left py-3 px-4 text-gray-700">Telepon</th>
                <th className="text-left py-3 px-4 text-gray-700">Lama Bekerja</th>
              </tr>
            </thead>
            <tbody>
              {guards.map(guard => (
                <tr key={guard.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{guard.nama}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded border ${getShiftColor(guard.shift)}`}>
                      {guard.shift}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{getShiftTime(guard.shift)}</td>
                  <td className="py-3 px-4 text-gray-700">{guard.telepon}</td>
                  <td className="py-3 px-4 text-gray-700">{hitungLamaKerja(guard.tanggalBergabung)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
