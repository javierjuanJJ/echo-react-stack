import React, {createContext, useContext, useEffect, useState} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check if theme is stored in localStorage
        const savedTheme = localStorage.getItem("theme") as Theme;

        // Check system preference if no saved theme
        if (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }

        return savedTheme || "light";
    });

    // Update theme attribute on document when theme changes
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
