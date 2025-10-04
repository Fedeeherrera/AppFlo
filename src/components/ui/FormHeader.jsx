const FormHeader = ({ icon: Icon, title, iconColor = 'text-primary' }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-primary/10 rounded-lg">
        {Icon && <Icon className={`w-6 h-6 ${iconColor}`} />}
      </div>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
  )
}

export default FormHeader