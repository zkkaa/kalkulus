export default function TopikLatihan() {
  return(
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Topik Latihan</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Tambah Topik</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Belum Selesai</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Selesai</button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            
          </div>
        </div>
      </div>
    </div>
  )
}