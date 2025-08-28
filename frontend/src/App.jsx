import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Lancamentos from "./pages/Lancamentos";
import Cartoes from "./pages/Cartoes";
import Simulacoes from "./pages/Simulacoes";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lancamentos" element={<Lancamentos />} />
          <Route path="/cartoes" element={<Cartoes />} />
          <Route path="/simulacoes" element={<Simulacoes />} />
        </Routes>
      </div>
    </Router>
  );
}