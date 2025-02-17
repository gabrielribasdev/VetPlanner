import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../theme/theme";

interface ThemeContextType {
    theme: typeof lightTheme;
    themeName: "light" | "dark";
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedTheme = localStorage.getItem("theme") as | "light" | "dark" | null;
    const [themeName, setThemeName] = useState<"light" | "dark">( storedTheme || "light");

    useEffect(() => {
        localStorage.setItem("theme", themeName);
    }, [themeName]);

    const toggleTheme = () => {
        setThemeName((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const theme = themeName === "light" ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error(
            "useTheme deve ser usado dentro de ThemeProviderComponent"
        );
    return context;
};
