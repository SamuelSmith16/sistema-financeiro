import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import CardBase from "../ui/CardBase";

const cores = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#ffbb28"
];

export default function GraficoDespesasPorCategoria({ dados }) {
  if (!dados || dados.length === 0) {
    return <p className="text-gray-500 dark:text-gray-300">Nenhuma despesa para exibir.</p>;
  }

  return (
    <CardBase title="Despesas por Categoria">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dados}
            dataKey="valor"
            nameKey="categoria"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {dados.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </CardBase>
  );
}