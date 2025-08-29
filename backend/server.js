require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log(err));

// Rotas
app.use('/api/lancamentos', require('./routes/lancamentos'));
app.use('/api/cartoes', require('./routes/cartoes'));
app.use('/api/simulacoes', require('./routes/simulacoes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});