import { useState } from "react";
import InputBooking from "./components/InputBooking";
import ErrorMassage from "./components/ErrorMessage";
import Tombol from "./components/Tombol";
import Dropdown from "./components/Dropdown";

export default function Booking() {
    const [nama, setNama] = useState("");
    const [tanggalKepergian, setTanggalKepergian] = useState("");
    const [daerahtujuan, setdaerahtujuan] = useState("");
    const [tipeBus, setTipeBus] = useState("");

    const hargaBus = {
        Eksekutif: "Rp 30.000",
        Bisnis: "Rp 90.000",
        VIP: "Rp 200.000"
    };

    // Validasi
    const isNamaValid = /^[A-Za-z\s]+$/.test(nama);
    const isDaerahValid = /^[A-Za-z\s]+$/.test(daerahtujuan); // Hanya huruf dan spasi
    const isFormValid = nama && isNamaValid && tanggalKepergian && daerahtujuan && isDaerahValid && tipeBus;

    return (
        <div className="flex flex-col items-center justify-center m-5 p-5 bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
                    Booking Bus
                </h2>

                {/* Input Nama */}
                <InputBooking
                    label="Daerah Asal"
                    value={nama}
                    placeholder="Masukkan Daerah Asal"
                    onChange={(e) => setNama(e.target.value)}
                />
                {!nama ? <ErrorMassage pesan="Daerah asal tidak boleh kosong!" /> : !isNamaValid && <ErrorMassage pesan="Daerah asal hanya boleh berisi huruf!" />}

                {/* Input Tempat Lahir */}
                <InputBooking
                    label="Daerah Tujuan"
                    value={daerahtujuan}
                    placeholder="Masukkan Daerah Tujuan"
                    onChange={(e) => setdaerahtujuan(e.target.value)}
                />
                {!daerahtujuan ? <ErrorMassage pesan="Daerah tujuan wajib diisi!" /> : !isDaerahValid && <ErrorMassage pesan="Daerah tujuan hanya boleh berisi huruf!" />}

                {/* Input Tanggal Lahir (Date Picker) */}
               <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Tanggal Kepergian</label>
                    <input
                        type="date"
                        value={tanggalKepergian}  // Menggunakan state yang benar
                        onChange={(e) => setTanggalKepergian(e.target.value)}  // Menggunakan setter yang benar
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {!tanggalKepergian && <ErrorMassage pesan="Tanggal kepergian wajib diisi!" />}

                {/* Dropdown tipeBus */}
                <Dropdown
                    label="Pilih tipe bus"
                    value={tipeBus}
                    options={["Eksekutif", "Bisnis", "VIP"]}
                    onChange={(e) => setTipeBus(e.target.value)}
                />
                {!tipeBus && <ErrorMassage pesan="Pilih tipe bus terlebih dahulu!" />}

                {/* Menampilkan harga berdasarkan tipe bus */}
                {tipeBus && (
                    <p className="text-gray-600 mt-2">
                        Harga tipe bus {tipeBus} {hargaBus[tipeBus]}
                    </p>
                )}

                {/* Tombol Simpan */}
                {isFormValid && <Tombol />}
            </div>
        </div>
    );
}
