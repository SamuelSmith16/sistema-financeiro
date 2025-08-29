import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function NovoLancamento() {
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("Receita");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!descricao || !valor || !data || !categoria || !tipo) {
            alert("Preencha todos os campos obrigatórios");
            return;
        }

        const valorNum = Number(valor);
        if (isNaN(valorNum) || valorNum <= 0) {
            alert("O valor deve ser maior que zero");
            return;
        }

        try {
            await api.post("/api/lancamentos", {
                descricao,
                valor: parseFloat(valor),
                data,
            });
            navigate("/lancamentos");
        } catch (error) {
            console.error(err);
            alert("Erro ao criar lançamento");
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Novo Lançamento</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Descrição" value={descricao} onChange={setDescricao} />
                <Input label="Valor (R$)" type="number" step="0.01" value={valor} onChange={setValor} />
                <Input label="Data" type="date" value={data} onChange={setData} />
                <Input label="Categoria" value={categoria} onChange={setCategoria} />
                <Select label="Tipo" value={tipo} onChange={setTipo} options={["Receita", "Despesa"]} />
                <SubmitButton cor="blue" />
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
    const cores = { blue: "bg-blue-500 hover:bg-blue-600" };
    return (
        <button type="submit" className={`w-full ${cores[cor]} text-white py-2 rounded transition-colors`}>
            Salvar
        </button>
    );
}