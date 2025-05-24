export default function InputBooking({ label, placeholder, value, onChange }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
