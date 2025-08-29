import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import CardBase from "../ui/CardBase";

export default function GraficoSaldoPorMes({ dados }) {
    if (!dados || dados.length === 0) {
        return <p className="text-gray-500 dark:text-gray-300">Nenhum dado de saldo disponível.</p>;
    }

    return (
        <CardBase title="Saldo por Mês">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dados}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="saldo" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </CardBase>
    );
}