import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

export default function VueloForm() {
  const [form, setForm] = useState({
    avion: '',
    piloto: '',
    tipoVuelo: '',
    despegue: '',
    aterrizaje: '',
    cantidadAterrizajes: 0,
    comienzoVuelo: '',
    finalizarVuelo: '',
  })

  const [tiempoVolado, setTiempoVolado] = useState(0)

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === 'number' ? parseInt(value, 10) || 0 : value
    });
  };

  useEffect(() => {
    if (form.despegue && form.aterrizaje) {
      const despegue = new Date(form.despegue)
      const aterrizaje = new Date(form.aterrizaje)
      const minutos = (aterrizaje - despegue) / 60000 // milisegundos a minutos
      const horasDecimal = +(minutos / 60).toFixed(2)
      setTiempoVolado(minutos > 0 ? horasDecimal : 0)
    } else {
      setTiempoVolado(0)
    }
  }, [form.despegue, form.aterrizaje])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formatoFecha = (fecha) => {
      const d = new Date(fecha);
      const dia = d.getDate().toString().padStart(2, '0');
      const mes = (d.getMonth() + 1).toString().padStart(2, '0');
      const anio = d.getFullYear();
      return `${dia}/${mes}/${anio}`;
    }

    try {
      await addDoc(collection(db, 'vuelos'), {
        ...form,
        comienzoVuelo: formatoFecha(form.comienzoVuelo),
        finalizarVuelo: formatoFecha(form.finalizarVuelo),
        tiempoVolado,
      })
      alert('Vuelo cargado correctamente ✅')
      setForm({
        avion: '',
        piloto: '',
        tipoVuelo: '',
        despegue: '',
        aterrizaje: '',
        cantidadAterrizajes: 0,
        comienzoVuelo: '',
        finalizarVuelo: '',
      })
      setTiempoVolado(0)
    } catch (err) {
      console.error('Error al guardar vuelo:', err)
      alert('Ocurrió un error ❌')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Registrar Vuelo</h2>

      <select
        name="avion"
        value={form.avion}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      >
        <option value="">Elige Aeronave</option>
        <option value="LV-IWC">LV-IWC</option>
        <option value="LV-YGE">LV-YGE</option>
        <option value="LV-NCU">LV-NCU</option>
      </select>

      <select
        name="piloto"
        value={form.piloto}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      >
        <option value="">Elige Instructor</option>
        <option value="Sin instructor">Sin instructor</option>
        <option value="Fabian Mateos">Fabian Mateos</option>
        <option value="Floro Adriano De Benedetto">Floro Adriano De Benedetto</option>
        <option value="Gabriel Dominguez">Gabriel Dominguez</option>
        <option value="Lucas Torres">Lucas Torres</option>
      </select>

      <select
        name="tipoVuelo"
        value={form.tipoVuelo}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      >
        <option value="">Tipo de Vuelo</option>
        <option value="Vuelo Privado">Vuelo Privado</option>
        <option value="Instruccion Alumno">Instrucción Alumno</option>
        <option value="Readaptacion">Readaptación</option>
        <option value="Navegacion">Navegación</option>
        <option value="Bautismo">Bautismo</option>
        <option value="Adaptacion">Adaptación</option>
        <option value="Examen">Examen</option>
        <option value="Trabajo Aereo">Trabajo Aéreo</option>
        <option value="N">N</option>
        <option value="PA">PA</option>
      </select>

      <label htmlFor="despegue" className="block font-medium">
        Despegue:
      </label>
      <input
        type="datetime-local"
        id="despegue"
        name="despegue"
        value={form.despegue}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <label htmlFor="aterrizaje" className="block font-medium">
        Aterrizaje:
      </label>
      <input
        type="datetime-local"
        id="aterrizaje"
        name="aterrizaje"
        value={form.aterrizaje}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      {/* Tiempo volado calculado */}
      <label htmlFor="tiempoVolado" className="block font-medium">
        Tiempo Volado (horas decimales):
      </label>
      <input
        type="text"
        id="tiempoVolado"
        name="tiempoVolado"
        value={tiempoVolado}
        readOnly
        className="w-full border p-2 rounded bg-gray-100"
      />

      <label htmlFor="cantidadAterrizajes" className="block font-medium">
        Cantidad de Aterrizajes:
      </label>
      <input
        type="number"
        name="cantidadAterrizajes"
        value={form.cantidadAterrizajes}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Guardar Vuelo
      </button>
    </form>
  )
}
