import { useState } from 'react';
import { ParkingDashboard } from './components/ParkingDashboard';
import { VehicleRegistration } from './components/VehicleRegistration';
import { ParkingHistory } from './components/ParkingHistory';
import { CustomerProfile } from './components/CustomerProfile';
import { AdminDashboard } from './components/AdminDashboard';
import { DailyReport } from './components/DailyReport';
import { SlotManagement } from './components/SlotManagement';
import { ActiveVehicleList } from './components/ActiveVehicleList';
import { QRValidation } from './components/QRValidation';
import { GuardProfile } from './components/GuardProfile';
import { 
  Car, 
  History, 
  Plus, 
  UserCircle, 
  Shield, 
  Users, 
  LogOut,
  BarChart3,
  FileText,
  Settings,
  List,
  QrCode
} from 'lucide-react';

export interface Vehicle {
  id: string;
  platNomor: string;
  jenisKendaraan: 'Motor' | 'Mobil';
  namaPemilik: string;
  nomorKamar: string;
  waktuMasuk: Date;
  customerId?: string;
  qrCode?: string;
}

export interface ParkingSpot {
  id: string;
  nomor: string;
  tipe: 'Motor' | 'Mobil';
  status: 'Tersedia' | 'Terisi' | 'Rusak';
  vehicle?: Vehicle;
  sensorStatus?: 'Normal' | 'Error';
}

export interface Customer {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  nomorKamar: string;
  tanggalMasuk: Date;
  foto?: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  pekerjaan: string;
  kendaraan: {
    platNomor: string;
    jenisKendaraan: 'Motor' | 'Mobil';
    merk: string;
    warna: string;
  }[];
}

export interface Guard {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  shift: 'Pagi' | 'Siang' | 'Malam';
  tanggalBergabung: Date;
  foto?: string;
}

