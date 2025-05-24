import React, { useState } from 'react';
import dataBus from "../JSON/databus.json";

export default function ListBus() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const _searchTerm = searchTerm.toLowerCase();

  // Get all unique tags, times, and prices for filtering
  const allTags = [
    ...(new Set([
      ...dataBus.flatMap((databus) => databus.fasilitas.wifi ? 'Wifi' : []),
      ...dataBus.flatMap((databus) => databus.fasilitas.ac ? 'AC' : []),
      ...dataBus.flatMap((databus) => databus.fasilitas.toilet ? 'Toilet' : [])
    ]))
  ];

  const allTimes = [...new Set(dataBus.map((databus) => databus.jadwal.waktu_berangkat))];
  const allPrices = [...new Set(dataBus.map((databus) => databus.harga.harga_tiket.toString()))];

  // Filter buses based on search term and selected filters
  const filteredDatabuss = dataBus.filter((databus) => {
    const matchesSearch =
      databus.tipe_bus.toLowerCase().includes(_searchTerm) ||
      databus.rute_perjalanan.toLowerCase().includes(_searchTerm);

    const matchesTag = selectedTag
      ? (selectedTag === 'Wifi' && databus.fasilitas.wifi) ||
        (selectedTag === 'AC' && databus.fasilitas.ac) ||
        (selectedTag === 'Toilet' && databus.fasilitas.toilet)
      : true;

    const matchesTime = selectedTime ? databus.jadwal.waktu_berangkat.includes(selectedTime) : true;
    const matchesPrice = selectedPrice ? databus.harga.harga_tiket.toString().includes(selectedPrice) : true;

    return matchesSearch && matchesTag && matchesTime && matchesPrice;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchTerm") {
      setSearchTerm(value);
    } else if (name === "selectedTag") {
      setSelectedTag(value);
    } else if (name === "selectedTime") {
      setSelectedTime(value);
    } else if (name === "selectedPrice") {
      setSelectedPrice(value);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-indigo-50 to-blue-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Daftar Bus - Admin Dashboard</h1>

      <div className="max-w-full mx-auto flex-grow">
        {/* Search and Filter Inputs */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <input
            type="text"
            name="searchTerm"
            placeholder="Search for a bus or route..."
            className="w-full p-4 border border-indigo-400 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
            value={searchTerm}
            onChange={handleChange}
          />

          {/* Tags Filter */}
          <select
            name="selectedTag"
            className="w-full p-4 border border-indigo-400 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
            value={selectedTag}
            onChange={handleChange}
          >
            <option value="">Facility</option>
            {allTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          {/* Time Filter */}
          <select
            name="selectedTime"
            className="w-full p-4 border border-indigo-400 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
            value={selectedTime}
            onChange={handleChange}
          >
            <option value="">Departure Time</option>
            {allTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>

          {/* Price Filter */}
          <select
            name="selectedPrice"
            className="w-full p-4 border border-indigo-400 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
            value={selectedPrice}
            onChange={handleChange}
          >
            <option value="">Price</option>
            {allPrices.map((price, index) => (
              <option key={index} value={price}>
                IDR {price}
              </option>
            ))}
          </select>
        </div>

        {/* Bus Table */}
        <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-md">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-6">Tipe Bus</th>
                <th className="py-3 px-6">Route</th>
                <th className="py-3 px-6">Seats Capacity</th>
                <th className="py-3 px-6">Operator</th>
                <th className="py-3 px-6">Departure</th>
                <th className="py-3 px-6">Arrival</th>
                <th className="py-3 px-6">Wifi</th>
                <th className="py-3 px-6">AC</th>
                <th className="py-3 px-6">Toilet</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Photo</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDatabuss.map((item) => (
                <tr key={item.id_layanan} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{item.tipe_bus}</td>
                  <td className="py-4 px-6">{item.rute_perjalanan}</td>
                  <td className="py-4 px-6">{item.kapasitas_tempat_duduk}</td>
                  <td className="py-4 px-6">{item.operator_bus}</td>
                  <td className="py-4 px-6">{item.jadwal.waktu_berangkat}</td>
                  <td className="py-4 px-6">{item.jadwal.waktu_tiba}</td>
                  <td className="py-4 px-6">{item.fasilitas.wifi ? 'Available' : 'Not Available'}</td>
                  <td className="py-4 px-6">{item.fasilitas.ac ? 'Available' : 'Not Available'}</td>
                  <td className="py-4 px-6">{item.fasilitas.toilet ? 'Available' : 'Not Available'}</td>
                  <td className="py-4 px-6">{item.harga.mata_uang} {item.harga.harga_tiket}</td>
                  <td><img
                    src={item.url_gambar}
                    alt="Bus Image"
                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                  /></td>
                  <td className="py-4 px-6 flex space-x-3">
                    {/* Actions: Edit, Delete, View Details */}
                    <button className="text-blue-600 hover:text-blue-800 transition-all duration-300">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-all duration-300">
                      Delete
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-800 transition-all duration-300">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
