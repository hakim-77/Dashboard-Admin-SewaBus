import React, { useEffect, useState } from "react";
import { testimoniAPI } from "../services/testimoniAPI";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function Testimoni() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState(null);
  const [testimonis, setTestimonis] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [dataForm, setDataForm] = useState({
    name: "",
    company: "",
    comment: "",
    rating: 0,
    image: "",
  });

  useEffect(() => {
    loadTestimonis();
  }, []);

  const loadTestimonis = async () => {
    try {
      setLoading(true);
      const data = await testimoniAPI.fetchTestimoni();
      setTestimonis(data);
    } catch (err) {
      setError("Gagal memuat testimoni");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editId) {
        await testimoniAPI.updateTestimoni(editId, dataForm);
        setSuccess("Testimoni berhasil diperbarui!");
      } else {
        await testimoniAPI.createTestimoni(dataForm);
        setSuccess("Testimoni berhasil ditambahkan!");
      }

      await loadTestimonis();
      resetForm();
      setEditId(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(`Gagal submit: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setDataForm({
      name: item.name,
      company: item.company,
      comment: item.comment,
      rating: item.rating,
      image: item.image || "",
    });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;
    try {
      setLoading(true);
      await testimoniAPI.deleteTestimoni(id);
      await loadTestimonis();
    } catch (err) {
      setError(`Gagal menghapus: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDataForm({
      name: "",
      company: "",
      comment: "",
      rating: 0,
      image: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-6 border-b pb-2 border-indigo-200">
          {editId ? "Edit Testimoni" : "Tambah Testimoni"}
        </h2>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6 bg-white rounded-xl p-6 shadow"
      >
        <input
          type="text"
          name="name"
          value={dataForm.name}
          onChange={handleChange}
          placeholder="Nama"
          required
          className="p-3 border rounded-lg w-full"
        />
        <input
          type="text"
          name="company"
          value={dataForm.company}
          onChange={handleChange}
          placeholder="Perusahaan"
          required
          className="p-3 border rounded-lg w-full"
        />
        <input
          type="number"
          name="rating"
          value={dataForm.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
          min={1}
          max={5}
          required
          className="p-3 border rounded-lg w-full"
        />
        <input
          type="url"
          name="image"
          value={dataForm.image}
          onChange={handleChange}
          placeholder="URL Foto (opsional)"
          className="p-3 border rounded-lg w-full"
        />
        <div className="md:col-span-2">
          <textarea
            name="comment"
            value={dataForm.comment}
            onChange={handleChange}
            placeholder="Komentar"
            rows={4}
            required
            className="p-3 border rounded-lg w-full"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {editId ? "Simpan Perubahan" : "Tambah Testimoni"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                resetForm();
                setEditId(null);
              }}
              className="w-full mt-2 text-sm text-gray-600 underline"
            >
              Batal Edit
            </button>
          )}
        </div>
      </form>

      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4 text-blue-700">
          📋 Daftar Testimoni ({testimonis.length})
        </h3>

        {loading && <LoadingSpinner text="Memuat testimoni..." />}
        {!loading && testimonis.length === 0 && (
          <EmptyState text={error || "Belum ada testimoni"} />
        )}
        {!loading && testimonis.length > 0 && (
          <GenericTable
            columns={[
              "#",
              "Nama",
              "Perusahaan",
              "Rating",
              "Komentar",
              "Foto",
              "Aksi",
            ]}
            data={testimonis}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.company}</td>
                <td className="px-6 py-4">{item.rating}</td>
                <td className="px-6 py-4 max-w-[250px] truncate">
                  {item.comment}
                </td>
                <td className="px-6 py-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 items-center">
                    <button onClick={() => handleEdit(item)} title="Edit">
                      <MdEdit className="text-blue-600 text-xl hover:text-blue-800" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} title="Hapus">
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
        )}
      </div>

      {/* Modal detail di luar agar tidak duplikatif */}
      <dialog id="modal-detail" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Detail Testimoni</h3>
          {selectedItem ? (
            <div className="space-y-2">
              <p>
                <strong>Nama:</strong> {selectedItem.name}
              </p>
              <p>
                <strong>Perusahaan:</strong> {selectedItem.company}
              </p>
              <p>
                <strong>Rating:</strong> {selectedItem.rating}
              </p>
              <p>
                <strong>Komentar:</strong>
                <br />
                {selectedItem.comment}
              </p>
              {selectedItem.image && (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-24 h-24 object-cover rounded-full mt-2"
                />
              )}
            </div>
          ) : (
            <p>Data tidak ditemukan.</p>
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
