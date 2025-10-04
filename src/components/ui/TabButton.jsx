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
      base: "bg-blue-500 hover:bg-blue-600",
      active: "bg-blue-700"
    },
    rose: {
      base: "bg-rose-500 hover:bg-rose-600", 
      active: "bg-rose-700"
    },
    green: {
      base: "bg-green-500 hover:bg-green-600",
      active: "bg-green-700"
    }
  }

  const colorClasses = colorVariants[color] || colorVariants.blue
  const buttonColor = isActive ? colorClasses.active : colorClasses.base

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${buttonColor} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {label}
    </button>
  )
}

export default TabButton