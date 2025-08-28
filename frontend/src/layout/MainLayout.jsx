import { Link, Outlet } from 'react-router-dom';
import { useState } from "react";

export default function MainLayout() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Botão de menu no mobile */}
            <button
                className="absolute top-4 left-4 z-50 md:hidden bg-blue-700 text-white p-2 rounded"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-full w-64 bg-blue-700 text-white flex flex-col overflow-y-auto transform transition-tranform duration-300 z-40
                ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="p-4 text-2xl font-bold border-b border-blue-500">
                    Minhas Finanças
                </div>
                <nav className="flex flex-col gap-2 p-4">
                    <Link to="/" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 p-2 rounded">🏠 Dashboard</Link>
                    <Link to="/lancamentos" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 p-2 rounded">📜 Lançamentos</Link>
                    <Link to="cartoes" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 p-2 rounded">💳 Cartões</Link>
                    <Link to="simulacoes" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 p-2 rounded">📊 Simulações</Link>
                </nav>
            </aside>

            {/* Área principal */}
            <main className="flex-1 bg-gray-100 p-6  overflow-auto w-full md:ml-0">
                <Outlet />
            </main>
        </div>
    );
}