import { BsFillPersonPlusFill } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
            <div id="dashboard-grid" className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* Orders Section */}
                <div className="relative bg-blue-100 p-5 rounded-xl shadow-md h-35 flex items-start">
                    {/* Ikon di sebelah kiri */}
                    <div className="bg-white p-4 rounded-full shadow-md mr-4">
                        <AiOutlineCalendar className="text-3xl text-blue-500" />
                    </div>

                    {/* Informasi booking */}
                    <div className="flex flex-col justify-between h-full py-1">
                        <div>
                            <span className="text-gray-500 text-sm">Total Booking</span>
                            <h2 className="text-2xl font-bold text-gray-900">1200</h2>
                        </div>
                    </div>

                    {/* Tombol Upgrade Now */}
                    <div
                        id="add-menu-button"
                        className="absolute bottom-4 right-4 bg-white rounded-md px-4 py-2 shadow cursor-pointer hover:bg-gray-100 transition"
                    >
                        <span className="text-gray-700 font-bold">+2.7%</span>
                    </div>
                </div>



                {/* Delivered Section */}
                <div className="relative bg-blue-100 p-5 rounded-xl shadow-md h-35 flex items-start">
                    {/* Ikon di sebelah kiri */}
                    <div className="bg-white p-4 rounded-full shadow-md mr-4">
                        <BsFillPersonPlusFill className="text-3xl text-blue-500" />
                    </div>

                    {/* Informasi booking */}
                    <div className="flex flex-col justify-between h-full py-1">
                        <div>
                            <span className="text-gray-500 text-sm">Total Customer</span>
                            <h2 className="text-2xl font-bold text-gray-900">2000</h2>
                        </div>
                    </div>

                    {/* Tombol Upgrade Now */}
                    <div
                        id="add-menu-button"
                        className="absolute bottom-4 right-4 bg-white rounded-md px-4 py-2 shadow cursor-pointer hover:bg-gray-100 transition"
                    >
                        <span className="text-gray-700 font-bold">+0.9%</span>
                    </div>
                </div>

                {/* Revenue Section */}
                <div className="relative bg-blue-100 p-5 rounded-xl shadow-md h-35 flex items-start">
                    {/* Ikon di sebelah kiri */}
                    <div className="bg-white p-4 rounded-full shadow-md mr-4">
                        <FaDollarSign className="text-3xl text-blue-500" />
                    </div>

                    {/* Informasi booking */}
                    <div className="flex flex-col justify-between h-full py-1">
                        <div>
                            <span className="text-gray-500 text-sm">Total Earnings</span>
                            <h2 className="text-2xl font-bold text-gray-900">$12,930,200</h2>
                        </div>
                    </div>

                    {/* Tombol Upgrade Now */}
                    <div
                        id="add-menu-button"
                        className="absolute bottom-4 right-4 bg-white rounded-md px-4 py-2 shadow cursor-pointer hover:bg-gray-100 transition"
                    >
                        <span className="text-gray-700 font-bold">+0.9%</span>
                    </div>
                </div>

            </div>
        </div>
    );
}   