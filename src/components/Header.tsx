import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-amber-900 text-white py-2 px-4 text-xs sm:text-sm">
        <div className="w-full px-2">
          <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-4 lg:space-x-6 flex-wrap">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Phone size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">+244 930 025 350</span>
              <span className="sm:hidden">930 025 350</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin size={14} />
              <span className="hidden lg:inline">Condomínio Pitanga Casa A1 - Talatona Luanda</span>
              <span className="lg:hidden">Talatona, Luanda</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Seg-Sáb: 8h-18h</span>
              <span className="sm:hidden">Seg-Sáb: 8h-18h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed w-full z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="w-full px-0">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3 ml-4">
              <div>
                <h1 className={`font-playfair text-xl sm:text-2xl font-bold transition-colors ${
                  isScrolled ? 'text-amber-900' : 'text-white'
                }`}>
                  La Vie Esbella
                </h1>
                <p className={`text-xs sm:text-sm transition-colors ${
                  isScrolled ? 'text-amber-700' : 'text-white/90'
                }`}>
                  Spa & Wellness
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              {['Início', 'Sobre', 'Serviços', 'Galeria', 'Depoimentos', 'Contato'].map((item, index) => (
                <a
                  key={item}
                  href={`#${index === 0 ? 'hero' : item.toLowerCase().replace('ç', 'c').replace('ô', 'o')}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(index === 0 ? 'hero' : item.toLowerCase().replace('ç', 'c').replace('ô', 'o'));
                  }}
                  className={`elemento-animado font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-2 py-1 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-amber-900 focus:ring-amber-600'
                      : 'text-white hover:text-amber-200 focus:ring-white'
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden elemento-animado p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-700 hover:text-amber-900 focus:ring-amber-600'
                  : 'text-white hover:text-amber-200 focus:ring-white'
              }`}
              aria-label="Menu de navegação"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } ${isScrolled ? 'bg-white border-t border-gray-200' : 'bg-black/90 backdrop-blur-sm'}`}>
          <nav className="py-2">
            {['Início', 'Sobre', 'Serviços', 'Galeria', 'Depoimentos', 'Contato'].map((item, index) => (
              <a
                key={item}
                href={`#${index === 0 ? 'hero' : item.toLowerCase().replace('ç', 'c').replace('ô', 'o')}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(index === 0 ? 'hero' : item.toLowerCase().replace('ç', 'c').replace('ô', 'o'));
                }}
                className={`elemento-animado block w-full text-left px-6 py-3 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-amber-50 hover:text-amber-900 focus:ring-amber-600'
                    : 'text-white hover:bg-white/10 hover:text-amber-200 focus:ring-white'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
