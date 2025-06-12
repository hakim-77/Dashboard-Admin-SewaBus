import React, { useEffect, useState } from "react";
import { faqAPI } from "../services/faqAPI"; // Sesuaikan path jika berbeda
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function FAQ() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editId, setEditId] = useState(null);
    const [faqs, setFaqs] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const [dataForm, setDataForm] = useState({
        question: "",
        answer: ""
    });

    useEffect(() => {
        loadFaqs();
    }, []);

    const loadFaqs = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await faqAPI.fetchFAQ();
            setFaqs(data);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat FAQ");
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
                await faqAPI.updateFAQ(editId, dataForm);
                setSuccess("FAQ berhasil diperbarui!");
            } else {
                await faqAPI.createFAQ(dataForm);
                setSuccess("FAQ berhasil ditambahkan!");
            }

            await loadFaqs();
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
        if (!confirm("Yakin ingin menghapus FAQ ini?")) return;

        try {
            setLoading(true);
            setError("");
            await faqAPI.deleteFAQ(id);
            await loadFaqs();
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setDataForm({
            question: item.question,
            answer: item.answer,
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
            question: "",
            answer: "",
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-extrabold text-blue-800 mb-6 border-b pb-2 border-indigo-200">
                    {editId ? "Edit FAQ" : "Tambah FAQ"}
                </h2>
                <p className="text-gray-500">
                    {editId ? "Ubah pertanyaan dan jawaban FAQ." : "Isi form berikut untuk menambahkan FAQ baru."}
                </p>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-blue-100 transition-all">
                <form onSubmit={handleSubmit} className="grid gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Pertanyaan</label>
                        <input
                            type="text"
                            name="question"
                            value={dataForm.question}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Contoh: Apa itu layanan kami?"
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Jawaban</label>
                        <textarea
                            name="answer"
                            value={dataForm.answer}
                            onChange={handleChange}
                            required
                            rows="4"
                            disabled={loading}
                            placeholder="Tuliskan jawaban dari pertanyaan di atas..."
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none transition"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 font-semibold text-lg rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg hover:from-blue-600 hover:to-blue-800 transition"
                        >
                            {loading
                                ? "Mohon Tunggu..."
                                : editId
                                    ? "💾 Simpan Perubahan"
                                    : "➕ Tambah FAQ"}
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

                {/* Table FAQ */}
                <div className="mt-12">
                    <div className="px-6 py-5 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-3xl shadow-inner">
                        <h3 className="text-xl font-bold text-blue-700 tracking-wide">
                            📋 Daftar FAQ ({faqs.length})
                        </h3>
                    </div>

                    {loading && <LoadingSpinner text="Memuat data FAQ..." />}
                    {!loading && faqs.length === 0 && (
                        <EmptyState
                            text={error ? "Terjadi kesalahan saat memuat FAQ." : "Belum ada FAQ yang tersedia."}
                        />
                    )}

                    {!loading && faqs.length > 0 && (
                        <div className="overflow-x-auto">
                            <GenericTable
                                columns={["#", "Pertanyaan", "Jawaban", "Aksi"]}
                                data={faqs}
                                renderRow={(item, index) => (
                                    <>
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4 text-blue-600 font-medium">{item.question}</td>
                                        <td className="px-6 py-4 text-gray-700 max-w-md truncate">{item.answer}</td>
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
                                                    title="Hapus FAQ"
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
            {/* Modal Detail FAQ */}
            <dialog id="modal-detail" className="modal">
                <div className="modal-box rounded-2xl p-6 max-w-xl">
                    <h3 className="font-bold text-xl text-blue-700 mb-4">Detail FAQ</h3>
                    {selectedItem && (
                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold text-gray-700">Pertanyaan:</p>
                                <p className="text-gray-800">{selectedItem.question}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">Jawaban:</p>
                                <p className="text-gray-800 whitespace-pre-line">{selectedItem.answer}</p>
                            </div>
                        </div>
                    )}
                    <div className="modal-action mt-6">
                        <form method="dialog">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Tutup
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
}
