import * as Yup from 'yup'

export const fuelSchema = Yup.object().shape({
  fecha: Yup.date().required('La fecha es obligatoria'),
  litros: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser mayor a 0')
    .required('Los litros son obligatorios'),
  encargado: Yup.string().required('El encargado es obligatorio'),
  lecturaSurtidor: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser mayor a 0')
    .required('La lectura es obligatoria'),
  avion: Yup.string().required('El avión es obligatorio'),
})