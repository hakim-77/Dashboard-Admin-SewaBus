import { useParams, Link } from "react-router-dom";
import articleData from "../JSON/artikel.json"; // Ganti path sesuai lokasi JSON-mu

export default function DetailArtikel() {
  const { id } = useParams();
  const article = articleData.find((item) => item.id === parseInt(id));

  if (!article) {
    return (
      <div className="p-10 text-center text-gray-600">
        <p>Artikel tidak ditemukan.</p>
        <Link
          to="/artikel"
          className="inline-block mt-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow"
        >
          ← Kembali ke Daftar Artikel
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">{article.judul}</h1>
      <p className="text-gray-700 text-lg mb-6 whitespace-pre-line">{article.konten}</p>

      <div className="text-center text-sm text-gray-500 mb-4">
        <span className="mr-4">Penulis: <strong>{article.penulis}</strong></span>
        <span>Status: <strong className={article.status === "Published" ? "text-green-600" : "text-yellow-600"}>{article.status}</strong></span>
      </div>
      <p className="text-center text-gray-400 text-sm mb-6">
        Dipublikasikan pada: {new Date(article.tanggal).toLocaleDateString()}
      </p>

      <div className="text-center">
        <Link
          to="/artikel"
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded shadow"
        >
          ← Kembali ke Daftar Artikel
        </Link>
      </div>
    </div>
  );
}
