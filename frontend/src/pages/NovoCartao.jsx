import { useState } from "react";
import Input from "../components/form/Input";

export default function NovoCartao() {
    const [form, setForm] = useState({
        banco: "",
        numero: "",
        limite: "",
        vencimento_fatura: "",
        melhor_data_compra: "",
        tipo: ""
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
        if (!form.banco.trim()) novosErros.banco = "Banco é obrigatório";
        if (!form.numero.trim()) novosErros.numero = "Número do cartão é obrigatório";
        if (!form.limite || Number(form.limite) <= 0) novosErros.limite = "Limite deve ser maior que zero";
        if (!form.vencimento_fatura || Number(form.vencimento_fatura) < 1 || Number(form.vencimento_fatura) > 31)
            novosErros.vencimento_fatura = "Vencimento deve estar entre 1 e 31";
        if (!form.melhor_data_compra || Number(form.melhor_data_compra) < 1 || Number(form.melhor_data_compra) > 31)
            novosErros.melhor_data_compra = "Melhor data deve estar entre 1 e 31";
        if (!["Crédito", "Débito", "Pré-pago"].includes(form.tipo)) novosErros.tipo = "Tipo inválido";
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
            const res = await fetch(`${baseURL}/api/cartoes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error("Erro ao salvar cartão");

            setSuccess("Cartão salvo com sucesso!");
            setForm({
                banco: "",
                numero: "",
                limite: "",
                vencimento_fatura: "",
                melhor_data_compra: "",
                tipo: ""
            });
        } catch (err) {
            setApiError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Novo Cartão</h2>

            <Input label="Banco" name="banco" value={form.banco} onChange={handleChange} required error={errors.banco} />
            <Input label="Número do Cartão" name="numero" value={form.numero} onChange={handleChange} required error={errors.numero} />
            <Input label="Limite" name="limite" value={form.limite} onChange={handleChange} required error={errors.limite} />
            <Input label="Vencimento da Fatura" name="vencimento_fatura" value={form.vencimento_fatura} onChange={handleChange} required error={errors.vencimento_fatura} />
            <Input label="Melhor Data de Compra" name="melhor_data_compra" value={form.melhor_data_compra} onChange={handleChange} required error={errors.melhor_data_compra} />

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
                    <option value="Crédito">Crédito</option>
                    <option value="Débito">Débito</option>
                    <option value="Pré-pago">Pré-pago</option>
                </select>
                {errors.tipo && <p className="text-red-500 text-xs mt-1">{errors.tipo}</p>}
            </div>

            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
                Salvar
            </button>

            {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
            {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
        </form>
    );
}