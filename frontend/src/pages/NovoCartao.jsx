import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function NovoCartao() {
    const [nome, setNome] = useState("");
    const [limite, setLimite] = useState("");
    const [vencimento, setVencimento] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/cartoes", { 
                nome, 
                limite: parseFloat(limite), 
                vencimento: parseInt(vencimento), 
             });
            navigate("/cartoes");
        } catch (err) {
            console.error(err);
            alert("Erro ao cadastrar cartão");
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Novo Cartão
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Nome do cartão
                    </label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Limite de crédito
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={limite}
                        onChange={(e) => setLimite(e.target.value)}
                        required
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Dia de vencimento
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="31"
                        value={vencimento}
                        onChange={(e) => setVencimento(e.target.value)}
                        required
                        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition-colors"
                >
                    Salvar
                </button>
            </form>
        </div>
    );
}
