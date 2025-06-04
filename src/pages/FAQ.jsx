import { useState } from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import faqData from "../JSON/faq.json"; // Ganti path sesuai
import { Link } from "react-router-dom";

export default function FAQ() {
    const [filters, setFilters] = useState({
        searchTerm: "",
        selectedStatus: "All"
    });

    const statusOptions = ["All", "Published", "Draft"];
    const _searchTerm = filters.searchTerm.toLowerCase();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredFaqs = faqData.filter((faq) => {
        const pertanyaanMatch = faq.pertanyaan.toLowerCase().includes(_searchTerm);
        const jawabanMatch = faq.jawaban.toLowerCase().includes(_searchTerm);
        const statusMatch =
            filters.selectedStatus !== "All"
                ? faq.status === filters.selectedStatus
                : true;

        return (pertanyaanMatch || jawabanMatch) && statusMatch;
    });

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
                Pertanyaan Umum (FAQ)
            </h2>

            {/* Filter Section */}
            <div className="mb-6">
                <input
                    type="text"
                    name="searchTerm"
                    placeholder="🔍 Cari pertanyaan atau jawaban..."
                    value={filters.searchTerm}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <div className="flex flex-wrap gap-3">
                    {statusOptions.map((status) => (
                        <button
                            key={status}
                            onClick={() =>
                                setFilters((prev) => ({ ...prev, selectedStatus: status }))
                            }
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filters.selectedStatus === status
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* FAQ Cards */}
            <div className="grid gap-5">
                {filteredFaqs.map((faq) => (
                    <div
                        key={faq.id}
                        className="border rounded-lg p-5 shadow-sm hover:shadow-md transition-all bg-white"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg text-blue-800">Pertanyaan:<br />
                                {faq.pertanyaan}
                            </h3>
                            <span
                                className={`flex items-center gap-2 px-3 py-1 text-xs rounded-full font-medium ${faq.status === "Published"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {faq.status === "Published" ? <FaCheckCircle /> : <FaClock />}
                                {faq.status}
                            </span>
                        </div>
                        <p className="text-gray-700">Jawaban:<br />{faq.jawaban}</p>
                        <p className="mt-2 text-sm text-gray-400">
                            Ditambahkan pada: {new Date(faq.tanggal).toLocaleDateString()}
                        </p>
                         <div className="mt-4">
                            <Link
                                to={`/faq/${faq.id}`}
                                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Lihat Detail
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {filteredFaqs.length === 0 && (
                <p className="text-center text-gray-500 mt-6">
                    ❌ Tidak ada pertanyaan yang cocok dengan pencarian.
                </p>
            )}
        </div>
    );
}
