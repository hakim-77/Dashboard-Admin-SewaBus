export default function profile() {
    return (
        <div className='card'>
            <Header />
            <Nama />
            <Gambar />
            <Alamat />
        </div>
    )
}
function Nama() {
    return (
        <div>
            <h2>Global Transport</h2>
            <p>
                Sewa bus Riau dari Global Transport,
                perusahaan transportasi terkemuka di Riau,
                menyediakan jasa sewa bus dengan harga sewa yang sangat
                terjangkau serta fasilitas yang lengkap. Apapun kebutuhan anda, 
                baik untuk pariwisata, perjalanan bisnis, atau acara lainnya, kami memiliki 
                armada bus terbaik yang kami pastikan dapat mengakomodasi semua keperluan perjalanan anda.
            </p>
        </div>
    )
}
function Alamat() {
    return (
        <div>
            <i className="sui sui-map-marker" style={{ fontSize: '14px', color: '#e42c36' }}></i>
            Berlokasi di Jl. Marsan Barat No.342, Sidomulyo Bar, Kec. Tampan, Kota Pekanbaru, Riau 28294
        </div>
    )
}
function Header() {
    return (
        <h1>Penyewaan Bus</h1>
    )
}
function Gambar() {
    return (
        <div className="image">
            <img src="img/sewa-bus-riau.jpg" alt="bus" />
        </div>
    )
}