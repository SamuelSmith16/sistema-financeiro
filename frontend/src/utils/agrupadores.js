export function agruparPorCategoria(lancamentos) {
  const agrupado = {};

  lancamentos.forEach(l => {
    if (l.tipo === "Despesa") {
      agrupado[l.categoria] = (agrupado[l.categoria] || 0) + l.valor;
    }
  });

  return Object.entries(agrupado).map(([categoria, valor]) => ({ categoria, valor }));
}

export function calcularSaldoPorMes(lancamentos) {
  const saldos = {};

  lancamentos.forEach(l => {
    const data = new Date(l.data);
    const mes = data.toLocaleString("pt-BR", { month: "short" });

    const valor = l.tipo === "Receita" ? l.valor : -l.valor;
    saldos[mes] = (saldos[mes] || 0) + valor;
  });

  return Object.entries(saldos).map(([mes, saldo]) => ({ mes, saldo }));
}