import { FiLogOut } from "react-icons/fi"; 
import { FaBus } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import ListMenu from "../components/ListMenu";

export default function Sidebar() {
    return (
        <div id="sidebar" className="flex min-h-screen w-70 flex-col bg-white p-7 shadow-lg">
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col">
                <span id="logo-title" className="flex items-center font-poppins-extrabold text-[38px] text-gray-900">
                    <FaBus className="text-blue-600 mr-5" /> {/* Ikon biru dan jarak kanan */}
                    Bus
                    {/* <b id="logo-dot" className="text-hijau">.</b> */}
                </span>

            </div>

            {/* List Menu */}
            <div>
                <ListMenu />
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-blue-400 px-4 py-2 rounded-md shadow-lg mb-10 flex items-center">
                    <div id="footer-text" className="text-white text-sm font-bold text-center w-full">
                        <span>Enhance Your Travelie Experience</span>
                        <div id="add-menu-button" className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2 cursor-pointer">
                            <span className="text-gray-700 flex items-center font-bold">Upgrade Now</span>
                        </div>
                    </div>
                </div>
                <span className="hover:text-white flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-300 hover:bg-blue-500 hover:font-extrabold">
                    <FiLogOut className="text-gray-300 mr-5"/>
                    Logout
                </span>
            </div>
        </div>
    );
}
