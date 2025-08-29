import { useState } from "react";
import Input from "../components/form/Input";

export default function NovoLancamento() {
    const [form, setForm] = useState({
        descricao: "",
        data: "",
        categoria: "",
        tipo: "",
        valor: ""
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [apiError, setApiError] = useState("");
    const baseURL = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validar = () => {
        const novosErros = {};
        if (!form.descricao.trim()) novosErros.descricao = "Descrição é obrigatória";
        if (!form.data) novosErros.data = "Data é obrigatória";
        if (!form.categoria.trim()) novosErros.categoria = "Categoria é obrigatória";
        if (!["Receita", "Despesa"].includes(form.tipo)) novosErros.tipo = "Tipo deve ser Receita ou Despesa";
        if (!form.valor || Number(form.valor) <= 0) novosErros.valor = "Valor deve ser maior que zero";
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
            const res = await fetch(`${baseURL}/api/lancamentos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error("Erro ao salvar lançamento");

            setSuccess("Lançamento salvo com sucesso!");
            setForm({ descricao: "", data: "", categoria: "", tipo: "", valor: "" });
        } catch (err) {
            setApiError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Novo Lançamento</h2>

            <Input label="Descrição" name="descricao" value={form.descricao} onChange={handleChange} required error={errors.descricao} />
            <Input label="Data" name="data" value={form.data} onChange={handleChange} required error={errors.data} />
            <Input label="Categoria" name="categoria" value={form.categoria} onChange={handleChange} required error={errors.categoria} />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Tipo</label>
                <select
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.tipo ? "border-red-500" : "border-gray-300"
                        }`}
                >
                    <option value="">Selecione</option>
                    <option value="Receita">Receita</option>
                    <option value="Despesa">Despesa</option>
                </select>
                {errors.tipo && <p className="text-red-500 text-xs mt-1">{errors.tipo}</p>}
            </div>

            <Input label="Valor" name="valor" value={form.valor} onChange={handleChange} required error={errors.valor} />

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                Salvar
            </button>

            {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
            {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
        </form>
    );
}