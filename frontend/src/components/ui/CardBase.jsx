export default function CardBase({ children, title }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4">
            {title && (
                <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
}