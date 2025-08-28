import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Lancamentos from "./pages/Lancamentos";
import Cartoes from "./pages/Cartoes";
import Simulacoes from "./pages/Simulacoes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="lancamentos" element={<Lancamentos />} />
        <Route path="cartoes" element={<Cartoes />} />
        <Route path="simulacoes" element={<Simulacoes />} />
        </Route>
      </Routes>
    </Router>
  );
}