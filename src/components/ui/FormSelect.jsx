import { Field, ErrorMessage } from 'formik'

const FormSelect = ({
  name,
  label,
  options = [],
  placeholder = 'Seleccionar...',
  icon: Icon,
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
        as="select"
        name={name}
        className={`w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-destructive text-sm font-medium"
      />
    </div>
  )
}

export default FormSelect