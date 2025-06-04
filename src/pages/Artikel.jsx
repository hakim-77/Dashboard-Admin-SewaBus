import { useState } from "react";
import { Link } from "react-router-dom";
import artikelData from "../JSON/artikel.json"; // Ganti path sesuai struktur proyekmu

export default function Artikel() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedStatus: "All",
  });

  const statusOptions = ["All", "Published", "Draft"];
  const _searchTerm = filters.searchTerm.toLowerCase();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredArticles = artikelData.filter((item) => {
    const titleMatch = item.judul.toLowerCase().includes(_searchTerm);
    const contentMatch = item.konten.toLowerCase().includes(_searchTerm);
    const statusMatch =
      filters.selectedStatus !== "All"
        ? item.status === filters.selectedStatus
        : true;

    return (titleMatch || contentMatch) && statusMatch;
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Daftar Artikel</h2>

      {/* Filter Section */}
      <div className="mb-4">
        <input
          type="text"
          name="searchTerm"
          placeholder="Cari berdasarkan judul atau konten..."
          value={filters.searchTerm}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <div className="flex space-x-3 mb-4">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() =>
                setFilters((prev) => ({ ...prev, selectedStatus: status }))
              }
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filters.selectedStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Judul</th>
              <th className="p-2 border">Konten</th>
              <th className="p-2 border">Penulis</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border text-blue-600 underline hover:text-blue-800">
                  <Link to={`/artikel/${item.id}`}>{item.judul}</Link>
                </td>
                <td className="p-2 border">
                  {item.konten.length > 100
                    ? item.konten.substring(0, 100) + "..."
                    : item.konten}
                </td>
                <td className="p-2 border">{item.penulis}</td>
                <td className="p-2 border">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      item.status === "Published"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-2 border">
                  {new Date(item.tanggal).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredArticles.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            Tidak ada artikel yang cocok.
          </p>
        )}
      </div>
    </div>
  );
}
