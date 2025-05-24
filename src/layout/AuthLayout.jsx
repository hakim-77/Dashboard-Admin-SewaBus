import { FaBus } from "react-icons/fa";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <div className="flex items-center justify-center mb-8">
                    <FaBus className="text-blue-500 text-5xl mr-3 drop-shadow-sm" />
                    <span className="text-3xl font-extrabold text-gray-800 tracking-wide">
                        Sewa Bus
                    </span>
                </div>

                <Outlet />

                <p className="text-center text-sm text-gray-500 mt-6">
                    ©Sewa Bus 2025
                </p>
            </div>
        </div>
    );
}
