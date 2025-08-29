import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function NovaSimulacao() {
    const [tipo, setTipo] = useState("parcelamento");
    const [valor, setValor] = useState("");
    const [parcelas, setParcelas] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/simulacoes", { tipo, valor, parcelas });
            navigate("/simulacoes");
        } catch (err) {
            console.error(err);
            alert("Erro ao criar simulação");
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Nova Simulação
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Tipo de simulação
                    </label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                        <option value="parcelamento">Parcelamento</option>
                        <option value="investimento">Investimento</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Valor
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        required
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Número de parcelas
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={parcelas}
                        onChange={(e) => setParcelas(e.target.value)}
                        required
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition-colors"
                >
                    Salvar
                </button>
            </form>
        </div>
    );
}
