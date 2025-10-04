const FilterInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  focusColor = "focus:ring-slate-500"
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-slate-300 rounded-lg ${focusColor} focus:border-transparent ${className}`}
      />
    </div>
  )
}

export default FilterInput