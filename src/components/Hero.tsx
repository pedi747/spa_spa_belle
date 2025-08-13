import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  // Removido estado de visibilidade para melhor performance

  const scrollToNext = () => {
    const aboutSection = document.getElementById('sobre');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-playfair text-3xl sm:text-5xl md:text-7xl font-bold mb-2">
            La Vie Esbella
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light tracking-wide">
            Spa & Wellness
          </p>
        </div>

        {/* Slogan */}
        <div className="mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
          <h2 className="font-playfair text-xl sm:text-2xl md:text-4xl mb-4 leading-relaxed">
            Onde o Luxo Encontra o Bem-Estar
          </h2>
        </div>

        {/* CTA Buttons */}
        <div className="btn-group flex flex-col sm:flex-row gap-4 justify-center px-4">
          <button
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            className="elemento-animado group relative bg-amber-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-colors duration-200 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
          >
            <span className="relative z-10">Fale Conosco</span>
          </button>
          <button
            onClick={() => document.getElementById('serviços')?.scrollIntoView({ behavior: 'smooth' })}
            className="elemento-animado group relative bg-white/20 text-white border-2 border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-colors duration-200 hover:bg-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            <span className="relative z-10">Nossos Serviços</span>
          </button>
        </div>

        {/* Scroll Indicator - Removido animate-bounce problemático */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToNext}
            className="elemento-animado text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-full p-2"
            aria-label="Rolar para próxima seção"
          >
            <ChevronDown size={28} className="md:w-8 md:h-8" />
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400/60 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-amber-300/40 rounded-full animate-float-delayed"></div>
      <div className="absolute bottom-40 left-20 w-1 h-1 bg-white/60 rounded-full animate-float"></div>
    </section>
  );
};

export default Hero;
