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
  // lógica para calcular saldo acumulado por mês
}