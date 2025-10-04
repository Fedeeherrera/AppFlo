const DataHeader = ({
  icon: Icon,
  title,
  count,
  countLabel = "registros",
  iconColor = "from-primary to-secondary",
  badgeColor = "bg-primary/10 text-primary",
  children
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className={`p-2 bg-gradient-to-r ${iconColor} rounded-lg`}>
          {Icon && <Icon className="w-6 h-6 text-white" />}
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        {count !== undefined && (
          <span className={`${badgeColor} px-3 py-1 rounded-full text-sm font-medium`}>
            {count} {countLabel}
          </span>
        )}
      </div>
      
      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  )
}

export default DataHeader