import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import teamData from "../JSON/Tim.json";

export default function DetailTim() {
  const { id } = useParams();
  const [anggota, setAnggota] = useState(null);

  useEffect(() => {
    const found = teamData.find((item) => item.id === parseInt(id));
    setAnggota(found);
  }, [id]);

  if (!anggota) {
    return (
      <div className="p-10 text-center text-gray-600">
        <p className="text-xl mb-4">❌ Anggota tidak ditemukan.</p>
        <Link
          to="/tim"
          className="inline-block mt-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-5 py-2 rounded-full shadow transition"
        >
          ← Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 mt-10 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-200 animate-fade-in">
      <div className="flex flex-col items-center">
        <img
          src={anggota.foto}
          alt={anggota.nama}
          className="w-40 h-40 rounded-full border-4 border-blue-300 shadow-lg hover:scale-105 transition-transform duration-300 object-cover"
        />
        <h2 className="text-3xl font-bold mt-6 text-blue-800">{anggota.nama}</h2>
        <p className="text-lg text-gray-600 mb-6">{anggota.jabatan}</p>

        <div className="w-full bg-white rounded-xl shadow p-4 border border-gray-200">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">📋 Detail Anggota</h3>
          <ul className="text-gray-700 space-y-2">
            <li><span className="font-medium">Nama:</span> {anggota.nama}</li>
            <li><span className="font-medium">Jabatan:</span> {anggota.jabatan}</li>
            {/* Tambah data lain di sini jika ada */}
          </ul>
        </div>

        <Link
          to="/tim"
          className="mt-6 inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition duration-300"
        >
          ← Kembali ke Daftar Tim
        </Link>
      </div>
    </div>
  );
}
