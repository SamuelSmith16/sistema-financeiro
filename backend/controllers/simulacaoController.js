const Simulacao = require('../models/Simulacao');
const { calcularJurosAoMes } = require('../utils/calculos');

exports.criarSimulacao = async (req, res) => {
  try {
    let { titulo, valor_total, quantidade_parcelas, juros_ao_mes, valor_parcela } = req.body;

    if (!titulo || !valor_total || !quantidade_parcelas) {
      return res.status(400).json({ error: "Campos obrigatórios: titulo, valor_total, quantidade_parcelas" });
    }

    valor_total = Number(valor_total);
    quantidade_parcelas = Number(quantidade_parcelas);

    if (valor_total <= 0 || quantidade_parcelas < 1) {
      return res.status(400).json({ error: "Valor total deve ser > 0 e parcelas >= 1" });
    }

    if (juros_ao_mes !== undefined && juros_ao_mes !== "") {
      juros_ao_mes = Number(juros_ao_mes);
      if (juros_ao_mes < 0) {
        return res.status(400).json({ error: "Juros ao mês não pode ser negativo" });
      }
      const taxa = juros_ao_mes / 100;
      const totalComJuros = valor_total * Math.pow(1 + taxa, quantidade_parcelas);
      valor_parcela = totalComJuros / quantidade_parcelas;
    } else {
      const taxaPadrao = 0.02;
      const totalComJuros = valor_total * Math.pow(1 + taxaPadrao, quantidade_parcelas);
      valor_parcela = totalComJuros / quantidade_parcelas;
      juros_ao_mes = taxaPadrao * 100;
    }

    const valor_total_com_juros = valor_parcela * quantidade_parcelas;

    const novaSimulacao = new Simulacao({
      titulo,
      valor_total,
      quantidade_parcelas,
      juros_ao_mes,
      valor_parcela,
      valor_total_com_juros
    });

    const salva = await novaSimulacao.save();
    res.status(201).json(salva);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarSimulacoes = async (req, res) => {
  try {
    const simulacoes = await Simulacao.find();
    res.json(simulacoes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.atualizarSimulacao = async (req, res) => {
  try {
    const atualizado = await Simulacao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ error: 'Simulação não encontrada' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletarSimulacao = async (req, res) => {
  try {
    const removido = await Simulacao.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ error: 'Simulação não encontrada' });
    res.json({ message: 'Simulação removida com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};