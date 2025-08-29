import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function NovaSimulacao() {
    const [titulo, setTitulo] = useState("");
    const [valorTotal, setValorTotal] = useState("");
    const [quantidadeParcelas, setQuantidadeParcelas] = useState("");
    const [jurosAoMes, setJurosAoMes] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!titulo || !valorTotal || !quantidadeParcelas) {
            alert("Preencha todos os campos obrigatórios");
            return;
        }

        const valorNum = Number(valorTotal);
        const parcelasNum = Number(quantidadeParcelas);

        if (valorNum <= 0 || parcelasNum < 1) {
            alert("Verifique os valores inseridos");
            return;
        }

        const payload = {
            titulo: titulo.trim(),
            valor_total: valorNum,
            quantidade_parcelas: parcelasNum,
        };

        // Só envia juros se o usuário preencher
        if (jurosAoMes !== "") {
            const jurosNum = Number(jurosAoMes);
            if (jurosNum < 0) {
                alert("Juros ao mês não pode ser negativo");
                return;
            }
            payload.juros_ao_mes = jurosNum;
        }

        try {
            await api.post("/api/simulacoes", payload);
            navigate("/simulacoes");
        } catch (err) {
            console.error(err);
            alert("Erro ao criar simulação");
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Nova Simulação</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Título" value={titulo} onChange={setTitulo} required={true} />
                <Input label="Valor Total (R$)" type="number" step="0.01" value={valorTotal} onChange={setValorTotal} required={true} />
                <Input label="Quantidade de Parcelas" type="number" min="1" value={quantidadeParcelas} onChange={setQuantidadeParcelas} required={true} />
                <Input label="Juros ao mês (%)" type="number" step="0.01" min="0" value={jurosAoMes} onChange={setJurosAoMes} required={false} />
                <SubmitButton cor="yellow" />
            </form>
        </div>
    );
}

function Input({ label, type = "text", value, onChange, step, min, required }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                type={type}
                step={step}
                min={min}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
        </div>
    );
}

function SubmitButton({ cor }) {
    const cores = {
        yellow: "bg-yellow-500 hover:bg-yellow-600"
    };
    return (
        <button type="submit" className={`w-full ${cores[cor]} text-white py-2 rounded transition-colors`}>
            Salvar
        </button>
    );
}
