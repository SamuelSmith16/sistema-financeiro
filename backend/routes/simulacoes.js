const express = require('express');
const Simulacao = require('../models/Simulacao');
const router = express.Router();

function calcularJurosAoMes(valor_total, quantidade_parcelas, valor_parcela) {
    let taxa = 0.01; // 1% incial
    let tolerancia = 0.000001;
    let maxIteracoes = 10000;

    for (let i = 0; i < maxIteracoes; i++) {
        let valorCalculado = valor_total * (taxa * Math.pow(1 + taxa, quantidade_parcelas)) / (Math.pow(1 + taxa, quantidade_parcelas) - 1);
        let erro = valor_parcela - valorCalculado;

        if (Math.abs(erro) < tolerancia) break;

        taxa += erro / 1000; // ajuste gradual para convergência
    }

    return taxa * 100; // retorna % ao mês
}

// Criar simulação (POST)
router.post('/', async (req, res) => {
  try {
    let { titulo, valor_total, quantidade_parcelas, juros_ao_mes } = req.body;

    // Validação mínima
    if (!titulo || !valor_total || !quantidade_parcelas) {
      return res.status(400).json({ error: "Campos obrigatórios: titulo, valor_total, quantidade_parcelas" });
    }

    valor_total = Number(valor_total);
    quantidade_parcelas = Number(quantidade_parcelas);

    if (valor_total <= 0 || quantidade_parcelas < 1) {
      return res.status(400).json({ error: "Valor total deve ser > 0 e parcelas >= 1" });
    }

    // Se o frontend enviar juros_ao_mes, usamos ele
    let valor_parcela;
    if (juros_ao_mes !== undefined && juros_ao_mes !== "") {
      juros_ao_mes = Number(juros_ao_mes);
      if (juros_ao_mes < 0) {
        return res.status(400).json({ error: "Juros ao mês não pode ser negativo" });
      }
      const taxa = juros_ao_mes / 100;
      const totalComJuros = valor_total * Math.pow(1 + taxa, quantidade_parcelas);
      valor_parcela = totalComJuros / quantidade_parcelas;
    } else {
      // Se não vier juros, usamos uma taxa padrão (ex: 2%)
      const taxaPadrao = 0.02;
      const totalComJuros = valor_total * Math.pow(1 + taxaPadrao, quantidade_parcelas);
      valor_parcela = totalComJuros / quantidade_parcelas;
      juros_ao_mes = taxaPadrao * 100;
    }

    const valor_total_com_juros = valor_parcela * quantidade_parcelas;

    const novaSimulacao = new Simulacao({
      titulo,
      valor_total,
      quantidade_parcelas,
      juros_ao_mes,
      valor_parcela,
      valor_total_com_juros
    });

    const salva = await novaSimulacao.save();
    res.status(201).json(salva);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Listar simulações (GET)
router.get('/', async (req, res) => {
    try {
        const simulacoes = await Simulacao.find();
        res.json(simulacoes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Atualizar simulações (PUT)
router.put('/:id', async (req, res) => {
    try {
        const atualizado = await Simulacao.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!atualizado) return res.status(404).json({ error: 'Simulação não encontrada' });
        res.json(atualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar simulações (DELET)
router.delete('/:id', async (req, res) => {
    try {
        const removido = await Simulacao.findByIdAndDelete(req.params.id);
        if (!removido) return res.status(404).json({ error: 'Simulação não encontrada' });
        res.json({ message: 'Simulação removida com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;