const express = require('express');
const Simulacao = require('../models/Simulacao');
const { calcularJurosAoMes } = require('../utils/calculos');
const router = express.Router();

// Criar simulação (POST)
router.post('/', async (req, res) => {
  try {
    let { titulo, valor_total, quantidade_parcelas, juros_ao_mes, valor_parcela } = req.body;

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
    if (juros_ao_mes !== undefined && juros_ao_mes !== "") {
      juros_ao_mes = Number(juros_ao_mes);
      if (juros_ao_mes < 0) {
        return res.status(400).json({ error: "Juros ao mês não pode ser negativo" });
      }
      const taxa = juros_ao_mes / 100;
      const totalComJuros = valor_total * Math.pow(1 + taxa, quantidade_parcelas);
      valor_parcela = totalComJuros / quantidade_parcelas;
    } else {
      // Se não vier juros, usamos uma taxa padrão
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

// Atualizar simulação (PUT)
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await Simulacao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ error: 'Simulação não encontrada' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar simulação (DELETE)
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