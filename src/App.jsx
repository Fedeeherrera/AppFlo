import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"
import FuelForm from "./components/FuelForm"
import FlightsForm from "./components/FlightsForm"
import LoadedFlights from "./components/LoadedFlights"
import LoadedFuel from "./components/LoadedFuel"
import CSS from "./styles/Global.module.scss"

// Componentes UI
import { TabSystem } from "./components/ui"

// Constants y hooks
import { APP_TABS } from "./constants/tabConfig"
import { useTabs } from "./hooks/useTabs"
import { formatDate } from "./utils/dateUtils"

// Context providers
import { DataCacheProvider } from "./contexts/DataCacheContext"

function App() {
  const { activeTab, handleTabChange } = useTabs("fuel")

  return (
    <DataCacheProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-fade-in">
              <div className="flex justify-center p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
                <TabSystem
                  tabs={APP_TABS}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              </div>
              <div className={`p-6 ${CSS.backgroundForm}`}>
                {activeTab === "fuel" && <FuelForm />}
                {activeTab === "flight" && <FlightsForm />}
              </div>
            </div>

            <div className="mt-8">
              {activeTab === "fuel" && <LoadedFuel formatDate={formatDate} />}
              {activeTab === "flight" && <LoadedFlights formatDate={formatDate} />}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </DataCacheProvider>
  )
}

export default App
