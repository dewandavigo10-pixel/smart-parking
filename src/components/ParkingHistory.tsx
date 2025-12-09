import { Vehicle } from '../App';
import { Clock, Car, Bike, User, Home } from 'lucide-react';

interface ParkingHistoryProps {
  history: Array<Vehicle & { waktuKeluar?: Date; durasi?: string }>;
}

export function ParkingHistory({ history }: ParkingHistoryProps) {
  const formatWaktu = (date: Date) => {
    return new Date(date).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-gray-900 mb-6">Riwayat Parkir</h2>
      
      {history.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">Belum ada riwayat parkir</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((record) => (
            <div
              key={record.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    {record.jenisKendaraan === 'Motor' ? (
                      <Bike className="text-indigo-600" size={24} />
                    ) : (
                      <Car className="text-indigo-600" size={24} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-gray-900">{record.platNomor}</h3>
                      <span className={`px-2 py-1 rounded text-white ${
                        record.jenisKendaraan === 'Motor' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}>
                        {record.jenisKendaraan}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{record.namaPemilik}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Home size={16} />
                        <span>Kamar {record.nomorKamar}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <div>
                          <p>Masuk: {formatWaktu(record.waktuMasuk)}</p>
                          {record.waktuKeluar && (
                            <p>Keluar: {formatWaktu(record.waktuKeluar)}</p>
                          )}
                        </div>
                      </div>
                      
                      {record.durasi && (
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>Durasi: {record.durasi}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
