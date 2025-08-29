import { useEffect, useState } from "react";
import GraficoDespesasPorCategoria from "../components/graficos/GraficoDespesasPorCategoria";
import GraficoSaldoPorMes from "../components/graficos/GraficoSaldoPorMes";
import TabelaLancamentos from "../components/TabelaLancamentos";
import { agruparPorCategoria, calcularSaldoPorMes } from "../utils/agrupadores";

export default function Dashboard() {
  const [lancamentos, setLancamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://sistema-financeiro-gngw.onrender.com/api/lancamentos")
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar lançamentos");
        return res.json();
      })
      .then(data => setLancamentos(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const dadosPizza = agruparPorCategoria(lancamentos);
  const dadosLinha = calcularSaldoPorMes(lancamentos);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-300">
        <span className="animate-pulse">Carregando dados...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        Erro: {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Financeiro</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GraficoDespesasPorCategoria dados={dadosPizza} />
        <GraficoSaldoPorMes dados={dadosLinha} />
      </div>

      <div className="mt-8">
        <TabelaLancamentos lancamentos={lancamentos} />
      </div>
    </div>
  );
}