import React, { useEffect, useState } from "react";
import { teamAPI } from "../services/teamAPI";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function Team() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);


  const [dataForm, setDataForm] = useState({
    name: "",
    position: "",
    image: "",
  });

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setLoading(true);
      const data = await teamAPI.fetchTeam();
      setTeams(data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data tim");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editId) {
        await teamAPI.updateTeam(editId, dataForm);
        setSuccess("Data tim berhasil diperbarui!");
      } else {
        await teamAPI.createTeam(dataForm);
        setSuccess("Data tim berhasil ditambahkan!");
      }

      await loadTeams();
      resetForm();
      setEditId(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus anggota tim ini?")) return;
    try {
      setLoading(true);
      await teamAPI.deleteTeam(id);
      await loadTeams();
    } catch (err) {
      setError("Gagal menghapus data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setDataForm({
      name: item.name,
      position: item.position,
      image: item.image,
    });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    resetForm();
    setEditId(null);
  };

  const resetForm = () => {
    setDataForm({
      name: "",
      position: "",
      image: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-6 border-b pb-2 border-indigo-200">
          {editId ? "Edit Anggota Tim" : "Tambah Anggota Tim"}
        </h2>
        <p className="text-gray-500">
          {editId ? "Ubah informasi tim." : "Isi form untuk menambahkan anggota tim."}
        </p>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 bg-white/90 p-8 rounded-3xl shadow-xl border">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
          <input
            type="text"
            name="name"
            value={dataForm.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Posisi</label>
          <input
            type="text"
            name="position"
            value={dataForm.position}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">URL Gambar</label>
          <input
            type="url"
            name="image"
            value={dataForm.image}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Opsional, gunakan URL gambar profil tim.</p>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-lg rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg hover:from-blue-600 hover:to-blue-800"
          >
            {loading ? "Menyimpan..." : editId ? "💾 Simpan Perubahan" : "➕ Tambah Anggota"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="w-full mt-3 text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Batal Edit
            </button>
          )}
        </div>
      </form>

      <div className="mt-12">
        <div className="px-6 py-5 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-3xl shadow-inner">
          <h3 className="text-xl font-bold text-blue-700 tracking-wide">
            👥 Daftar Tim ({teams.length})
          </h3>
        </div>

        {loading && <LoadingSpinner text="Memuat data tim..." />}
        {!loading && teams.length === 0 && (
          <EmptyState text={error ? "Terjadi kesalahan." : "Belum ada data tim."} />
        )}

        {!loading && teams.length > 0 && (
          <div className="overflow-x-auto">
            <GenericTable
              columns={["#", "Nama", "Posisi", "Gambar", "Aksi"]}
              data={teams}
              renderRow={(item, index) => (
                <>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-blue-700">{item.name}</td>
                  <td className="px-6 py-4">{item.position}</td>
                  <td className="px-6 py-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800">
                        <MdEdit />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                        <AiFillDelete />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          document.getElementById("modal-detail").showModal();
                        }}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Detail
                      </button>

                    </div>
                  </td>
                </>
              )}
            />
          </div>
        )}
      </div>
      <dialog id="modal-detail" className="modal">
        <div className="modal-box rounded-2xl">
          {selectedItem ? (
            <div>
              <h3 className="font-bold text-xl mb-4 text-blue-700">👤 Detail Anggota Tim</h3>
              <div className="mb-2">
                <strong>Nama:</strong> {selectedItem.name}
              </div>
              <div className="mb-2">
                <strong>Posisi:</strong> {selectedItem.position}
              </div>
              <div className="mb-4">
                <strong>Gambar:</strong><br />
                {selectedItem.image ? (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="mt-2 h-24 w-24 rounded-full object-cover border"
                  />
                ) : (
                  <span className="text-gray-500">Tidak ada gambar</span>
                )}
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-sm btn-outline">Tutup</button>
                </form>
              </div>
            </div>
          ) : (
            <p>Data tidak tersedia.</p>
          )}
        </div>
      </dialog>
    </div>
  );
}
