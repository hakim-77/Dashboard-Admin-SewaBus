export default function Dashboard() {
    return (
        <div className="container">
            <h2>Dashboard Statistik</h2>
            <div className="statistics">
                <TotalPengunjung />
                <TotalProduk />
                <TotalArtikel />
                <TotalBooking />
            </div>
            
            <div className="chart-container">
                <h3>Grafik Statistik</h3>
                <div className="chart">
                    <UserLogin />
                    <Booking />
                    <ArtikelPopuler />
                </div>
            </div>
        </div>
    );
}

function TotalPengunjung(){
    return(
        <div className="stat-card">
            <h3>Total Pengunjung</h3>
            <p>1200</p>
        </div>
    )
}
function TotalProduk(){
    return(
        <div className="stat-card">
            <h3>Total Produk</h3>
            <p>300</p>
        </div>
    )
}
function TotalArtikel(){
    return(
        <div className="stat-card">
            <h3>Total Artikel</h3>
            <p>45</p>
        </div>
    )
}
function TotalBooking(){
    return(
        <div className="stat-card">
            <h3>Total Booking</h3>
            <p>100</p>
        </div>
    )
}
function UserLogin(){
    return(
        <div className="chart-box">
            <h4>User Login</h4>
            <div className="bar" style={{ height: '80%' }}></div>
        </div>
    )
}
function Booking(){
    return(
        <div className="chart-box">
            <h4>Booking</h4>
            <div className="bar" style={{ height: '80%' }}></div>
        </div>
    )
}
function ArtikelPopuler(){
    return(
        <div className="chart-box">
            <h4>Artikel Populer</h4>
            <div className="bar" style={{ height: '80%' }}></div>
        </div>
    )
}