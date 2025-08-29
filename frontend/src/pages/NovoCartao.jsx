import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function NovoCartao() {
    const [banco, setBanco] = useState("");
    const [numero, setNumero] = useState("");
    const [limite, setLimite] = useState("");
    const [vencimentoFatura, setVencimentoFatura] = useState("");
    const [melhorDataCompra, setMelhorDataCompra] = useState("");
    const [tipo, setTipo] = useState("Crédito");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação básica
        if (!banco || !numero || !limite || !vencimentoFatura || !melhorDataCompra || !tipo) {
            alert("Preencha todos os campos obrigatórios");
            return;
        }

        const limiteNum = Number(limite);
        const vencNum = Number(vencimentoFatura);
        const melhorNum = Number(melhorDataCompra);

        if (isNaN(limiteNum) || limiteNum <= 0) {
            alert("O limite deve ser um número maior que zero");
            return;
        }
        if (vencNum < 1 || vencNum > 31) {
            alert("O vencimento da fatura deve ser entre 1 e 31");
            return;
        }
        if (melhorNum < 1 || melhorNum > 31) {
            alert("A melhor data de compra deve ser entre 1 e 31");
            return;
        }

        try {
            await api.post("/api/cartoes", {
                banco,
                numero,
                limite: limiteNum,
                vencimento_fatura: vencNum,
                melhor_data_compra: melhorNum,
                tipo
            });
            navigate("/cartoes");
        } catch (err) {
            console.error(err);
            alert("Erro ao cadastrar cartão");
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Novo Cartão</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Banco" value={banco} onChange={setBanco} />
                <Input label="Número do cartão" value={numero} onChange={setNumero} />
                <Input label="Limite (R$)" type="number" step="0.01" value={limite} onChange={setLimite} />
                <Input label="Vencimento da fatura" type="number" min="1" max="31" value={vencimentoFatura} onChange={setVencimentoFatura} />
                <Input label="Melhor data de compra" type="number" min="1" max="31" value={melhorDataCompra} onChange={setMelhorDataCompra} />
                <Select label="Tipo" value={tipo} onChange={setTipo} options={["Crédito", "Débito", "Múltiplo"]} />
                <SubmitButton cor="green" />
            </form>
        </div>
    );
}

function Input({ label, type = "text", value, onChange, step, min, max }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                type={type}
                step={step}
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
        </div>
    );
}

function Select({ label, value, onChange, options }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}

function SubmitButton({ cor }) {
    const cores = {
        green: "bg-green-500 hover:bg-green-600"
    };
    return (
        <button type="submit" className={`w-full ${cores[cor]} text-white py-2 rounded transition-colors`}>
            Salvar
        </button>
    );
}