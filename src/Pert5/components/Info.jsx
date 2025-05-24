export default function BusRentalInfo() {
    const hargaPerHari = 1500000;
    const jumlahHari = 3;
    const total = hargaPerHari * jumlahHari;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
            <h2 className="text-xl font-semibold mb-4">Informasi Penyewaan</h2>
            <p>Harga per Hari: <strong>Rp {hargaPerHari.toLocaleString()}</strong></p>
            <p>Jumlah Hari: <strong>{jumlahHari} hari</strong></p>
            <hr />
            <p>Total: <strong className="text-green-600 text-lg">Rp {total.toLocaleString()}</strong></p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sewa Sekarang
            </button>
        </div>
    );
}
