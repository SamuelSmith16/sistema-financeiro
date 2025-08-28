import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    HomeIcon,
    ClipboardDocumentListIcon,
    CreditCardIcon,
    CalculatorIcon,
} from "@heroicons/react/24/outline";

export default function MainLayout() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const location = useLocation();

    // Fechar menu ao clicar fora no mobile
    useEffect(() => {
        if (!menuOpen) return;
        const handleClickOutside = (e) => {
            if (!e.target.closest("aside") && !e.target.closest("button")) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [menuOpen]);

    return (
        <div className={`${darkMode ? "dark" : ""} flex h-screen flex-col transition-colors duration-300`}>

            {/* Topbar */}
            <header className="flex items-center justify-between bg-white dark:bg-gray-900 shadow px-4 h-14 md:hidden transition-colors duration-300">
                <button
                    className="text-gray-700 dark:text-gray-200 text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
                <h1 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Minhas Finanças</h1>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded transition-colors"
                >
                    {darkMode ? "🌞" : "🌙"}
                </button>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside
                    className={`fixed md:static top-0 h-full w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col overflow-y-auto transform transition-transform duration-300 ease-in-out z-40
            ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
                >
                    <div className="hidden md:flex items-center justify-between p-4 text-xl font-bold border-b border-gray-200 dark:border-gray-700">
                        Minhas Finanças
                        {/* Botão de tema no desktop */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded transition-colors"
                        >
                            {darkMode ? "🌞" : "🌙"}
                        </button>
                    </div>
                    <nav className="flex flex-col gap-1 p-4">
                        <NavItem
                            to="/"
                            icon={<HomeIcon className="w-5 h-5" />}
                            label="Dashboard"
                            active={location.pathname === "/"}
                            onClick={() => setMenuOpen(false)}
                        />
                        <NavItem
                            to="/lancamentos"
                            icon={<ClipboardDocumentListIcon className="w-5 h-5" />}
                            label="Lançamentos"
                            active={location.pathname === "/lancamentos"}
                            onClick={() => setMenuOpen(false)}
                        />
                        <NavItem
                            to="/cartoes"
                            icon={<CreditCardIcon className="w-5 h-5" />}
                            label="Cartões"
                            active={location.pathname === "/cartoes"}
                            onClick={() => setMenuOpen(false)}
                        />
                        <NavItem
                            to="/simulacoes"
                            icon={<CalculatorIcon className="w-5 h-5" />}
                            label="Simulações"
                            active={location.pathname === "/simulacoes"}
                            onClick={() => setMenuOpen(false)}
                        />
                    </nav>
                </aside>

                {/* Conteúdo principal */}
                <main className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 overflow-auto transition-colors duration-300">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

// Componente para itens do menu
function NavItem({ to, icon, label, active, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
        ${active
                    ? "bg-blue-500 text-white shadow-sm"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </Link>
    );
}
