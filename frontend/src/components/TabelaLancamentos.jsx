export default function TabelaLancamentos({ lancamentos }) {
  if (!lancamentos || lancamentos.length === 0) {
    return <p className="text-gray-500 dark:text-gray-300">Nenhum lançamento encontrado.</p>;
  }

  const ordenados = [...lancamentos].sort((a, b) => new Date(b.data) - new Date(a.data));

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-md shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Lançamentos</h2>
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-700">
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Categoria</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          {ordenados.map((lancamento) => (
            <tr key={lancamento._id} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">{new Date(lancamento.data).toLocaleDateString("pt-BR")}</td>
              <td className="px-4 py-2">{lancamento.descricao}</td>
              <td className="px-4 py-2">{lancamento.categoria}</td>
              <td className="px-4 py-2">{lancamento.tipo}</td>
              <td className={`px-4 py-2 font-semibold ${lancamento.tipo === "Receita" ? "text-green-600" : "text-red-500"}`}>
                R$ {lancamento.valor.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}