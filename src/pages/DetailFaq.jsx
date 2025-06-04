import { useParams, Link } from "react-router-dom";
import faqData from "../JSON/faq.json"; // Path ke JSON FAQ

export default function DetailFAQ() {
  const { id } = useParams();
  const faq = faqData.find((item) => item.id === parseInt(id));

  if (!faq) {
    return (
      <div className="p-10 text-center text-gray-600">
        <p>FAQ tidak ditemukan.</p>
        <Link
          to="/faq"
          className="inline-block mt-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow"
        >
          ← Kembali ke FAQ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-10 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">
        {faq.pertanyaan}
      </h2>
      <p className="text-gray-700 text-lg mb-6">{faq.jawaban}</p>

      <div className="text-center text-sm text-gray-400 mb-6">
        Status:{" "}
        <span
          className={`font-semibold ${
            faq.status === "Published" ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {faq.status}
        </span>
        <br />
        Ditambahkan pada: {new Date(faq.tanggal).toLocaleDateString()}
      </div>

      <div className="text-center">
        <Link
          to="/faq"
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow"
        >
          ← Kembali ke Daftar FAQ
        </Link>
      </div>
    </div>
  );
}
