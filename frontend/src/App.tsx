import { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Component Imports
import { Navbar } from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import { GalleryPage } from "./pages/Gallery";
import HowItWorks from "./pages/HowItWorks";

// Create placeholder components for other pages to avoid errors
const Services = () => <div style={{ paddingTop: '100px' }}>Services Page</div>;

// const Pricing = () => <div style={{ paddingTop: '100px' }}>Pricing Page</div>;
// const Enterprise = () => <div style={{ paddingTop: '100px' }}>Enterprise Page</div>;

function App(): JSX.Element {
  return (
    <Router>
      {/* The Navbar is placed OUTSIDE of <Routes>. 
        This makes it "Global" so it doesn't re-render or disappear 
        when the user navigates between pages.
      */}
      <Navbar />

      <main>
        <Routes>
          {/* Define the URL paths for your detailing business */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />

          {/* Fallback for 404 - Page Not Found */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;