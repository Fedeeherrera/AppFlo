import * as Yup from 'yup'

export const flightSchema = Yup.object().shape({
  fecha: Yup.date().required('La fecha es obligatoria'),
  avion: Yup.string().required('El avión es obligatorio'),
  piloto: Yup.string().required('El piloto es obligatorio'),
  instructor: Yup.string().required('El Instructor es obligatorio'),
  tipoVuelo: Yup.string().required('El tipo de vuelo es obligatorio'),
  horaDespegue: Yup.string().required('La hora de despegue es obligatoria'),
  horaAterrizaje: Yup.string().required('La hora de aterrizaje es obligatoria'),
  cantidadAterrizajes: Yup.number()
    .min(0, 'Debe ser un número positivo')
    .required('La cantidad de aterrizajes es obligatoria'),
  comienzoVuelo: Yup.string().required('El comienzo del vuelo es obligatorio'),
  finalizarVuelo: Yup.string().required('El final del vuelo es obligatorio'),
})