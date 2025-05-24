import { FiLogOut } from "react-icons/fi";
import { FaBus } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import ListMenu from "./ListMenu"; // Pastikan ListMenu-nya clean & pakai ikon yang konsisten
import { Link, NavLink } from "react-router-dom"

export default function Sidebar() {
    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4 space-x-2
        ${isActive ? 
            "text-white bg-blue-500 font-extrabold" : 
            "text-gray-600 hover:text-white hover:bg-blue-500 hover:border-b-4 hover:border-blue-500 hover:font-extrabold"
        }`
    return (
        <div
            id="sidebar"
            className="flex min-h-screen w-20 md:w-64 flex-col bg-white border-r border-blue-100 p-4 shadow-sm transition-all"
        >
            {/* Logo */}
            <div className="flex items-center mb-10 px-2">
                <FaBus className="text-blue-500 text-5xl mr-4 drop-shadow-sm" />
                <span className="text-3xl font-extrabold text-gray-800 tracking-wide">
                    Bus
                </span>
            </div>


            {/* List Menu */}
            <div className="flex-grow">
                <ListMenu />
            </div>

            {/* Upgrade Card */}
            <div className="hidden md:block bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl text-center text-sm font-medium mb-6">
                <p className="text-gray-700">Enhance Your <br /> Travelie Experience!</p>
                <div className="mt-3">
                    <button className="bg-white text-blue-600 font-semibold px-4 py-1.5 text-sm rounded-lg shadow hover:bg-blue-50 transition">
                        Upgrade Now
                    </button>
                </div>
            </div>

            {/* Logout */}
            <NavLink id="menu-9" to="/login" className={menuClass}>
                <FiLogOut className="mr-4 text-xl" />
                <span className="hidden md:inline font-medium">Logout</span>
            </NavLink>
        </div>
    );
}
