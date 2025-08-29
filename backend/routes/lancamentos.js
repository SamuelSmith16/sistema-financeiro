const express = require('express');
const router = express.Router();
const lancamentoController = require('../controllers/lancamentoController');

router.post('/', lancamentoController.criarLancamento);
router.get('/', lancamentoController.listarLancamentos);
router.put('/:id', lancamentoController.atualizarLancamento);
router.delete('/:id', lancamentoController.deletarLancamento);

module.exports = router;