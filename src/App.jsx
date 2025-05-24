import React, { Suspense } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import Header from './components/Header'
// import Dashboard from './pages/Dashboard.jsx'
import './assets/tailwind.css'
import { Route, Routes } from "react-router-dom";
import Profile from './pages/Profile';
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/addbookings" element={<AddBookings />} />
          <Route path="/review" element={<Review />} />
          <Route path="/tim" element={<Tim />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/profile" element={<Profile/>} />
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
