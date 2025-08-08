import Header from './components/Header';
import Footer from './components/Footer';
import VueloForm2 from './components/VueloForm2';
import Tabs from './components/Tabs';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center w-full">
      <Header/>
      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md border-4">
          <Tabs/>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
