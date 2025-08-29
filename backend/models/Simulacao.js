const mongoose = require('mongoose');

const SimulacaoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    valor_total: { type: Number, required: true },
    quantidade_parcelas: { type: Number, required: true },
    juros_ao_mes: { type: Number },
    valor_parcela: { type: Number },
    valor_total_com_juros: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Simulacao', SimulacaoSchema);