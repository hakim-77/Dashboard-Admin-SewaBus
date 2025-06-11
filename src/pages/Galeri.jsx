import React, { useEffect, useState } from "react";
import { galeriAPI } from "../services/galeriAPI"; // Buat service ini sesuai layananAPI
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function Galeri() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editId, setEditId] = useState(null);
    const [galeris, setGaleris] = useState([]);

    const [dataForm, setDataForm] = useState({
        judul: "",
        deskripsi: "",
        gambar: "",
    });

    useEffect(() => {
        loadGaleri();
    }, []);

    const loadGaleri = async () => {
        try {
            setLoading(true);
            const data = await galeriAPI.fetchGaleri();
            setGaleris(data);
        } catch (err) {
            setError("Gagal memuat galeri");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            if (editId) {
                await galeriAPI.updateGaleri(editId, dataForm);
                setSuccess("Galeri berhasil diperbarui!");
            } else {
                await galeriAPI.createGaleri(dataForm);
                setSuccess("Galeri berhasil ditambahkan!");
            }

            await loadGaleri();
            setEditId(null);
            resetForm();

            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(`Gagal menyimpan data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus galeri ini?")) return;
        try {
            setLoading(true);
            await galeriAPI.deleteGaleri(id);
            await loadGaleri();
        } catch (err) {
            setError(`Gagal menghapus: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setDataForm({
            judul: item.judul,
            deskripsi: item.deskripsi,
            gambar: item.gambar,
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
            judul: "",
            deskripsi: "",
            gambar: "",
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Untuk preview lokal
            setDataForm((prev) => ({ ...prev, gambar: imageUrl }));
        }
    };



    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-extrabold text-blue-800 mb-6 border-b pb-2 border-indigo-200">
                    {editId ? "Edit Galeri Media" : "Tambah Galeri Media"}
                </h2>
                <p className="text-gray-500">
                    {editId
                        ? "Ubah informasi galeri yang dipilih."
                        : "Isi form berikut untuk menambahkan media galeri baru."}
                </p>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-blue-100">
                <form onSubmit={handleSubmit} className="grid gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Judul</label>
                        <input
                            type="text"
                            name="judul"
                            value={dataForm.judul}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            placeholder="Judul gambar"
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Deskripsi</label>
                        <textarea
                            name="deskripsi"
                            value={dataForm.deskripsi}
                            onChange={handleChange}
                            rows="4"
                            disabled={loading}
                            placeholder="Deskripsi media..."
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Link Gambar (URL)</label>
                        <input
                            type="url"
                            name="gambar"
                            value={dataForm.gambar}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="https://contoh.com/gambar.jpg"
                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {dataForm.gambar && (
                            <img
                                src={dataForm.gambar}
                                alt="Preview"
                                className="mt-3 w-32 h-20 object-cover rounded-lg border"
                            />
                        )}
                    </div>



                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                        >
                            {loading
                                ? "Menyimpan..."
                                : editId
                                    ? "💾 Simpan Perubahan"
                                    : "➕ Tambah Galeri"}
                        </button>
                        {editId && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="mt-3 w-full text-sm text-gray-600 hover:text-gray-800 underline"
                            >
                                Batal Edit
                            </button>
                        )}
                    </div>
                </form>

                <div className="mt-12">
                    <div className="px-6 py-5 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-3xl shadow-inner">
                        <h3 className="text-xl font-bold text-blue-700">📸 Daftar Galeri ({galeris.length})</h3>
                    </div>

                    {loading && <LoadingSpinner text="Memuat galeri..." />}
                    {!loading && galeris.length === 0 && (
                        <EmptyState text="Belum ada media ditambahkan." />
                    )}

                    {!loading && galeris.length > 0 && (
                        <div className="overflow-x-auto">
                            <GenericTable
                                columns={["#", "Judul", "Deskripsi", "Preview", "Aksi"]}
                                data={galeris}
                                renderRow={(item, index) => (
                                    <>
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4 font-semibold text-blue-600">{item.judul}</td>
                                        <td className="px-6 py-4 max-w-xs truncate">{item.deskripsi}</td>
                                        <td className="px-6 py-4">
                                            <img
                                                src={item.gambar}
                                                alt={item.judul}
                                                className="w-24 h-16 object-cover rounded-lg border"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-4">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                >
                                                    <MdEdit /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={loading}
                                                    className="hover:scale-110 transition"
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
