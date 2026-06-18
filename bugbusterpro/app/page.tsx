import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-sm"></div>
          <span className="text-xl font-bold text-gray-800">BugBuster Pro</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm text-gray-600 font-medium">
          <Link href="#" className="hover:text-blue-600">Layanan</Link>
          <Link href="#" className="hover:text-blue-600">Tentang Kami</Link>
          <Link href="#" className="hover:text-blue-600">Dukungan</Link>
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/login" className="font-semibold text-gray-700 hover:text-blue-600">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section (Gaya Banner Microsoft) */}
      <main className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#E6F0F9] rounded-sm overflow-hidden flex flex-col md:flex-row items-center py-16 px-10">
          
          {/* Teks Kiri */}
          <div className="md:w-1/2 z-10">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
              BugBuster Pro
            </h1>
            <p className="text-gray-700 text-lg mb-8 max-w-md">
              Wujudkan lingkungan yang nyaman, aman, dan bebas hama. Fokus pada apa yang penting, biarkan kami yang menangani sisanya.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/book" 
                className="bg-blue-600 text-white px-6 py-2.5 font-semibold rounded-sm hover:bg-blue-700 transition"
              >
                Pesan Sekarang
              </Link>
              <Link 
                href="/login" 
                className="bg-white text-blue-600 border border-blue-600 px-6 py-2.5 font-semibold rounded-sm hover:bg-blue-50 transition"
              >
                Login Sistem &gt;
              </Link>
            </div>
          </div>

          {/* Ilustrasi Kanan (Placeholder Kotak-kotak melayang bergaya Microsoft 365) */}
          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0 relative h-64">
             <div className="absolute top-10 right-20 w-16 h-16 bg-blue-500 rounded shadow-lg transform rotate-12 flex items-center justify-center text-white font-bold text-2xl">B</div>
             <div className="absolute top-32 right-40 w-20 h-20 bg-indigo-500 rounded shadow-lg transform -rotate-6 flex items-center justify-center text-white font-bold text-3xl">U</div>
             <div className="absolute top-20 right-64 w-14 h-14 bg-teal-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xl">G</div>
             <div className="absolute top-48 right-10 w-24 h-16 bg-green-500 rounded shadow-lg transform rotate-6 flex items-center justify-center text-white font-bold text-xl">S</div>
          </div>
        </div>

        {/* Quick Links / Icons Section */}
        <div className="flex justify-center gap-8 md:gap-16 mt-16 flex-wrap pb-16">
          <div className="flex flex-col items-center gap-2 cursor-pointer hover:underline decoration-blue-600 text-blue-600">
            <div className="w-8 h-8 bg-gray-200 rounded-sm"></div>
            <span className="text-sm font-semibold">Layanan Rayap</span>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer hover:underline decoration-blue-600 text-blue-600">
            <div className="w-8 h-8 bg-gray-800 rounded-sm"></div>
            <span className="text-sm font-semibold">Layanan Tikus</span>
          </div>
          <div className="flex flex-col items-center gap-2 cursor-pointer hover:underline decoration-blue-600 text-blue-600">
            <div className="w-8 h-8 bg-green-600 rounded-full"></div>
            <span className="text-sm font-semibold">Inspeksi Gratis</span>
          </div>
        </div>
      </main>
    </div>
  );
}