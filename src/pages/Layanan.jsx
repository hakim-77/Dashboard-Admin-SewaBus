import React, { useEffect, useState } from "react";
import { layananAPI } from "../services/layananAPI";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function Layanan() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editId, setEditId] = useState(null);
    const [layanans, setLayanans] = useState([]);

    const [dataForm, setDataForm] = useState({
        nama_layanan: "",
        tipe_bus: "",
        deskripsi: "",
        status: false,
    });

    useEffect(() => {
        loadLayanans();
    }, []);

    const loadLayanans = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await layananAPI.fetchLayanan();
            setLayanans(data);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat catatan");
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
                await layananAPI.updateLayanan(editId, dataForm);
                setSuccess("Layanan berhasil diperbarui!");
            } else {
                await layananAPI.createLayanan(dataForm);
                setSuccess("Layanan berhasil ditambahkan!");
            }

            await loadLayanans();
            setEditId(null);
            resetForm();

            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            console.error("Gagal submit:", err);
            setError(
                `Terjadi kesalahan: ${err.message || "Gagal mengirim data"}`
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus catatan ini?")) return;

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await layananAPI.deleteLayanan(id);
            await loadLayanans();
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setDataForm({
            nama_layanan: item.nama_layanan,
            tipe_bus: item.tipe_bus,
            deskripsi: item.deskripsi,
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
            nama_layanan: "",
            tipe_bus: "",
            deskripsi: "",
            status: false,
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-extrabold text-blue-800 mb-6 border-b pb-2 border-indigo-200">
                    {editId ? "Edit Layanan Bus" : "Tambah Layanan Bus"}
                </h2>
                <p className="text-gray-500">
                    {editId
                        ? "Ubah detail layanan yang dipilih."
                        : "Isi form berikut untuk menambahkan layanan baru"}
                </p>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-blue-100 transition-all">
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Nama Layanan
                        </label>
                        <input
                            type="text"
                            name="nama_layanan"
                            value={dataForm.nama_layanan}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Contoh: Eksekutif Pagi"
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Tipe Bus
                        </label>
                        <input
                            type="text"
                            name="tipe_bus"
                            value={dataForm.tipe_bus}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Mini, Medium, atau Big Bus"
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
                            rows="4"
                            disabled={loading}
                            placeholder="Tuliskan detail layanan..."
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none transition"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">
                            Status Aktif
                        </span>
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
                                    : "➕ Tambah Layanan"}
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
                            📋 Daftar Layanan ({layanans.length})
                        </h3>
                    </div>

                    {loading && <LoadingSpinner text="Memuat catatan..." />}
                    {!loading && layanans.length === 0 && (
                        <EmptyState
                            text={
                                error
                                    ? "Terjadi Kesalahan. Coba lagi nanti."
                                    : "Belum ada catatan. Tambah catatan pertama!"
                            }
                        />
                    )}

                    {!loading && layanans.length > 0 && (
                        <div className="overflow-x-auto">
                            <GenericTable
                                columns={[
                                    "#",
                                    "Nama Layanan",
                                    "Tipe Bus",
                                    "Deskripsi",
                                    "Status",
                                    "Aksi",
                                ]}
                                data={layanans}
                                renderRow={(item, index) => (
                                    <>
                                        <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                                        <td className="px-6 py-4 text-blue-600 font-semibold">
                                            {item.nama_layanan}
                                        </td>
                                        <td className="px-6 py-4">{item.tipe_bus}</td>
                                        <td className="px-6 py-4 max-w-xs truncate">
                                            {item.deskripsi}
                                        </td>
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
                                                    title="Hapus layanan"
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
