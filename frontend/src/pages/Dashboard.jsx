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
            ring: "ring-green-200 dark:ring-green-700",
        },
        {
            title: "Receitas",
            value: "R$ 7.800,00",
            icon: <ArrowTrendingUpIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            ring: "ring-blue-200 dark:ring-blue-700",
        },
        {
            title: "Despesas",
            value: "R$ 5.350,00",
            icon: <ArrowTrendingDownIcon className="w-6 h-6 text-red-600 dark:text-red-400" />,
            ring: "ring-red-200 dark:ring-red-700",
        },
        {
            title: "Próximos Lançamentos",
            value: "3 agendados",
            icon: <CalendarDaysIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
            ring: "ring-yellow-200 dark:ring-yellow-700",
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-900`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {card.title}
                            </span>
                            <div className={`p-2 rounded-full bg-white dark:bg-gray-800 ring-2 ${card.ring}`}>
                                {card.icon}
                            </div>
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