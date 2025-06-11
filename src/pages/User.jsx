import React, { useEffect, useState } from "react";
import { userAPI } from "../services/userAPI"; // Ganti sesuai file service user
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function User() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editId, setEditId] = useState(null);
    const [users, setUsers] = useState([]);

    const [dataForm, setDataForm] = useState({
        nama: "",
        email: "",
        role: "admin", // default role
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await userAPI.fetchUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat pengguna.");
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
                await userAPI.updateUsers(editId, dataForm);
                setSuccess("Pengguna berhasil diperbarui!");
            } else {
                await userAPI.createUsers(dataForm);
                setSuccess("Pengguna berhasil ditambahkan!");
            }

            await loadUsers();
            setEditId(null);
            resetForm();

            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message || "Gagal mengirim data"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus pengguna ini?")) return;

        try {
            setLoading(true);
            setError("");
            await userAPI.deleteUsers(id);
            await loadUsers();
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setDataForm({
            nama: user.nama,
            email: user.email,
            role: user.role,
        });
        setEditId(user.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        resetForm();
        setEditId(null);
    };

    const resetForm = () => {
        setDataForm({
            nama: "",
            email: "",
            role: "admin",
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-extrabold text-blue-800 mb-6 border-b pb-2 border-indigo-200">
                    {editId ? "Edit Pengguna" : "Tambah Pengguna"}
                </h2>
                <p className="text-gray-500">
                    {editId
                        ? "Ubah informasi pengguna."
                        : "Isi form untuk menambahkan pengguna baru."}
                </p>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-blue-100 transition-all">
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Nama
                        </label>
                        <input
                            type="text"
                            name="nama"
                            value={dataForm.nama}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Nama Lengkap"
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={dataForm.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="email@domain.com"
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Role
                        </label>
                        <select
                            name="role"
                            value={dataForm.role}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="admin">Admin</option>
                            <option value="operator">Operator</option>
                            <option value="superadmin">Super Admin</option>
                        </select>
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
                                    : "➕ Tambah Pengguna"}
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
                            📋 Daftar Pengguna ({users.length})
                        </h3>
                    </div>

                    {loading && <LoadingSpinner text="Memuat pengguna..." />}
                    {!loading && users.length === 0 && (
                        <EmptyState text="Belum ada pengguna. Tambahkan sekarang!" />
                    )}

                    {!loading && users.length > 0 && (
                        <div className="overflow-x-auto">
                            <GenericTable
                                columns={["#", "Nama", "Email", "Role", "Aksi"]}
                                data={users}
                                renderRow={(user, index) => (
                                    <>
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4 text-blue-700 font-semibold">{user.nama}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4 capitalize">{user.role}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-4">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                                                >
                                                    <MdEdit />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
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
