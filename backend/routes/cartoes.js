const express = require('express');
const Cartao = require('../models/Cartao');
const router = express.Router();

// Criar cartão (POST)
router.post('/', async (req, res) => {
    try {
        const novoCartao = new Cartao(req.body);
        const salvo = await novoCartao.save();
        res.status(201).json(salvo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar cartões (GET)
router.get('/', async (req, res) => {
    try {
        const cartoes = await Cartao.find();
        res.json(cartoes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Atualizar cartão (PUT)
router.put('/:id', async (req, res) => {
    try {
        const atualizado = await Cartao.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!atualizado) return res.status(404).json({ error: 'Cartão não encontrado'});
        res.json(atualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar cartão (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const removido = await Cartao.findByIdAndDelete(req.params.id);
        if (!removido) return res.status(404).json({ error: 'Cartão não encontrado'});
        res.json({ mensagem: 'Cartão removido com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.menssage });
    }
});

module.exports = router;