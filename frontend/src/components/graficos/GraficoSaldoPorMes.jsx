import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function GraficoSaldoPorMes({ dados }) {
    if (!dados || dados.length === 0) {
        return <p className="text-gray-500 dark:text-gray-300">Nenhum dado de saldo disponível.</p>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Saldo por Mês</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dados}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="saldo" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}