const express = require('express');
const Lancamento = require('../models/Lancamento');
const router = express.Router();

// Criar lançamento (POST)
router.post('/', async (req, res) => {
  try {
    const {
      descricao,
      data,
      categoria,
      tipo,
      valor,
      forma_pagamento,
      pago,
      parcelas,
      parcela_atual,
      observacoes,
      id_cartao
    } = req.body;

    // Validação mínima
    if (!descricao || !data || !categoria || !tipo || valor === undefined) {
      return res.status(400).json({ error: "Campos obrigatórios: descricao, data, categoria, tipo, valor" });
    }

    if (!["Receita", "Despesa"].includes(tipo)) {
      return res.status(400).json({ error: "Tipo deve ser 'Receita' ou 'Despesa'" });
    }

    const valorNum = Number(valor);
    if (isNaN(valorNum) || valorNum <= 0) {
      return res.status(400).json({ error: "Valor deve ser um número maior que zero" });
    }

    const novo = new Lancamento({
      descricao,
      data,
      categoria,
      tipo,
      valor: valorNum,
      forma_pagamento,
      pago,
      parcelas,
      parcela_atual,
      observacoes,
      id_cartao
    });

    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar lançamentos (GET)
router.get('/', async (req, res) => {
  try {
    const lista = await Lancamento.find();
    res.json(lista);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar lançamento (PUT)
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await Lancamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ error: 'Lançamento não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar lançamento (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const removido = await Lancamento.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ error: 'Lançamento não encontrado' });
    res.json({ message: 'Lançamento removido com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;