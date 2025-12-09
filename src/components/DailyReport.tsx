import { useState } from 'react';
import { ParkingSpot, Vehicle } from '../App';
import { FileText, Download, Calendar, TrendingUp, Clock, Car, Bike } from 'lucide-react';

interface DailyReportProps {
  parkingSpots: ParkingSpot[];
  history: Array<Vehicle & { waktuKeluar?: Date; durasi?: string }>;
}

export function DailyReport({ parkingSpots, history }: DailyReportProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const filterByDate = (date: string) => {
    return history.filter(h => {
      const historyDate = new Date(h.waktuKeluar || h.waktuMasuk);
      return historyDate.toISOString().split('T')[0] === date;
    });
  };

  const dailyHistory = filterByDate(selectedDate);
  const motorCount = dailyHistory.filter(h => h.jenisKendaraan === 'Motor').length;
  const mobilCount = dailyHistory.filter(h => h.jenisKendaraan === 'Mobil').length;

  const calculateAverageDuration = () => {
    if (dailyHistory.length === 0) return '0 jam';
    const totalMinutes = dailyHistory.reduce((acc, h) => {
      if (!h.waktuKeluar) return acc;
      const durasi = Math.floor((new Date(h.waktuKeluar).getTime() - new Date(h.waktuMasuk).getTime()) / 60000);
      return acc + durasi;
    }, 0);
    const avgMinutes = totalMinutes / dailyHistory.length;
    const jam = Math.floor(avgMinutes / 60);
    const menit = Math.floor(avgMinutes % 60);
    return `${jam} jam ${menit} menit`;
  };

  const currentOccupancy = parkingSpots.filter(s => s.status === 'Terisi').length;
  const totalSpots = parkingSpots.length;
  const occupancyRate = ((currentOccupancy / totalSpots) * 100).toFixed(1);

  const handleDownloadReport = () => {
    alert('Fitur download laporan akan segera tersedia dalam format PDF/Excel');
  };

  const formatTanggal = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-indigo-600" size={32} />
            <div>
              <h2 className="text-gray-900">Laporan Harian Parkir</h2>
              <p className="text-gray-600">Rekap aktivitas parkir per hari</p>
            </div>
          </div>
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Download size={20} />
            Download Laporan
          </button>
        </div>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="text-indigo-600" size={24} />
          <h3 className="text-gray-900">Pilih Tanggal</h3>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-gray-700">{formatTanggal(selectedDate)}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Kendaraan</p>
              <p className="text-indigo-900 mt-1">{dailyHistory.length}</p>
            </div>
            <Car className="text-indigo-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Motor</p>
              <p className="text-blue-600 mt-1">{motorCount}</p>
            </div>
            <Bike className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Mobil</p>
              <p className="text-purple-600 mt-1">{mobilCount}</p>
            </div>
            <Car className="text-purple-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Okupansi Saat Ini</p>
              <p className="text-green-600 mt-1">{occupancyRate}%</p>
            </div>
            <TrendingUp className="text-green-600" size={32} />
          </div>
        </div>
      </div>

      {/* Average Duration */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Clock size={24} />
          <h3>Rata-rata Durasi Parkir</h3>
        </div>
        <p className="text-white/90">
          {calculateAverageDuration()}
        </p>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-gray-900 mb-4">Detail Aktivitas Parkir</h3>
        
        {dailyHistory.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">Tidak ada data untuk tanggal {formatTanggal(selectedDate)}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">No</th>
                  <th className="text-left py-3 px-4 text-gray-700">Plat Nomor</th>
                  <th className="text-left py-3 px-4 text-gray-700">Nama</th>
                  <th className="text-left py-3 px-4 text-gray-700">Kamar</th>
                  <th className="text-left py-3 px-4 text-gray-700">Jenis</th>
                  <th className="text-left py-3 px-4 text-gray-700">Waktu Masuk</th>
                  <th className="text-left py-3 px-4 text-gray-700">Waktu Keluar</th>
                  <th className="text-left py-3 px-4 text-gray-700">Durasi</th>
                </tr>
              </thead>
              <tbody>
                {dailyHistory.map((record, index) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-900">{record.platNomor}</td>
                    <td className="py-3 px-4 text-gray-700">{record.namaPemilik}</td>
                    <td className="py-3 px-4 text-gray-700">{record.nomorKamar}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-white ${
                        record.jenisKendaraan === 'Motor' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}>
                        {record.jenisKendaraan}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(record.waktuMasuk).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {record.waktuKeluar 
                        ? new Date(record.waktuKeluar).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : '-'
                      }
                    </td>
                    <td className="py-3 px-4 text-gray-700">{record.durasi || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-gray-900 mb-4">Ringkasan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-700">Total Motor</p>
            <p className="text-blue-900 mt-1">{motorCount} kendaraan</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-purple-700">Total Mobil</p>
            <p className="text-purple-900 mt-1">{mobilCount} kendaraan</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-indigo-700">Total Keseluruhan</p>
            <p className="text-indigo-900 mt-1">{dailyHistory.length} kendaraan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
