import React, { useEffect, useRef, useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';

const Services = () => {
  // Removido intersection observer para melhor performance

  const handleWhatsAppService = (serviceName: string) => {
    const phoneNumber = '244930025350';
    const message = encodeURIComponent(
      `Olá! Gostaria de saber mais sobre o serviço "${serviceName}". Poderia me informar o preço e disponibilidade para agendamento?`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const services = [
    {
      title: 'Hidratação Capilar com Brushing',
      description: 'Tratamento profundo para cabelos ressecados com finalização brushing',
      image: '/hidratacao-capilar.jpg',
      popular: true
    },
    {
      title: 'Manutenção de Acrílico',
      description: 'Manutenção e reparo de unhas em acrílico com acabamento perfeito',
      image: '/manutencao-acrilico.jpg',
      popular: false
    },
    {
      title: 'Manicure com Gelinho',
      description: 'Manicure completa com aplicação de gel para maior durabilidade',
      image: '/manicure-gelinho.jpg',
      popular: true
    },
    {
      title: 'Depilação com Cera',
      description: 'Depilação profissional com cera quente para pele lisa e macia',
      image: '/depilacao-cera.jpg',
      popular: false
    },
    {
      title: 'Pedicure com Gelinho',
      description: 'Pedicure completa com aplicação de gel nos pés',
      image: '/pedicure-gelinho.jpg',
      popular: true
    },
    {
      title: 'Depilação com Linha',
      description: 'Técnica precisa de depilação com linha para sobrancelhas e rosto',
      image: '/depilacao-linha.jpg',
      popular: false
    },
    {
      title: 'Limpeza Facial Profissional',
      description: 'Limpeza profunda da pele com extração de cravos e hidratação',
      image: '/limpeza-facial.jpg',
      popular: true
    }
  ];

  return (
    <section id="serviços" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-900 font-medium tracking-wide uppercase text-sm">
            Nossos Serviços
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-6">
            Experiências
            <span className="text-amber-900"> Exclusivas</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Descubra nossa seleção cuidadosa de tratamentos premium, 
            cada um projetado para proporcionar momentos únicos de bem-estar e renovação.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="elemento-animado group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-3 left-3 bg-amber-900 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Star size={12} fill="currentColor" />
                    <span>Popular</span>
                  </div>
                )}

                {/* Hover Button - Hidden on mobile for better UX */}
                <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={() => handleWhatsAppService(service.title)}
                    className="elemento-animado bg-white text-amber-900 px-4 py-2 rounded-full font-medium hover:bg-amber-50 transition-colors flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
                  >
                    <span>Saiba Mais</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="font-playfair text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-900 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Book Button */}
                <button 
                  onClick={() => handleWhatsAppService(service.title)}
                  className="elemento-animado w-full mt-4 bg-amber-900 text-white py-3 rounded-full font-medium hover:bg-amber-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 text-sm sm:text-base"
                >
                  Consultar Preço
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-2xl p-8 text-white">
            <h3 className="font-playfair text-3xl font-bold mb-4">
              Não Encontrou o Que Procura?
            </h3>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Oferecemos tratamentos personalizados para atender suas necessidades específicas. 
              Entre em contato conosco para criar sua experiência única.
            </p>
            <button 
              onClick={() => handleWhatsAppService('Consulta Personalizada')}
              className="bg-white text-amber-900 px-8 py-3 rounded-full font-medium hover:bg-amber-50 transition-all duration-300 hover:scale-105"
            >
              Consulta Personalizada
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
