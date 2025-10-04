import { Field, ErrorMessage } from 'formik'

const FormField = ({
  name,
  label,
  type = 'text',
  placeholder,
  icon: Icon,
  min,
  step,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
        {Icon && <Icon className="w-4 h-4" />}
        {label}
      </label>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        min={min}
        step={step}
        className={`w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 ${className}`}
        {...props}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-destructive text-sm font-medium"
      />
    </div>
  )
}

export default FormField