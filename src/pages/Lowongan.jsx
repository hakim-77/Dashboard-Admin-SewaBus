import React, { useEffect, useState } from "react";
import { lowonganAPI } from "../services/lowonganAPI"; // sesuaikan path dan API-nya
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function Lowongan() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editId, setEditId] = useState(null);
    const [lowongans, setLowongans] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);


    const [dataForm, setDataForm] = useState({
        title: "",
        location: "",
        type: "",
        description: "",
        image: "", // Jika Anda berencana menyimpan URL gambar
    });

    useEffect(() => {
        loadLowongans();
    }, []);

    const loadLowongans = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await lowonganAPI.fetchLowongan();
            setLowongans(data);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat lowongan");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDataForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            if (editId) {
                await lowonganAPI.updateLowongan(editId, dataForm);
                setSuccess("Lowongan berhasil diperbarui!");
            } else {
                await lowonganAPI.createLowongan(dataForm);
                setSuccess("Lowongan berhasil ditambahkan!");
            }

            await loadLowongans();
            setEditId(null);
            resetForm();

            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            console.error("Gagal submit:", err);
            setError(`Terjadi kesalahan: ${err.message || "Gagal mengirim data"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus lowongan ini?")) return;

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await lowonganAPI.deleteLowongan(id);
            await loadLowongans();
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setDataForm({
            title: item.title,
            location: item.location,
            type: item.type,
            description: item.description,
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
            title: "",
            location: "",
            type: "",
            description: "",
            image: "",
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-extrabold text-blue-800 mb-6 border-b pb-2 border-indigo-200">
                    {editId ? "Edit Lowongan Kerja" : "Tambah Lowongan Kerja"}
                </h2>
                <p className="text-gray-500">
                    {editId
                        ? "Ubah detail lowongan yang dipilih."
                        : "Isi form berikut untuk menambahkan lowongan baru"}
                </p>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-blue-100 transition-all">
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Judul Lowongan
                        </label>
                        <input
                            type="text"
                            name="title" // Ganti dari "posisi"
                            value={dataForm.title} // Ganti dari "posisi"
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Contoh: Frontend Developer"
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Lokasi
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={dataForm.location}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Contoh: Jakarta / Remote"
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Tipe Pekerjaan
                        </label>
                        <input
                            type="text"
                            name="type"
                            value={dataForm.type}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Contoh: Full-time / Internship"
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Deskripsi Pekerjaan
                        </label>
                        <textarea
                            name="description" // Ganti dari "deskripsi"
                            value={dataForm.description} // Ganti dari "deskripsi"
                            onChange={handleChange}
                            required
                            rows="3"
                            disabled={loading}
                            placeholder="Tuliskan deskripsi pekerjaan..."
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none transition"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            URL Gambar
                        </label>
                        <input
                            type="url" // Menggunakan type="url" untuk URL gambar
                            name="image"
                            value={dataForm.image}
                            onChange={handleChange}
                            placeholder="Contoh: https://example.com/logo.png"
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <p className="text-xs text-gray-500 mt-1">Opsional, masukkan URL gambar terkait lowongan.</p>
                    </div>



                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 font-semibold text-lg rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg hover:from-blue-600 hover:to-blue-800 transition"
                        >
                            {loading
                                ? "Mohon Tunggu..."
                                : editId
                                    ? "💾 Simpan Perubahan"
                                    : "➕ Tambah Lowongan"}
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

                {/* Table */}
                <div className="mt-12">
                    <div className="px-6 py-5 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-3xl shadow-inner">
                        <h3 className="text-xl font-bold text-blue-700 tracking-wide">
                            📋 Daftar Lowongan ({lowongans.length})
                        </h3>
                    </div>

                    {loading && <LoadingSpinner text="Memuat lowongan..." />}
                    {!loading && lowongans.length === 0 && (
                        <EmptyState
                            text={
                                error
                                    ? "Terjadi Kesalahan. Coba lagi nanti."
                                    : "Belum ada lowongan. Tambah lowongan pertama!"
                            }
                        />
                    )}

                    {!loading && lowongans.length > 0 && (
                        <div className="overflow-x-auto">
                            <GenericTable
                                columns={[
                                    "#",
                                    "Judul",
                                    "Lokasi",
                                    "Tipe",
                                    "Deskripsi",
                                    "Gambar",  // Tambahkan kolom ini
                                    "Aksi"
                                ]}
                                data={lowongans}
                                renderRow={(item, index) => (
                                    <>
                                        <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                                        <td className="px-6 py-4 text-blue-600 font-semibold">{item.title}</td> {/* Ganti dari item.posisi */}
                                        <td className="px-6 py-4">{item.location}</td> {/* BARU */}
                                        <td className="px-6 py-4">{item.type}</td>     {/* BARU */}
                                        {/* Anda bisa memilih untuk menampilkan deskripsi singkat atau tidak */}
                                        <td className="px-6 py-4 truncate max-w-[200px]">{item.description}</td>
                                        <td className="px-6 py-4">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-10 w-10 object-cover rounded"
                                                />
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        {/* Hapus td untuk Gaji, Tanggal Buka, Tanggal Tutup, Status */}
                                        {/* ... */}

                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-4">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                                                >
                                                    <MdEdit />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={loading}
                                                    title="Hapus lowongan"
                                                    className="hover:scale-110 transition-all"
                                                >
                                                    <AiFillDelete className="text-red-500 text-xl hover:text-red-700" />
                                                </button>
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        setSelectedItem(item);
                                                        document.getElementById("modal-detail").showModal();
                                                    }}
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
            </div>
            <dialog id="modal-detail" className="modal">
                <div className="modal-box max-w-xl">
                    <h3 className="font-bold text-2xl mb-4 text-blue-800">
                        Detail Lowongan
                    </h3>
                    {selectedItem ? (
                        <div className="space-y-3 text-gray-700">
                            <p><strong>Judul:</strong> {selectedItem.title}</p>
                            <p><strong>Lokasi:</strong> {selectedItem.location}</p>
                            <p><strong>Tipe:</strong> {selectedItem.type}</p>
                            <p><strong>Deskripsi:</strong> {selectedItem.description}</p>
                            {selectedItem.image && (
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    className="w-full max-h-60 object-contain border rounded-xl"
                                />
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-500">Tidak ada data untuk ditampilkan.</p>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Tutup</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
