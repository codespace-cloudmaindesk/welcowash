export const navbarStyles = {
    layout: {
        root: 'fixed top-0 left-0 w-full z-[1000] transition-all duration-300',
        top: 'h-24 bg-transparent',
        scrolled: 'h-16 bg-[#1e2233]/70 backdrop-blur-md shadow-lg',
        inner: 'max-w-[1400px] w-[92%] mx-auto flex items-center justify-between h-full',
    },

    logo: {
        wrap: 'group flex items-center gap-3 select-none',
        icon: 'w-10 h-10 rounded-xl bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110',
        text: 'text-xl font-extrabold tracking-tight',
        accent: 'text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600',
    },

    link: {
        base: 'relative font-semibold uppercase tracking-wider transition-all duration-300',
        desktop: 'text-sm after:content-[""] after:block after:h-[2px] after:bg-linear-to-r after:from-cyan-400 after:to-purple-500 after:w-0 hover:after:w-full',
        mobile: 'text-xl text-gray-300 hover:text-cyan-400 hover:scale-105 transition-transform transition-colors duration-300 hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]',
        active: 'text-white',
    },

    desktopNav: 'hidden lg:flex items-center gap-9',

    hamburger: {
        btn: 'flex flex-col lg:hidden gap-1.5 cursor-pointer z-50 focus:outline-none',
        line: 'block h-0.5 w-6 bg-white transition-transform duration-300',
        fade: 'transition-opacity duration-300',
    },

    mobileMenu: {
        base: 'fixed top-0 right-0 w-full h-screen bg-[#1e2233]/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-transform lg:hidden',
        open: 'translate-x-0',
        closed: 'translate-x-full',
    },

    cta: 'bg-linear-to-r from-blue-500 to-cyan-400 text-white uppercase font-bold px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105',
};
