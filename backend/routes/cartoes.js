const express = require('express');
const router = express.Router();
const cartaoController = require('../controllers/cartaoController');

router.post('/', cartaoController.criarCartao);
router.get('/', cartaoController.listarCartoes);
router.put('/:id', cartaoController.atualizarCartao);
router.delete('/:id', cartaoController.deletarCartao);

module.exports = router;