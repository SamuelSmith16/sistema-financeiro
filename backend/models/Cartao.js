const mongoose = require('mongoose');

const CartaoSchema = new mongoose.Schema({
    banco: { type: String, required: true },
    numero: { type: String, required: true },
    limite: { type: Number, required: true },
    vencimento_fatura: { type: Number, required: true },
    melhor_data_compra: { type: Number, required: true },
    tipo: { type: String, enum: ['Crédito', 'Débito', 'Múltiplo'], required: true },
}, {timestamps: true });

module.exports = mongoose.model('Cartao', CartaoSchema);