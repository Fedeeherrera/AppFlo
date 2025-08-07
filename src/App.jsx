import Header from './components/Header';
import Footer from './components/Footer';
import VueloForm from './components/VueloForm';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 items-center">
      <Header/>


      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <VueloForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
