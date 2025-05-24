export default function Dropdown({ label, value, options, onChange }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded"
            >
                <option value="">Pilih Tipe Bus</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
