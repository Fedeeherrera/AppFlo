import Header from "./components/Header"
import FuelForm from "./components/FuelForm"
import FlightsForm from "./components/FlightsForm"
import { useState } from "react"
import Footer from "./components/Footer"
import Tabs from "./components/Tabs"
import LoadedFlights from "./components/LoadedFlights"
import LoadedFuel from "./components/LoadedFuel"
import CSS from "./styles/Global.module.scss"

function App() {
  const [tab, setTab] = useState("fuel")

  const formatDate = (fecha) => {
    return fecha
      ? new Date(fecha).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "-"
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-fade-in">
            <div className="flex justify-center p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
              <Tabs tab={tab} setTab={setTab} />
            </div>
            <div className={`p-6 ${CSS.backgroundForm}`}>
              {tab === "fuel" && <FuelForm />}
              {tab === "flight" && <FlightsForm />}
            </div>
          </div>

          <div className="mt-8">
            {tab === "fuel" && <LoadedFuel formatDate={formatDate} />}
            {tab === "flight" && <LoadedFlights formatDate={formatDate} />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
