import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ IMPORT ALL PAGES
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import About from "./pages/About";
import Features from "./pages/Features";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 🏠 HOME */}
          <Route path="/" element={<Home />} />

          {/* 📤 UPLOAD */}
          <Route path="/upload" element={<Upload />} />

          {/* 📊 RESULTS */}
          <Route path="/results" element={<Results />} />

          {/* 👥 ABOUT */}
          <Route path="/about" element={<About />} />

          <Route path="/features" element={<Features />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;