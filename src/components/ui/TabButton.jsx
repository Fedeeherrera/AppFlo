const TabButton = ({
  isActive,
  onClick,
  icon: Icon,
  label,
  color = "blue",
  className = ""
}) => {
  const colorVariants = {
    blue: {
      base: "bg-slate-300 hover:bg-slate-400 text-slate-700 hover:text-slate-800",
      active: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg scale-105"
    },
    rose: {
      base: "bg-slate-300 hover:bg-slate-400 text-slate-700 hover:text-slate-800", 
      active: "bg-rose-600 hover:bg-rose-700 text-white shadow-lg scale-105"
    },
    green: {
      base: "bg-slate-300 hover:bg-slate-400 text-slate-700 hover:text-slate-800",
      active: "bg-green-600 hover:bg-green-700 text-white shadow-lg scale-105"
    }
  }

  const colorClasses = colorVariants[color] || colorVariants.blue
  const buttonColor = isActive ? colorClasses.active : colorClasses.base

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium w-full sm:w-auto ${buttonColor} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {label}
    </button>
  )
}

export default TabButton