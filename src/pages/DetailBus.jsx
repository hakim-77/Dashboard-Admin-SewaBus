import React from 'react';
import { Link, useParams } from 'react-router-dom';
import dataBus from "../JSON/databus.json";

export default function DetailBus() {
  const { id } = useParams();
  const bus = dataBus.find(item => item.id_layanan.toString() === id);

  if (!bus) {
    return (
      <div className="p-10 text-center text-red-500 font-bold text-2xl">
        🚫 Bus tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-xl rounded-2xl p-6">
        <img
          src={bus.url_gambar}
          alt={bus.tipe_bus}
          className="w-full rounded-2xl object-cover shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4 text-blue-600">{bus.tipe_bus}</h1>
          <p className="text-lg mb-2"><strong>🗺️ Rute:</strong> {bus.rute_perjalanan}</p>
          <p className="text-lg mb-2"><strong>🚌 Operator:</strong> {bus.operator_bus}</p>
          <p className="text-lg mb-2"><strong>💰 Harga:</strong> {bus.harga.mata_uang} {bus.harga.harga_tiket.toLocaleString()}</p>
          <p className="text-lg mb-2"><strong>🛋️ Kapasitas:</strong> {bus.kapasitas_tempat_duduk} kursi</p>
          <p className="text-lg mb-2"><strong>🎁 Fasilitas:</strong> 
            {bus.fasilitas.wifi && ' Wifi,'}
            {bus.fasilitas.ac && ' AC,'}
            {bus.fasilitas.toilet && ' Toilet'}
          </p>
          <p className="text-lg mb-2"><strong>🕒 Keberangkatan:</strong> {bus.jadwal.waktu_berangkat}</p>
          <p className="text-lg mb-2"><strong>🕓 Kedatangan:</strong> {bus.jadwal.waktu_tiba}</p>
          <Link
            to="/listbus"
            className="inline-block mt-6 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow"
          >
            ← Kembali ke Daftar Bus
          </Link>
        </div>
      </div>
    </div>
  );
}
