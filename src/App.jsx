import "./App.css";
import { Footer, Navbar } from "./pages";
import { AllRoute } from "./Routes/AllRoute";
import { MobileNavigation } from "./components/MobileNavigation";

function App() {
  return (
    <>
      <div className="bg-gradient-to-t from-slate-950 to-slate-950">
        <Navbar />
        <AllRoute />
        <Footer />
        <MobileNavigation />
      </div>
    </>
  );
}
export default App;
