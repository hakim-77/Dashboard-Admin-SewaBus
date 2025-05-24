import { useState } from "react";
import reviewData from "../JSON/reviews.json";
import PageHeader from "../components/PageHeader";


export default function Review() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedRating: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const _searchTerm = filters.searchTerm.toLowerCase();
  const ratingOptions = ["All", 5, 4, 3, 2, 1];

  const filteredReviews = reviewData.filter((review) => {
    const nameMatch = review.customerName?.toLowerCase().includes(_searchTerm);
    const commentMatch = review.comment?.toLowerCase().includes(_searchTerm);
    const ratingMatch =
      filters.selectedRating && filters.selectedRating !== "All"
        ? review.rating === parseInt(filters.selectedRating)
        : true;

    return (nameMatch || commentMatch) && ratingMatch;
  });

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
      <PageHeader title="Dashboard" breadcrumb={["Dashboard", "Review List"]}/>

      {/* Filters */}
      <input
        type="text"
        name="searchTerm"
        placeholder="Search by name or comment"
        value={filters.searchTerm}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4 shadow-sm focus:ring-2 focus:ring-green-500"
      />

      <select
        name="selectedRating"
        value={filters.selectedRating}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4 shadow-sm focus:ring-2 focus:ring-green-500"
      >
        <option value="">All Ratings</option>
        {ratingOptions.map((rating) => (
          <option key={rating} value={rating}>
            {rating === "All" ? "All Ratings" : `${rating} Star${rating > 1 ? "s" : ""}`}
          </option>
        ))}
      </select>

      {/* Review Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-sm font-semibold">Review ID</th>
              <th className="p-3 border text-sm font-semibold">Customer Name</th>
              <th className="p-3 border text-sm font-semibold">Rating</th>
              <th className="p-3 border text-sm font-semibold">Comment</th>
              <th className="p-3 border text-sm font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((review) => (
              <tr
                key={review.id}
                className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 rounded-lg"
              >
                <td className="p-3 border">{review.id}</td>
                <td className="p-3 border">{review.customerName}</td>
                <td className="p-3 border text-yellow-500 font-semibold">{renderStars(review.rating)}</td>
                <td className="p-3 border text-gray-700">{review.comment}</td>
                <td className="p-3 border text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredReviews.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No matching reviews found.</p>
        )}
      </div>
    </div>
  );
}
