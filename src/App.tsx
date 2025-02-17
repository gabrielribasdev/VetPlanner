import { AuthProvider } from "./context/AuthContext";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import AppRoutes from "./routes/routes";
import { GlobalStyles } from "./styles/globals";

function App() {
    return (
        <ThemeProviderWrapper>
            <GlobalStyles />
            <AuthProvider>
            <AppRoutes />
            </AuthProvider>
        </ThemeProviderWrapper>
    );
}

export default App;
