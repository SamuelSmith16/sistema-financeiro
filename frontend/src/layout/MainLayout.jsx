import { Link, Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-700 text-white flex flex-col">
                <div className="p-4 text-2xl font-bold border-b border-blue-500">
                    Minhas Finanças
                </div>
                <nav className="flex felx-col gap-2 p-4">
                    <Link to="/" className="hover:bg-blue-600 p-2 rounded">🏠 Dashboard</Link>
                    <Link to="/lancamentos" className="hover:bg-blue-600 p-2 rounded">📜 Lançamentos</Link>
                    <Link to="/cartoes"  className="hover:bg-blue-600 p-2 rounded">💳 Cartões</Link>
                    <Link to="/simulacoes" className="hover:bg-blue-600 p-2 rounded">📊 Simulações</Link>
                </nav>
            </aside>

            {/* Conteudo Principal */}
            <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}