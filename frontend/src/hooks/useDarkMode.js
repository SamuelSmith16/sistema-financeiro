import { useEffect, useState } from "react";

export default function useDarkMode() {
    const [theme, setTheme] = useState(() => {
        // Tenta ler o tema salvo; se não existir, usa o claro
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, setTheme];
}
