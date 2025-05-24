import { BsFillPersonPlusFill } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="p-6">
            <PageHeader title="Dashboard Overview" />

            <div
                id="dashboard-grid"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
                <DashboardCard
                    icon={<AiOutlineCalendar className="text-3xl text-white" />}
                    title="Total Booking"
                    value="1,200"
                    growth="+2.7%"
                    gradient="from-blue-500 to-blue-700"
                />
                <DashboardCard
                    icon={<BsFillPersonPlusFill className="text-3xl text-white" />}
                    title="Total Contact"
                    value="2,000"
                    growth="+0.9%"
                    gradient="from-green-500 to-emerald-600"
                />
                <DashboardCard
                    icon={<FaDollarSign className="text-3xl text-white" />}
                    title="Total Earnings"
                    value="$12,930,200"
                    growth="+0.9%"
                    gradient="from-yellow-400 to-yellow-600"
                />
            </div>
        </div>
    );
}

function DashboardCard({ icon, title, value, growth, gradient }) {
    return (
        <div
            className={`relative bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-xl text-white transform transition duration-300 hover:scale-[1.03]`}
        >
            <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full shadow-inner">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm opacity-90">{title}</span>
                    <h2 className="text-3xl font-extrabold tracking-tight">{value}</h2>
                </div>
            </div>

            <div
                className="absolute bottom-4 right-4 bg-white/20 text-white px-3 py-1 text-sm font-semibold rounded-full backdrop-blur-md"
            >
                {growth}
            </div>
        </div>
    );
}
