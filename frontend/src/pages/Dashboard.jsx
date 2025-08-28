import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    BanknotesIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CalendarDaysIcon,
    PlusCircleIcon,
    CreditCardIcon,
    CalculatorIcon,
} from "@heroicons/react/24/outline";

// Função para formatar valores monetários
const formatCurrency = (value) => 
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);

export default function Dashboard() {
    const [recentes, setRecentes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/lancamentos?limit=5")
        .then(res => setRecentes(res.data))
        .catch(err => console.error(err));
    }, []);

    const cards = [
        {
            title: "Saldo Total",
            value: 12450,
            icon: <BanknotesIcon className="w-6 h-6 text-green-600 dark:text-green-400" />,
            ring: "ring-green-200 dark:ring-green-700",
        },
        {
            title: "Receitas",
            value: 7800,
            icon: <ArrowTrendingUpIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            ring: "ring-blue-200 dark:ring-blue-700",
        },
        {
            title: "Despesas",
            value: 5350,
            icon: <ArrowTrendingDownIcon className="w-6 h-6 text-red-600 dark:text-red-400" />,
            ring: "ring-red-200 dark:ring-red-700",
        },
        {
            title: "Próximos Lançamentos",
            value: "3 agendados",
            icon: <CalendarDaysIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
            ring: "ring-yellow-200 dark:ring-yellow-700",
        },
    ];

    return (
        <div>

            {/* Título + Ações rápidas */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
                <div className="flex flex-wrap gap-3">
                    <Link
                        to="/lancamentos/novo"
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        <PlusCircleIcon className="w-5 h-5" />
                        Novo Lançamento
                    </Link>
                    <Link
                        to="/cartoes/novo"
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        <CreditCardIcon className="w-5 h-5" />
                        Novo Cartão
                    </Link>
                    <Link
                        to="/simulacoes/nova"
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        <CalculatorIcon className="w-5 h-5" />
                        Nova Simulação
                    </Link>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={"p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-900"}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {card.title}
                            </span>
                            <div className={`p-2 rounded-full bg-white dark:bg-gray-800 ring-2 ${card.ring}`}>
                                {card.icon}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {typeof card.value === "number" ? formatCurrency(card.value) : card.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabela de lançamentos recentes */}
            <h2 className="text-lg front-semibold mb-3 text-gray-800 dark:text-gray-100 flex items-center justify-between">
                Lançamentos Recentes
                <Link
                    to="/lancamentos"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                    Ver todos
                </Link>
            </h2>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-x-auto max-h-96">
                <table className="min-w-full text-sm text-left">
                    <thead  className="sticky top-0 z-10 bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="py-3 px-4 text-gray-900 dark:text-gray-50 font-semibold">Descrição</th>
                            <th className="py-3 px-4 text-gray-900 dark:text-gray-50 font-semibold">Valor</th>
                            <th className="py-3 px-4 text-gray-900 dark:text-gray-50 font-semibold">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentes.map((l, idx) => (
                            <tr 
                                key={l._id}
                                className={`transition-colors duration-200 ${
                                    idx % 2 === 0
                                        ? "bg-gray-50 dark:bg-gray-800"
                                        : "bg-white dark:bg-gary-900"
                                } hover:bg-gray-100 dark:hover:bg-gray-700`}
                                >
                                    <td className="py-2 px-4 text-gray-800 dark:text-gray-100">{l.descricao}</td>
                                    <td className="py-2 px-4 text-gray-800 dark:text-gray-100">
                                        {formatCurrency(l.valor)}
                                    </td>
                                    <td className="py-2 px-4 text-gray-600 dark:text-gray-300">
                                    {new Date(l.data).toLocaleDateString("pt-BR")}
                                </td>
                            </tr>
                        ))}
                        {recentes.length === 0 && (
                            <tr>
                                <td 
                                    colSpan="3"
                                    className="py-3 px-4 text-gray-500 dark:text-gray-400 text-center"
                                    >
                                    Nenhum lançamento encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}