export type UserRole = 'admin' | 'guard' | 'customer';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState<string>('admin-dashboard');
  
  const [guards] = useState<Guard[]>([
    {
      id: 'g1',
      nama: 'Budi Hartono',
      email: 'budi.hartono@parkir.id',
      telepon: '081234567890',
      shift: 'Pagi',
      tanggalBergabung: new Date('2024-01-15')
    },
    {
      id: 'g2',
      nama: 'Siti Rahayu',
      email: 'siti.rahayu@parkir.id',
      telepon: '081298765432',
      shift: 'Siang',
      tanggalBergabung: new Date('2024-03-20')
    },
    {
      id: 'g3',
      nama: 'Ahmad Yani',
      email: 'ahmad.yani@parkir.id',
      telepon: '081345678901',
      shift: 'Malam',
      tanggalBergabung: new Date('2024-06-10')
    }
  ]);
  
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 'c1',
      nama: 'Ahmad Pratama',
      email: 'ahmad.pratama@email.com',
      telepon: '081234567890',
      nomorKamar: 'A-101',
      tanggalMasuk: new Date('2025-01-15'),
      jenisKelamin: 'Laki-laki',
      pekerjaan: 'Mahasiswa',
      kendaraan: [
        { platNomor: 'B 1234 XYZ', jenisKendaraan: 'Motor', merk: 'Honda Beat', warna: 'Merah' }
      ]
    },
    {
      id: 'c2',
      nama: 'Siti Nurhaliza',
      email: 'siti.nur@email.com',
      telepon: '081298765432',
      nomorKamar: 'A-102',
      tanggalMasuk: new Date('2025-02-01'),
      jenisKelamin: 'Perempuan',
      pekerjaan: 'Karyawan Swasta',
      kendaraan: [
        { platNomor: 'B 5678 ABC', jenisKendaraan: 'Motor', merk: 'Yamaha Mio', warna: 'Putih' }
      ]
    },
    {
      id: 'c3',
      nama: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      telepon: '081345678901',
      nomorKamar: 'B-201',
      tanggalMasuk: new Date('2024-11-10'),
      jenisKelamin: 'Laki-laki',
      pekerjaan: 'Wiraswasta',
      kendaraan: [
        { platNomor: 'B 9012 DEF', jenisKendaraan: 'Motor', merk: 'Suzuki Nex', warna: 'Hitam' }
      ]
    },
    {
      id: 'c4',
      nama: 'Dewi Lestari',
      email: 'dewi.lestari@email.com',
      telepon: '081456789012',
      nomorKamar: 'B-203',
      tanggalMasuk: new Date('2025-03-05'),
      jenisKelamin: 'Perempuan',
      pekerjaan: 'Mahasiswa',
      kendaraan: [
        { platNomor: 'B 3456 GHI', jenisKendaraan: 'Motor', merk: 'Honda Vario', warna: 'Biru' }
      ]
    },
    {
      id: 'c5',
      nama: 'Eko Prasetyo',
      email: 'eko.prasetyo@email.com',
      telepon: '081567890123',
      nomorKamar: 'C-301',
      tanggalMasuk: new Date('2024-12-01'),
      jenisKelamin: 'Laki-laki',
      pekerjaan: 'Programmer',
      kendaraan: [
        { platNomor: 'B 7890 JKL', jenisKendaraan: 'Mobil', merk: 'Toyota Avanza', warna: 'Silver' }
      ]
    },
    {
      id: 'c6',
      nama: 'Fitri Handayani',
      email: 'fitri.h@email.com',
      telepon: '081678901234',
      nomorKamar: 'C-302',
      tanggalMasuk: new Date('2025-01-20'),
      jenisKelamin: 'Perempuan',
      pekerjaan: 'Desainer',
      kendaraan: [
        { platNomor: 'B 2345 MNO', jenisKendaraan: 'Mobil', merk: 'Honda Jazz', warna: 'Merah' }
      ]
    },
  ]);
  
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([
    // Spot Motor
    { id: '1', nomor: 'M1', tipe: 'Motor', status: 'Terisi', sensorStatus: 'Normal', vehicle: { id: 'v1', platNomor: 'B 1234 XYZ', jenisKendaraan: 'Motor', namaPemilik: 'Ahmad Pratama', nomorKamar: 'A-101', waktuMasuk: new Date('2025-12-03T08:00:00'), customerId: 'c1', qrCode: 'QR001' } },
    { id: '2', nomor: 'M2', tipe: 'Motor', status: 'Tersedia', sensorStatus: 'Normal' },
    { id: '3', nomor: 'M3', tipe: 'Motor', status: 'Terisi', sensorStatus: 'Normal', vehicle: { id: 'v2', platNomor: 'B 5678 ABC', jenisKendaraan: 'Motor', namaPemilik: 'Siti Nurhaliza', nomorKamar: 'A-102', waktuMasuk: new Date('2025-12-03T09:30:00'), customerId: 'c2', qrCode: 'QR002' } },
    { id: '4', nomor: 'M4', tipe: 'Motor', status: 'Tersedia', sensorStatus: 'Normal' },
    { id: '5', nomor: 'M5', tipe: 'Motor', status: 'Terisi', sensorStatus: 'Normal', vehicle: { id: 'v3', platNomor: 'B 9012 DEF', jenisKendaraan: 'Motor', namaPemilik: 'Budi Santoso', nomorKamar: 'B-201', waktuMasuk: new Date('2025-12-03T07:15:00'), customerId: 'c3', qrCode: 'QR003' } },
    { id: '6', nomor: 'M6', tipe: 'Motor', status: 'Tersedia', sensorStatus: 'Normal' },
    { id: '7', nomor: 'M7', tipe: 'Motor', status: 'Tersedia', sensorStatus: 'Error' },
    { id: '8', nomor: 'M8', tipe: 'Motor', status: 'Terisi', sensorStatus: 'Normal', vehicle: { id: 'v4', platNomor: 'B 3456 GHI', jenisKendaraan: 'Motor', namaPemilik: 'Dewi Lestari', nomorKamar: 'B-203', waktuMasuk: new Date('2025-12-03T10:00:00'), customerId: 'c4', qrCode: 'QR004' } },
    { id: '9', nomor: 'M9', tipe: 'Motor', status: 'Tersedia', sensorStatus: 'Normal' },
    { id: '10', nomor: 'M10', tipe: 'Motor', status: 'Tersedia', sensorStatus: 'Normal' },
    { id: '11', nomor: 'M11', tipe: 'Motor', status: 'Tersedia', sensorStatus: 'Normal' },
    { id: '12', nomor: 'M12', tipe: 'Motor', status: 'Rusak', sensorStatus: 'Error' },
    
    // Spot Mobil
    { id: '13', nomor: 'C1', tipe: 'Mobil', status: 'Terisi', sensorStatus: 'Normal', vehicle: { id: 'v5', platNomor: 'B 7890 JKL', jenisKendaraan: 'Mobil', namaPemilik: 'Eko Prasetyo', nomorKamar: 'C-301', waktuMasuk: new Date('2025-12-03T08:45:00'), customerId: 'c5', qrCode: 'QR005' } },
    { id: '14', nomor: 'C2', tipe: 'Mobil', status: 'Tersedia', sensorStatus: 'Normal' },
    { id: '15', nomor: 'C3', tipe: 'Mobil', status: 'Terisi', sensorStatus: 'Normal', vehicle: { id: 'v6', platNomor: 'B 2345 MNO', jenisKendaraan: 'Mobil', namaPemilik: 'Fitri Handayani', nomorKamar: 'C-302', waktuMasuk: new Date('2025-12-03T09:00:00'), customerId: 'c6', qrCode: 'QR006' } },
    { id: '16', nomor: 'C4', tipe: 'Mobil', status: 'Tersedia', sensorStatus: 'Normal' },
    { id: '17', nomor: 'C5', tipe: 'Mobil', status: 'Tersedia', sensorStatus: 'Normal' },
    { id: '18', nomor: 'C6', tipe: 'Mobil', status: 'Tersedia', sensorStatus: 'Normal' },
  ]);

  const [history, setHistory] = useState<Array<Vehicle & { waktuKeluar?: Date; durasi?: string }>>([
    { 
      id: 'h1', 
      platNomor: 'B 1111 ZZZ', 
      jenisKendaraan: 'Motor', 
      namaPemilik: 'Rudi Tabuti', 
      nomorKamar: 'A-105', 
      waktuMasuk: new Date('2025-12-02T14:00:00'),
      waktuKeluar: new Date('2025-12-02T18:30:00'),
      durasi: '4 jam 30 menit'
    },
    { 
      id: 'h2', 
      platNomor: 'B 2222 YYY', 
      jenisKendaraan: 'Mobil', 
      namaPemilik: 'Lisa Suriani', 
      nomorKamar: 'C-303', 
      waktuMasuk: new Date('2025-12-02T09:00:00'),
      waktuKeluar: new Date('2025-12-02T17:00:00'),
      durasi: '8 jam'
    },
    { 
      id: 'h3', 
      platNomor: 'B 4444 AAA', 
      jenisKendaraan: 'Motor', 
      namaPemilik: 'Joko Susilo', 
      nomorKamar: 'A-103', 
      waktuMasuk: new Date('2025-12-01T07:00:00'),
      waktuKeluar: new Date('2025-12-01T19:30:00'),
      durasi: '12 jam 30 menit'
    },
  ]);

  const handleRegisterVehicle = (vehicle: Omit<Vehicle, 'id' | 'waktuMasuk'>, spotId: string) => {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: `v${Date.now()}`,
      waktuMasuk: new Date(),
      qrCode: `QR${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    };

    setParkingSpots(spots =>
      spots.map(spot =>
        spot.id === spotId
          ? { ...spot, status: 'Terisi' as const, vehicle: newVehicle }
          : spot
      )
    );
  };

  const handleRemoveVehicle = (spotId: string) => {
    const spot = parkingSpots.find(s => s.id === spotId);
    if (spot?.vehicle) {
      const waktuKeluar = new Date();
      const durasi = Math.floor((waktuKeluar.getTime() - spot.vehicle.waktuMasuk.getTime()) / 60000);
      const jam = Math.floor(durasi / 60);
      const menit = durasi % 60;
      
      setHistory(prev => [
        {
          ...spot.vehicle!,
          waktuKeluar,
          durasi: jam > 0 ? `${jam} jam ${menit} menit` : `${menit} menit`
        },
        ...prev
      ]);
    }

    setParkingSpots(spots =>
      spots.map(spot =>
        spot.id === spotId
          ? { ...spot, status: 'Tersedia' as const, vehicle: undefined }
          : spot
      )
    );
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
  };

  const handleUpdateSpot = (updatedSpot: ParkingSpot) => {
    setParkingSpots(prev =>
      prev.map(spot =>
        spot.id === updatedSpot.id ? updatedSpot : spot
      )
    );
  };

  const renderContent = () => {
    // Admin Views
    if (userRole === 'admin') {
      switch (activeTab) {
        case 'admin-dashboard':
          return <AdminDashboard parkingSpots={parkingSpots} history={history} customers={customers} guards={guards} />;
        case 'daily-report':
          return <DailyReport parkingSpots={parkingSpots} history={history} />;
        case 'slot-management':
          return <SlotManagement parkingSpots={parkingSpots} onUpdateSpot={handleUpdateSpot} />;
        case 'active-vehicles':
          return <ActiveVehicleList parkingSpots={parkingSpots} customers={customers} />;
        case 'qr-validation':
          return <QRValidation parkingSpots={parkingSpots} onRemoveVehicle={handleRemoveVehicle} />;
        case 'guard-profile':
          return <GuardProfile guards={guards} />;
        default:
          return <AdminDashboard parkingSpots={parkingSpots} history={history} customers={customers} guards={guards} />;
      }
    }

    // Guard Views
    if (userRole === 'guard') {
      switch (activeTab) {
        case 'guard-dashboard':
          return <ParkingDashboard parkingSpots={parkingSpots} onRemoveVehicle={handleRemoveVehicle} />;
        case 'register':
          return <VehicleRegistration parkingSpots={parkingSpots} onRegister={handleRegisterVehicle} />;
        case 'qr-validation':
          return <QRValidation parkingSpots={parkingSpots} onRemoveVehicle={handleRemoveVehicle} />;
        case 'active-vehicles':
          return <ActiveVehicleList parkingSpots={parkingSpots} customers={customers} />;
        default:
          return <ParkingDashboard parkingSpots={parkingSpots} onRemoveVehicle={handleRemoveVehicle} />;
      }
    }

    // Customer Views
    switch (activeTab) {
      case 'dashboard':
        return <ParkingDashboard parkingSpots={parkingSpots} onRemoveVehicle={handleRemoveVehicle} />;
      case 'register':
        return <VehicleRegistration parkingSpots={parkingSpots} onRegister={handleRegisterVehicle} />;
      case 'history':
        return <ParkingHistory history={history} />;
      case 'profile':
        return <CustomerProfile customers={customers} parkingSpots={parkingSpots} history={history} onUpdateCustomer={handleUpdateCustomer} />;
      default:
        return <ParkingDashboard parkingSpots={parkingSpots} onRemoveVehicle={handleRemoveVehicle} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <Car className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-indigo-900">Smart Parkir.id</h1>
                <p className="text-gray-600">Sistem Parkir Pintar Kos-Kosan</p>
              </div>
            </div>
            
            {/* Role Switcher */}
            <div className="flex items-center gap-3">
              <select
                value={userRole}
                onChange={(e) => {
                  setUserRole(e.target.value as UserRole);
                  setActiveTab(
                    e.target.value === 'admin' ? 'admin-dashboard' :
                    e.target.value === 'guard' ? 'guard-dashboard' :
                    'dashboard'
                  );
                }}
                className="px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="admin">Admin</option>
                <option value="guard">Penjaga</option>
                <option value="customer">Customer</option>
              </select>
              
              {userRole === 'admin' && <Shield className="text-red-600" size={24} />}
              {userRole === 'guard' && <Users className="text-blue-600" size={24} />}
              {userRole === 'customer' && <UserCircle className="text-green-600" size={24} />}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-lg shadow-md p-2 flex gap-2 overflow-x-auto">
          {userRole === 'admin' && (
            <>
              <button
                onClick={() => setActiveTab('admin-dashboard')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'admin-dashboard'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BarChart3 size={20} />
                Dashboard Admin
              </button>
              <button
                onClick={() => setActiveTab('daily-report')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'daily-report'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText size={20} />
                Laporan Harian
              </button>
              <button
                onClick={() => setActiveTab('slot-management')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'slot-management'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings size={20} />
                Manajemen Slot & Sensor
              </button>
              <button
                onClick={() => setActiveTab('active-vehicles')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'active-vehicles'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <List size={20} />
                Daftar Kendaraan Aktif
              </button>
              <button
                onClick={() => setActiveTab('qr-validation')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'qr-validation'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <QrCode size={20} />
                Validasi QR Parkir
              </button>
              <button
                onClick={() => setActiveTab('guard-profile')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'guard-profile'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users size={20} />
                Profil Penjaga
              </button>
            </>
          )}

          {userRole === 'guard' && (
            <>
              <button
                onClick={() => setActiveTab('guard-dashboard')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'guard-dashboard'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Car size={20} />
                Dashboard Parkir
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'register'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Plus size={20} />
                Registrasi Kendaraan
              </button>
              <button
                onClick={() => setActiveTab('qr-validation')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'qr-validation'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <QrCode size={20} />
                Validasi QR
              </button>
              <button
                onClick={() => setActiveTab('active-vehicles')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'active-vehicles'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <List size={20} />
                Daftar Kendaraan
              </button>
            </>
          )}

          {userRole === 'customer' && (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'dashboard'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Car size={20} />
                Dashboard Parkir
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'register'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Plus size={20} />
                Registrasi Kendaraan
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'history'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <History size={20} />
                Riwayat Parkir
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <UserCircle size={20} />
                Profil Customer
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </div>
    </div>
  );
}
