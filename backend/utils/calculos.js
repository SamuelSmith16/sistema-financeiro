function calcularJurosAoMes(valor_total, quantidade_parcelas, valor_parcela) {
    let taxa = 0.01; // 1% inicial
    let tolerancia = 0.000001;
    let maxIteracoes = 10000;

    for (let i =0; i < maxIteracoes; i++) {
        let valorCalculado = valor_total * (taxa * Math.pow(1 + taxa, quantidade_parcelas)) / (Math.pow(1 + taxa, quantidade_parcelas) - 1);
        let erro = valor_parcela - valorCalculado;

        if (Math.abs(erro) < tolerancia) break;

        taxa += erro / 1000; // ajuste gradual para convergência
    }

    return taxa * 100; // retorna % ao mês
}

module.exports = {
    calcularJurosAoMes
};