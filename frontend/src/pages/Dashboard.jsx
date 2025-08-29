import { useEffect, useState } from "react";
import GraficoDespesasPorCategoria from "../components/graficos/GraficoDespesasPorCategoria";
import GraficoSaldoPorMes from "../components/graficos/GraficoSaldoPorMes";
import TabelaLancamentos from "../components/TabelaLancamentos";
import { agruparPorCategoria, calcularSaldoPorMes } from "../utils/agrupadores";

export default function Dashboard() {
  const [lancamentos, setLancamentos] = useState([]);

  useEffect(() => {
    fetch("https://sistema-financeiro-gngw.onrender.com/api/lancamentos")
      .then(res => res.json())
      .then(data => setLancamentos(data))
      .catch(err => console.error("Erro ao buscar lançamentos", err));
  }, []);

  const dadosPizza = agruparPorCategoria(lancamentos);
  const dadosLinha = calcularSaldoPorMes(lancamentos);

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