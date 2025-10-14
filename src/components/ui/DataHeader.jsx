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
    <div className="space-y-4 mb-6">
      {/* Header principal */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-gradient-to-r ${iconColor} rounded-lg flex-shrink-0`}>
            {Icon && <Icon className="w-6 h-6 text-white" />}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 truncate">{title}</h2>
            {count !== undefined && (
              <span className={`${badgeColor} inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 sm:mt-0`}>
                {count} {countLabel}
              </span>
            )}
          </div>
        </div>
        
        {/* Acciones en desktop */}
        {children && (
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            {children}
          </div>
        )}
      </div>

      {/* Acciones en móvil */}
      {children && (
        <div className="sm:hidden flex flex-col gap-3">
          {children}
        </div>
      )}
    </div>
  )
}

export default DataHeader