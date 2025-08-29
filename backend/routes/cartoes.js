const express = require('express');
const Cartao = require('../models/Cartao');
const router = express.Router();

// Criar cartão (POST)
router.post('/', async (req, res) => {
  try {
    const {
      banco,
      numero,
      limite,
      vencimento_fatura,
      melhor_data_compra,
      tipo
    } = req.body;

    // Validação mínima
    if (!banco || !numero || limite === undefined || !vencimento_fatura || !melhor_data_compra || !tipo) {
      return res.status(400).json({ error: "Campos obrigatórios: banco, numero, limite, vencimento_fatura, melhor_data_compra, tipo" });
    }

    const limiteNum = Number(limite);
    const vencimentoNum = Number(vencimento_fatura);
    const melhorDataNum = Number(melhor_data_compra);

    if (isNaN(limiteNum) || limiteNum <= 0) {
      return res.status(400).json({ error: "Limite deve ser um número maior que zero" });
    }

    if (vencimentoNum < 1 || vencimentoNum > 31) {
      return res.status(400).json({ error: "Vencimento da fatura deve estar entre 1 e 31" });
    }

    if (melhorDataNum < 1 || melhorDataNum > 31) {
      return res.status(400).json({ error: "Melhor data de compra deve estar entre 1 e 31" });
    }

    if (!["Crédito", "Débito", "Pré-pago"].includes(tipo)) {
      return res.status(400).json({ error: "Tipo deve ser 'Crédito', 'Débito' ou 'Pré-pago'" });
    }

    const novo = new Cartao({
      banco,
      numero,
      limite: limiteNum,
      vencimento_fatura: vencimentoNum,
      melhor_data_compra: melhorDataNum,
      tipo
    });

    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar cartões (GET)
router.get('/', async (req, res) => {
  try {
    const lista = await Cartao.find();
    res.json(lista);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar cartão (PUT)
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await Cartao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ error: 'Cartão não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar cartão (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const removido = await Cartao.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ error: 'Cartão não encontrado' });
    res.json({ message: 'Cartão removido com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
