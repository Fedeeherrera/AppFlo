import Header from './components/Header'
import FuelForm from './components/FuelForm'
import FlightsForm from './components/FlightsForm'
import { useState } from 'react'
import Footer from './components/Footer'
import Tabs from './components/Tabs'
import LoadedFlights from './components/LoadedFlights'
import LoadedFuel from './components/LoadedFuel'

function App() {
  const [tab, setTab] = useState('fuel')

  const formatDate = (fecha) => {
    return fecha
      ? new Date(fecha).toLocaleDateString('es-AR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : '-'
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center w-full">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-6 w-full flex-col">
        <div className="w-full max-w-md border-4 rounded-xl flex flex-col items-center p-5 bg-slate-400">
          <Tabs tab={tab} setTab={setTab} />
          {tab === 'fuel' && <FuelForm />}
          {tab === 'flight' && <FlightsForm />}
        </div>
        <div>
          {tab === 'fuel' && <LoadedFuel formatDate={formatDate} />}
          {tab === 'flight' && <LoadedFlights formatDate={formatDate} />}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
