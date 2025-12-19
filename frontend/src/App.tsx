import { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Component Imports
import { Navbar } from "./components/layout/Navbar";
import Home from "./pages/Home/Home";

// Create placeholder components for other pages to avoid errors
const Services = () => <div style={{ paddingTop: '100px' }}>Services Page</div>;
const Gallery = () => <div style={{ paddingTop: '100px' }}>Gallery Page</div>;

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
          <Route path="/gallery" element={<Gallery />} />

          {/* Fallback for 404 - Page Not Found */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* You would typically add a <Footer /> here later */}
    </Router>
  );
}

export default App;