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

    const [dataForm, setDataForm] = useState({
        posisi: "",
        deskripsi: "",
        kualifikasi: "",
        gaji: "",
        tgl_buka: "",
        tgl_tutup: "",
        status: false,
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
            posisi: item.posisi,
            deskripsi: item.deskripsi,
            kualifikasi: item.kualifikasi,
            gaji: item.gaji,
            tgl_buka: item.tgl_buka,
            tgl_tutup: item.tgl_tutup,
            status: item.status,
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
            posisi: "",
            deskripsi: "",
            kualifikasi: "",
            gaji: "",
            tgl_buka: "",
            tgl_tutup: "",
            status: false,
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
                            Posisi
                        </label>
                        <input
                            type="text"
                            name="posisi"
                            value={dataForm.posisi}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Contoh: Frontend Developer"
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Gaji
                        </label>
                        <input
                            type="text"
                            name="gaji"
                            value={dataForm.gaji}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Contoh: Rp5.000.000"
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Deskripsi
                        </label>
                        <textarea
                            name="deskripsi"
                            value={dataForm.deskripsi}
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
                            Kualifikasi
                        </label>
                        <textarea
                            name="kualifikasi"
                            value={dataForm.kualifikasi}
                            onChange={handleChange}
                            required
                            rows="3"
                            disabled={loading}
                            placeholder="Tuliskan kualifikasi yang dibutuhkan..."
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Tanggal Buka
                        </label>
                        <input
                            type="date"
                            name="tgl_buka"
                            value={dataForm.tgl_buka}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Tanggal Tutup
                        </label>
                        <input
                            type="date"
                            name="tgl_tutup"
                            value={dataForm.tgl_tutup}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Status Aktif</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="status"
                                checked={dataForm.status}
                                onChange={handleChange}
                                disabled={loading}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
                        </label>
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
                                    "Posisi",
                                    "Gaji",
                                    "Tanggal Buka",
                                    "Tanggal Tutup",
                                    "Status",
                                    "Aksi",
                                ]}
                                data={lowongans}
                                renderRow={(item, index) => (
                                    <>
                                        <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                                        <td className="px-6 py-4 text-blue-600 font-semibold">{item.posisi}</td>
                                        <td className="px-6 py-4">{item.gaji}</td>
                                        <td className="px-6 py-4">{item.tgl_buka}</td>
                                        <td className="px-6 py-4">{item.tgl_tutup}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full font-medium ${item.status
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {item.status ? "✅ Aktif" : "❌ Nonaktif"}
                                            </span>
                                        </td>
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
                                            </div>
                                        </td>
                                    </>
                                )}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
