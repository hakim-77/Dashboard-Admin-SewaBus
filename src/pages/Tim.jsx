import { useEffect, useState } from "react";
import dataAwal from "../JSON/tim.json";

export default function Tim() {
  const [tim, setTim] = useState([]);
  const [form, setForm] = useState({ id: null, nama: "", jabatan: "", foto: "" });
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTim(dataAwal);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setTim(tim.map((item) => (item.id === form.id ? form : item)));
      setEditMode(false);
    } else {
      const newData = { ...form, id: Date.now() };
      setTim([...tim, newData]);
    }
    setForm({ id: null, nama: "", jabatan: "", foto: "" });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    setTim(tim.filter((item) => item.id !== id));
  };

  const filteredTim = tim.filter((item) =>
    (item.nama + " " + item.jabatan).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Daftar Tim Karyawan</h2>

      {/* Input Pencarian */}
      <input
        type="text"
        placeholder="Cari berdasarkan nama atau jabatan..."
        className="w-full mb-6 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Form Tambah/Edit */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 mb-10 space-y-4 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama"
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="jabatan"
            value={form.jabatan}
            onChange={handleChange}
            placeholder="Jabatan"
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleChange}
            placeholder="Link Foto"
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow"
        >
          {editMode ? "💾 Simpan Perubahan" : "➕ Tambah Anggota"}
        </button>
      </form>

      {/* List Tim */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredTim.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md transition hover:shadow-xl"
          >
            <img
              src={item.foto}
              alt={item.nama}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-200"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.nama}</h3>
              <p className="text-sm text-gray-500">{item.jabatan}</p>
            </div>
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => handleEdit(item)}
                className="text-yellow-600 hover:text-yellow-800 font-medium"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                🗑️ Hapus
              </button>
            </div>
          </div>
        ))}
        {filteredTim.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">Data tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}
