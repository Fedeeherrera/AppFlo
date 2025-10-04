const FormButton = ({
  type = 'submit',
  disabled = false,
  isLoading = false,
  loadingText = 'Guardando...',
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg'
  
  const variants = {
    primary: 'bg-sky-600 bg-primary hover:bg-primary/90 text-primary-foreground',
    accent: 'bg-sky-600 bg-accent hover:bg-accent/90 text-accent-foreground'
  }

  const variantClasses = variants[variant] || variants.primary

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default FormButton