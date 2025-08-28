import {
    BanknotesIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
    const cards = [
        {
            title: "Saldo Total",
            value: "R$ 12.450,00",
            icon: <BanknotesIcon className="w-6 h-6 text-green-600 dark:text-green-400" />,
            bg: "bg-green-50 dark:bg-gree-900",
        },
        {
            title: "Receitas",
            value: "R$ 7.800,00",
            icon: <ArrowTrendingDownIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            bg: "bg-green-50 dark:bg-gree-900",
        },
        {
            title: "Despesas",
            value: "R$ 5.350,00",
            icon: <BanknotesIcon className="w-6 h-6 text-red-600 dark:text-red-400" />,
            bg: "bg-green-50 dark:bg-gree-900",
        },
        {
            title: "Próximos Lançamentos",
            value: "3 agendados",
            icon: <BanknotesIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
            bg: "bg-green-50 dark:bg-gree-900",
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg shadow-sm ${card.br} transition-colors duration-300`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {card.title}
                            </span>
                            {card.icon}
                        </div>
                        <div className="text-xl font-semibold text-gray-900 dark:text-white">
                            {card.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}