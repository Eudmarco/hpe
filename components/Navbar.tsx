import React from 'react';

interface NavbarProps {
  logoSrc: string;
  navItems: { id: string; label: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ logoSrc, navItems }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full bg-[#FF8000] bg-opacity-95 text-white shadow-lg z-50 p-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-2">
          <img src={logoSrc} alt="HPE Logo" className="h-[60px] w-auto" />
          <span className="text-xl font-bold">HPE Elétrica</span>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button (hamburger icon) */}
          <button
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              if (menu) menu.classList.toggle('hidden');
            }}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <ul
          id="mobile-menu"
          className="hidden md:flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 w-full md:w-auto"
        >
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="block py-2 px-3 text-white hover:text-white transition duration-300 w-full text-left"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;