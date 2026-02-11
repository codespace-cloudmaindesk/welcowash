import { PublicNavbar } from "./components/PublicNavbar/PublicNavbar";
import Footer from './components/Footer/Footer';

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <PublicNavbar />
            <main>{children}</main>
            <Footer />
        </>
    );
};
