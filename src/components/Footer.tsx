import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Sobre Nós', href: '#sobre' },
    { name: 'Serviços', href: '#serviços' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' }
  ];

  const services = [
    'Hidratação Capilar com Brushing',
    'Manicure com Gelinho',
    'Pedicure com Gelinho',
    'Manutenção de Acrílico',
    'Depilação com Linha',
    'Depilação com Cera',
    'Limpeza Facial Profissional',
    'Cabelo Liso'
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/lavie.esbella_spa', name: 'Instagram' }
  ];

  const scrollToSection = (sectionId: string) => {
    try {
      const element = document.getElementById(sectionId.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.warn('Erro ao navegar para seção:', error);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">LV</span>
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-bold">La Vie Esbella</h3>
                <p className="text-amber-400 text-sm">Spa & Wellness</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Há mais de 15 anos proporcionando experiências únicas de bem-estar, 
              relaxamento e renovação em um ambiente de puro luxo e sofisticação.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-900 transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-xl font-bold mb-6 text-amber-400">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-xl font-bold mb-6 text-amber-400">
              Nossos Serviços
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300 hover:text-amber-400 transition-colors duration-300 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-xl font-bold mb-6 text-amber-400">
              Contato
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-gray-300">Condomínio Pitanga Casa A1</p>
                  <p className="text-gray-400 text-sm">Talatona - Luanda/Angola</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="text-amber-400 flex-shrink-0" size={20} />
                <div>
                  <p className="text-gray-300">+244 930 025 350</p>
                  <p className="text-gray-400 text-sm">WhatsApp disponível</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="text-amber-400 flex-shrink-0" size={20} />
                <div>
                  <p className="text-gray-300">contato@lavieesbellasp.com.br</p>
                  <p className="text-gray-400 text-sm">Resposta em até 2h</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <h5 className="font-medium text-amber-400 mb-2">Horário de Funcionamento</h5>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Segunda a Sábado: 8h às 18h</p>
                <p>Domingo: Fechado</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h4 className="font-playfair text-2xl font-bold mb-4 text-amber-400">
              Receba Nossas Novidades
            </h4>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Inscreva-se em nossa newsletter e seja o primeiro a saber sobre 
              promoções exclusivas, novos tratamentos e dicas de bem-estar.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-amber-400 text-white"
              />
              <button className="bg-amber-900 hover:bg-amber-800 px-6 py-3 rounded-r-lg transition-colors duration-300">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>
                © {currentYear} La Vie Esbella Spa. Todos os direitos reservados.
              </p>
              <p className="mt-1">
                Desenvolvido com <Heart className="inline w-4 h-4 text-red-500 mx-1" fill="currentColor" /> 
                para proporcionar experiências únicas.
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;