import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaBell, FaSearch, FaChevronDown } from "react-icons/fa";

export default function Header() {
    return (
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm ">
            {/* Left: Title */}
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

            {/* Right: Search, Notifications, Profile */}
            <div className="flex items-center space-x-6">
                {/* Search Bar */}
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Search anything"
                        className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Notification */}
                <div className="relative cursor-pointer hover:scale-105 transition-transform duration-200">
                    <FaBell className="text-gray-600 text-xl" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow-sm">
                        !
                    </span>
                </div>

                {/* Profile */}
                <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                    {/* Admin Icon as Avatar */}
                    <div className="relative group">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full border-2 border-blue-500 shadow-md transition-transform group-hover:scale-105 group-hover:ring-2 group-hover:ring-blue-300 text-xl">
                            <MdOutlineAdminPanelSettings />
                        </div>
                        {/* Optional Online Dot */}
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
                    </div>

                    {/* Nama dan Role */}
                    <div className="text-sm leading-tight text-gray-700">
                        <div className="font-medium">Nur Muhammad Maulanal Hakim</div>
                        <div className="text-xs text-gray-500">Admin</div>
                    </div>

                    <FaChevronDown className="text-gray-400 text-sm" />
                </div>
            </div>
        </div>
    );
}
