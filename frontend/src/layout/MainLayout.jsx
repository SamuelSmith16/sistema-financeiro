import { Link, Outlet } from 'react-router-dom';
import { useState } from "react";

export default function MainLayout() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex h-screen flex-col">

            {/* Topbar estilo Airbnb */}
            <header className="flex items-center justify-between bg-white shadow px-4 h-14 md:hidden">
                <button
                    className="text-gray-700 text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
                <h1 className="font-bold text-lg">Minhas Finanças</h1>
                <div className="w-8"></div> {/* Espaço para balancear */}
            </header>

            <div className="flex flex-1">

                {/* Sidebar */}
                <aside
                    className={`fixed md:static top-0 md:top-auto h-full w-64 bg-blue-700 text-white flex flex-col overflow-y-auto transform transition-tranform duration-300 z-40
                    ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
                >
                    <div className="hidden md:block p-4 text-2xl font-bold border-b border-blue-500">
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
        </div>
    );
}