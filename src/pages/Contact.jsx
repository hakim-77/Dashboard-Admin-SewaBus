import { useState } from "react";
import PageHeader from "../components/PageHeader";
import messagesData from "../JSON/contact.json"; // The messages data file
import { FaEnvelope, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function Messages() {
    const [filters, setFilters] = useState({
        searchTerm: "",
        selectedStatus: "All"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const _searchTerm = filters.searchTerm.toLowerCase();
    const statusOptions = ["All", "Pending", "Responded"];

    const filteredMessages = messagesData.filter((message) => {
        const nameMatch = message.name?.toLowerCase().includes(_searchTerm);
        const emailMatch = message.email?.toLowerCase().includes(_searchTerm);
        const subjectMatch = message.subject?.toLowerCase().includes(_searchTerm);
        const statusMatch = filters.selectedStatus && filters.selectedStatus !== "All"
            ? message.status === filters.selectedStatus
            : true;

        return (nameMatch || emailMatch || subjectMatch) && statusMatch;
    });

    return (
        <div className="p-8">
            <h2 className="text-xl font-bold mb-4">Contact Form Messages</h2>

            {/* Filters */}
            <div className="mb-4">
                <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search by name, email, or subject"
                    value={filters.searchTerm}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <div className="flex space-x-3 mb-4">
                    {statusOptions.map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilters((prev) => ({ ...prev, selectedStatus: status }))}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filters.selectedStatus === status
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Messages Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Message ID</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Subject</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMessages.map((message) => (
                            <tr key={message.id} className="hover:bg-gray-50">
                                <td className="p-2 border">{message.id}</td>
                                <td className="p-2 border">{message.name}</td>
                                <td className="p-2 border">{message.subject}</td>
                                <td className="p-2 border">
                                    <span className={`px-3 py-1 rounded-full text-xs ${message.status === "Pending" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>
                                        {message.status}
                                    </span>
                                </td>
                                <td className="p-2 border">{new Date(message.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredMessages.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No matching messages found.</p>
                )}
            </div>
        </div>
    );
}
