import { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/storeHooks";
import { getUserCountry } from "./features/news/newsActions";
import { loadSavedArticles } from "./features/news/newsSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import NewsModal from "./components/NewsModal";
import Footer from "./components/Footer";
import HomePage from "./views/HomePage";
import SavedPage from "./views/SavedPage";
import SearchPage from "./views/SearchPage";
import Navigation from "./components/Navigation";
import "./utils/helpers/i18n.js";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserCountry());
    dispatch(loadSavedArticles());
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:code" element={<HomePage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <Footer />
        <NewsModal />
      </Container>
    </BrowserRouter>
  );
}

export default App;
