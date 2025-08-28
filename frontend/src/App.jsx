import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Lancamentos from "./pages/Lancamentos";
import Cartoes from "./pages/Cartoes";
import Simulacoes from "./pages/Simulacoes";
import NovoLancamento from "./pages/NovoLancamento";
import NovoCartao from "./pages/NovoCartao";
import NovaSimulacao from "./pages/NovaSimulacao";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="lancamentos" element={<Lancamentos />} />
          <Route path="cartoes" element={<Cartoes />} />
          <Route path="simulacoes" element={<Simulacoes />} />
          <Route path="/lancamentos/novo" element={<NovoLancamento />} />
          <Route path="/cartoes/novo" element={<NovoCartao />} />
          <Route path="/simulacoes/nova" element={<NovaSimulacao />} />
        </Route>
      </Routes>
    </Router>
  );
}