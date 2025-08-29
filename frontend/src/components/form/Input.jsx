export default function Input({ label, name, value, onChange, required = false, error }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${error ? "border-red-500" : "border-gray-300"
                    }`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}