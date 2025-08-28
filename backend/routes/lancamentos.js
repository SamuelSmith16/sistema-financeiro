const express = require('express');
const Lancamento = require('../models/Lancamento');
const router = express.Router();

// Criar lançamento (POST)
router.post('/', async (req, res) => {
    try {
        const novo = new Lancamento(req.body);
        await novo.save();
        res.status(201).json(novo);
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
        res.status(500).json({ error: err.message });
    }
});

// Atualizar um lançamento (PUT)
router.put('/:id', async (req, res) => {
    try {
        const atualizado = await Lancamento.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // retorna o documento atualizado
        );
        if (!atualizado) {
            return res.status(404).json({ error: 'Lançamento não encontrado' });
        }
        res.json(atualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar um lançamento (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const removido = await Lancamento.findByIdAndDelete(req.params.id);
        if (!removido) {
            return res.status(404).json({ error: 'Lançamento não encontrado' });
        }
        res.json({ mensagem: 'Lançamento removido com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;