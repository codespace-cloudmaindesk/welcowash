import { Droplets, Twitter, Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const footerLinks = {
        Product: ['Features', 'Pricing', 'Enterprise', 'API'],
        Company: ['About Us', 'Careers', 'Blog', 'Press'],
        Resources: ['Help Center', 'Partners', 'Status', 'Documentation'],
        Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
    };

    return (
        <footer className="relative pt-16 pb-8 border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <a href="#" className="flex items-center gap-2 mb-4 group">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-glow transition-transform group-hover:scale-110">
                                <Droplets className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-heading font-bold text-white tracking-tight">
                                WELCO<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">WASH</span>
                            </span>
                        </a>
                        <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
                            Premium mobile car wash services at your doorstep. Real-time tracking,
                            loyalty rewards, and enterprise-grade reliability.
                        </p>
                        <div className="flex items-center gap-3">
                            {[Twitter, Linkedin, Instagram, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-primary/30">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-heading font-semibold text-white mb-4 tracking-wide">{title}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-muted-foreground hover:text-cyan-400 text-sm transition-colors block hover:translate-x-1 duration-200">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap items-center gap-6 py-6 border-t border-white/5 mb-6">
                    <a href="mailto:hello@welcowash.com" className="flex items-center gap-2 text-muted-foreground hover:text-white text-sm transition-colors">
                        <Mail className="w-4 h-4 text-primary" />
                        hello@welcowash.com
                    </a>
                    <a href="tel:+1234567890" className="flex items-center gap-2 text-muted-foreground hover:text-white text-sm transition-colors">
                        <Phone className="w-4 h-4 text-primary" />
                        +1 (234) 567-890
                    </a>
                    <span className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        Sandton, Johannesburg
                    </span>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/60">
                    <p>© {new Date().getFullYear()} WelcoWash. All rights reserved.</p>
                    <p>Designed by cloudstudio</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
