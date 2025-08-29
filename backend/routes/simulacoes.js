const express = require('express');
const router = express.Router();
const simulacaoController = require('../controllers/simulacaoController');

router.post('/', simulacaoController.criarSimulacao);
router.get('/', simulacaoController.listarSimulacoes);
router.put('/:id', simulacaoController.atualizarSimulacao);
router.delete('/:id', simulacaoController.deletarSimulacao);

module.exports = router;