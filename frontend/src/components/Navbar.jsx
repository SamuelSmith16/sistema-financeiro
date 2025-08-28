import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white p-4 flex gap-4">
            <Link to="/">Dashboard</Link>
            <Link to="/lancamentos">Lançamentos</Link>
            <Link to="/cartoes">Cartões</Link>
            <Link to="/simulacoes">Simulações</Link>
        </nav>
    );
}