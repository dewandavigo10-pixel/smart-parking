import { useState } from 'react';
import { ParkingSpot } from '../App';
import { QrCode, CheckCircle, XCircle, Scan, Car, Bike, Clock, User, Home } from 'lucide-react';

interface QRValidationProps {
  parkingSpots: ParkingSpot[];
  onRemoveVehicle: (spotId: string) => void;
}

export function QRValidation({ parkingSpots, onRemoveVehicle }: QRValidationProps) {
  const [qrInput, setQrInput] = useState('');
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    message: string;
    spot?: ParkingSpot;
  } | null>(null);

  const handleScan = () => {
    if (!qrInput.trim()) {
      setValidationResult({
        success: false,
        message: 'Silakan masukkan kode QR'
      });
      return;
    }

    const foundSpot = parkingSpots.find(
      spot => spot.vehicle?.qrCode === qrInput.trim()
    );

    if (foundSpot) {
      setValidationResult({
        success: true,
        message: 'QR Code Valid! Kendaraan ditemukan.',
        spot: foundSpot
      });
    } else {
      setValidationResult({
        success: false,
        message: 'QR Code tidak valid atau kendaraan tidak ditemukan'
      });
    }
  };

  const handleExitVehicle = () => {
    if (validationResult?.spot) {
      onRemoveVehicle(validationResult.spot.id);
      setValidationResult({
        success: true,
        message: 'Kendaraan berhasil keluar dari parkir'
      });
      setQrInput('');
      
      setTimeout(() => {
        setValidationResult(null);
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScan();
    }
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
          <QrCode className="text-indigo-600" size={32} />
          <div>
            <h2 className="text-gray-900">Validasi QR Parkir</h2>
            <p className="text-gray-600">Scan QR Code untuk validasi kendaraan keluar</p>
          </div>
        </div>
      </div>

      {/* Scanner Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="max-w-2xl mx-auto">
          {/* QR Scanner Simulation */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-8 mb-6">
            <div className="bg-white rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <Scan className="mx-auto text-indigo-600 mb-4" size={64} />
                <p className="text-gray-700">Scan QR Code di sini</p>
                <p className="text-gray-500">atau masukkan kode manual</p>
              </div>
            </div>
          </div>

          {/* Manual Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Masukkan Kode QR</label>
              <input
                type="text"
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="Contoh: QR001"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
              />
            </div>
            
            <button
              onClick={handleScan}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Scan size={20} />
              Validasi QR Code
            </button>
          </div>
        </div>
      </div>

      {/* Validation Result */}
      {validationResult && (
        <div className={`rounded-lg shadow-md p-6 ${
          validationResult.success ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
        }`}>
          <div className="flex items-start gap-3">
            {validationResult.success ? (
              <CheckCircle className="text-green-600 mt-1" size={32} />
            ) : (
              <XCircle className="text-red-600 mt-1" size={32} />
            )}
            <div className="flex-1">
              <h3 className={validationResult.success ? 'text-green-900' : 'text-red-900'}>
                {validationResult.success ? 'Validasi Berhasil' : 'Validasi Gagal'}
              </h3>
              <p className={`mt-1 ${validationResult.success ? 'text-green-700' : 'text-red-700'}`}>
                {validationResult.message}
              </p>

              {validationResult.spot?.vehicle && (
                <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="text-gray-900 mb-3">Informasi Kendaraan</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {validationResult.spot.vehicle.jenisKendaraan === 'Motor' ? (
                          <Bike className="text-indigo-600" size={24} />
                        ) : (
                          <Car className="text-indigo-600" size={24} />
                        )}
                        <div>
                          <p className="text-gray-600">Plat Nomor</p>
                          <p className="text-gray-900">{validationResult.spot.vehicle.platNomor}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <User className="text-gray-500" size={24} />
                        <div>
                          <p className="text-gray-600">Nama Pemilik</p>
                          <p className="text-gray-900">{validationResult.spot.vehicle.namaPemilik}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Home className="text-gray-500" size={24} />
                        <div>
                          <p className="text-gray-600">Nomor Kamar</p>
                          <p className="text-gray-900">{validationResult.spot.vehicle.nomorKamar}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-600">Spot Parkir</p>
                        <p className="text-gray-900">{validationResult.spot.nomor}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-600">Jenis Kendaraan</p>
                        <span className={`inline-block px-3 py-1 rounded text-white ${
                          validationResult.spot.vehicle.jenisKendaraan === 'Motor' ? 'bg-blue-500' : 'bg-purple-500'
                        }`}>
                          {validationResult.spot.vehicle.jenisKendaraan}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="text-gray-500 mt-1" size={20} />
                        <div>
                          <p className="text-gray-600">Waktu Masuk</p>
                          <p className="text-gray-900">{formatWaktu(validationResult.spot.vehicle.waktuMasuk)}</p>
                          <p className="text-indigo-600 mt-1">
                            Durasi: {hitungDurasi(validationResult.spot.vehicle.waktuMasuk)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleExitVehicle}
                    className="w-full mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={20} />
                    Konfirmasi Kendaraan Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Access QR Codes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-gray-900 mb-4">Kendaraan Aktif (Klik untuk validasi)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {parkingSpots
            .filter(spot => spot.vehicle?.qrCode)
            .map(spot => (
              <button
                key={spot.id}
                onClick={() => {
                  setQrInput(spot.vehicle!.qrCode!);
                  setValidationResult(null);
                }}
                className="p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <QrCode className="mx-auto text-indigo-600 mb-2" size={32} />
                <p className="text-gray-900">{spot.vehicle!.qrCode}</p>
                <p className="text-gray-600">{spot.nomor}</p>
                <p className="text-gray-500">{spot.vehicle!.platNomor}</p>
              </button>
            ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-blue-900 mb-2">Cara Penggunaan</h3>
        <ol className="text-blue-800 space-y-1 list-decimal list-inside">
          <li>Minta penghuni untuk menunjukkan QR Code parkir</li>
          <li>Scan QR Code atau masukkan kode manual</li>
          <li>Sistem akan menampilkan informasi kendaraan</li>
          <li>Konfirmasi kendaraan keluar jika data sudah sesuai</li>
          <li>Sistem akan otomatis mencatat waktu keluar dan durasi parkir</li>
        </ol>
      </div>
    </div>
  );
}
