import { useState } from "react";
import Input from "../components/form/Input";

export default function NovaSimulacao() {
  const [form, setForm] = useState({
    titulo: "",
    valor_total: "",
    quantidade_parcelas: "",
    juros_ao_mes: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validar = () => {
    const novosErros = {};
    if (!form.titulo.trim()) novosErros.titulo = "Título é obrigatório";
    if (!form.valor_total || Number(form.valor_total) <= 0) novosErros.valor_total = "Valor deve ser maior que zero";
    if (!form.quantidade_parcelas || Number(form.quantidade_parcelas) < 1) novosErros.quantidade_parcelas = "Parcelas deve ser >= 1";
    return novosErros;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErrors(novosErros);
      return;
    }

    try {
      const res = await fetch("https://<seu-backend>.onrender.com/simulacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Erro ao salvar simulação");

      setSuccess("Simulação salva com sucesso!");
      setForm({ titulo: "", valor_total: "", quantidade_parcelas: "", juros_ao_mes: "" });
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Nova Simulação</h2>

      <Input label="Título" name="titulo" value={form.titulo} onChange={handleChange} required error={errors.titulo} />
      <Input label="Valor Total" name="valor_total" value={form.valor_total} onChange={handleChange} required error={errors.valor_total} />
      <Input label="Parcelas" name="quantidade_parcelas" value={form.quantidade_parcelas} onChange={handleChange} required error={errors.quantidade_parcelas} />
      <Input label="Juros ao mês (%)" name="juros_ao_mes" value={form.juros_ao_mes} onChange={handleChange} />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Salvar
      </button>

      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
    </form>
  );
}