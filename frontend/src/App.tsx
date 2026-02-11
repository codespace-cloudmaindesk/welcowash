import { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppointmentProvider } from "@/Providers/appointment-provider";

// Component Imports
import { PublicNavbar } from "@/app/layout/components/PublicNavbar";
import Footer from "@/app/layout/components/Footer";
import Home from "@/pages/Home";
import { GalleryPage } from "@/pages/Gallery";
import HowItWorks from "@/pages/HowItWorks";

// Create placeholder components for other pages to avoid errors
const Services = () => <div style={{ paddingTop: '100px' }}>Services Page</div>;
const Pricing = () => <div style={{ paddingTop: '100px' }}>Coming Soon</div>;
const Enterprise = () => <div style={{ paddingTop: '100px' }}>Coming Soon</div>;

function App(): JSX.Element {
  return (
    <AppointmentProvider>
      <Router>
        {/* The Navbar is placed OUTSIDE of <Routes>. 
            This makes it "Global" so it doesn't re-render or disappear 
            when the user navigates between pages.
          */}
        <PublicNavbar />

        <main>
          <Routes>
            {/* Define the URL paths for your detailing business */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/enterprise" element={<Enterprise />} />

            {/* Fallback for 404 - Page Not Found */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </AppointmentProvider>

  );
}

export default App;