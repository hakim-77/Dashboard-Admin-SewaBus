import { useState } from "react";
import bookingData from "../JSON/booking.json"; // Ensure you have the updated file
import PageHeader from "../components/PageHeader"; // Ensure this is the correct path
import { Link } from "react-router-dom";

export default function Booking() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedStatus: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const _searchTerm = filters.searchTerm.toLowerCase();
  const statusOptions = ["All", "Confirmed", "Pending", "Cancelled"];

  // Filter bookings based on the search term and selected status
  const filteredBookings = bookingData.filter((booking) => {
    const nameMatch = booking.customerName?.toLowerCase().includes(_searchTerm);
    const bookingIDMatch = booking.id?.toLowerCase().includes(_searchTerm);
    const statusMatch = filters.selectedStatus && filters.selectedStatus !== "All"
      ? booking.status === filters.selectedStatus
      : true;

    return (nameMatch || bookingIDMatch) && statusMatch;
  });

  // Utility function to get status-specific colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500 text-white";
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Booking Table</h2>
      <PageHeader title="Dashboard" breadcrumb={["Dashboard", "Booking List"]}>
        <Link
          to="/addbookings"
          className="mt-6 inline-block bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Add Booking
        </Link>
      </PageHeader>

      {/* Filters */}
      <input
        type="text"
        name="searchTerm"
        placeholder="Search by name or booking ID"
        value={filters.searchTerm}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4 shadow-sm focus:ring-2 focus:ring-green-500"
      />

      <select
        name="selectedStatus"
        value={filters.selectedStatus}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4 shadow-sm focus:ring-2 focus:ring-green-500"
      >
        <option value="">All Statuses</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      {/* Booking Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-sm font-semibold">Booking ID</th>
              <th className="p-3 border text-sm font-semibold">Customer Name</th>
              <th className="p-3 border text-sm font-semibold">Status</th>
              <th className="p-3 border text-sm font-semibold">Total Price</th>
              <th className="p-3 border text-sm font-semibold">Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr
                key={booking.id}
                className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 rounded-lg"
              >
                <td className="p-3 border">{booking.id}</td>
                <td className="p-3 border">{booking.customerName}</td>
                <td className={`p-3 border ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </td>
                <td className="p-3 border">{`Rp. ${booking.totalPrice.toLocaleString()}`}</td>
                <td className="p-3 border">{new Date(booking.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBookings.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No matching bookings found.</p>
        )}
      </div>
    </div>
  );
}
