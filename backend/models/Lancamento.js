const mongoose = require('mongoose');

const LancamentoSchema = new mongoose.Schema({
    data: { type: Date, required: true },
    descricao: { type: String, required: true },
    categoria: { type: String},
    tipo: { type: String, enum: ['Receita', 'Despesa'] },
    valor: { type: Number, required: true },
    forma_pagamento: { type: String },
    parcelado: { type: Boolean },
    parcelas: { type: Number },
    parcela_atual: { type: Number },
    fornecedor: { type: String },
    observacoes: { type: String },
    id_cartao: { type: String }
});

module.exports = mongoose.model('Lancamento', LancamentoSchema);