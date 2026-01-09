import { Routes, Route, useLocation } from "react-router-dom";

// CONTEXT
import { useLanguage } from "./context/languageContext";

// COMPONENTS
import Header from "./components/Header";

// PAGES
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";



function App() {
    const { lang, translations } = useLanguage();
    const location = useLocation();

    return (
        <div className="App">
            <Header location={location} />

            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage t={translations} />
                    }
                />
                <Route
                    path="/about"
                    element={
                        <AboutPage t={translations} lang={lang} />
                    }
                />
                <Route
                    path="/services/*"
                    element={
                        <ServicesPage t={translations} loc={location} />
                    }
                />
                <Route
                    path="/*"
                    element={
                        <NotFound />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
