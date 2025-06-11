import React, { Suspense } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import Header from './components/Header'
// import Dashboard from './pages/Dashboard.jsx'
import './assets/tailwind.css'
import { Route, Routes } from "react-router-dom";
import Profile from './pages/Profile';
// import Galeri from './pages/Galeri';
// import User from './pages/User';
// import Layanan from './pages/Layanan';
// import Lowongan from './pages/Lowongan';
// import DetailFAQ from './pages/DetailFaq';
// import DetailArtikel from './pages/DetailArtikel';
// import DetailTim from './pages/DetailTim';
// import DetailBus from './pages/DetailBus';
// import Artikel from './pages/Artikel';
// import Tim from './pages/Tim';
// import FAQ from './pages/FAQ';
// import Sidebar from './components/Sidebar'
// import Booking from './pages/Bookings.jsx'
// import ListBus from './pages/ListBus.jsx'
// import AddBookings from './pages/AddBookings.jsx'
// import Contact from './pages/Contact.jsx'
// import Review from './pages/Review.jsx'
// import NotFound from './pages/NotFound.jsx'
// import ErrorPage from "./pages/ErrorPage.jsx";
// import MainLayout from './layout/MainLayout.jsx'
// import AuthLayout from './layout/AuthLayout.jsx'
// import Login from './pages/auth/Login.jsx'
// import Forgot from './pages/auth/Forgot.jsx'
// import Register from './pages/auth/Register.jsx'

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Booking = React.lazy(() => import("./pages/Bookings"))
const ListBus = React.lazy(() => import("./pages/ListBus"))
const AddBookings = React.lazy(() => import("./pages/AddBookings"))
const Contact = React.lazy(() => import("./pages/Contact"))
const Review = React.lazy(() => import("./pages/Review"))
const NotFound = React.lazy(() => import("./pages/NotFound"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const MainLayout = React.lazy(() => import("./layout/MainLayout"))
const AuthLayout = React.lazy(() => import("./layout/AuthLayout"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Loading = React.lazy(() => import("./components/Loading"))
const Tim = React.lazy(() => import("./pages/Tim"))
const FAQ = React.lazy(() => import("./pages/FAQ"))
const Artikel = React.lazy(() => import("./pages/Artikel"))
const DetailBus = React.lazy(() => import("./pages/DetailBus"))
const DetailTim= React.lazy(() => import("./pages/DetailTim"))
const DetailFAQ= React.lazy(() => import("./pages/DetailFaq"))
const DetailArtikel= React.lazy(() => import("./pages/DetailArtikel"))
const Layanan= React.lazy(() => import("./pages/Layanan"))
const Lowongan= React.lazy(() => import("./pages/Lowongan"))
const User= React.lazy(() => import("./pages/User"))
const Galeri= React.lazy(() => import("./pages/Galeri"))

function App() {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/badrequest" element={<ErrorPage kode="400" deskripsi="Bad Request" />} />
        <Route path="/Unauthorized" element={<ErrorPage kode="401" deskripsi="Unauthorized" />} />
        <Route path="/Forbidden" element={<ErrorPage kode="403" deskripsi="Access Forbidden" />} />
        <Route path="/*" element={<ErrorPage kode="404" deskripsi="Error Not Found" />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/listbus" element={<ListBus />} />
          <Route path="/listbus/:id" element={<DetailBus/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addbookings" element={<AddBookings />} />
          <Route path="/review" element={<Review />} />
          <Route path="/tim" element={<Tim />} />
          <Route path="/tim/:id" element={<DetailTim/>} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/faq/:id" element={<DetailFAQ/>} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/artikel/:id" element={<DetailArtikel/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/layanan" element={<Layanan/>} />
          <Route path="/lowongan" element={<Lowongan/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/galeri" element={<Galeri/>} />
          {/* <Route path="/badrequest" element={<ErrorPage kode="400" deskripsi="Bad Request" />} />
          <Route path="/Unauthorized" element={<ErrorPage kode="401" deskripsi="Unauthorized" />} />
          <Route path="/Forbidden" element={<ErrorPage kode="403" deskripsi="Access Forbidden" />} />
          <Route path="/*" element={<ErrorPage kode="404" deskripsi="Error Not Found" />} /> */}
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
