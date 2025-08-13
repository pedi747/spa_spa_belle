import React, { useEffect, useRef, useState } from 'react';
import { Award, Heart, Sparkles, Users } from 'lucide-react';

const About = () => {
  // Removido observer para melhor performance

  const stats = [
    { icon: Users, number: '5000+', label: 'Clientes Satisfeitos' },
    { icon: Award, number: '15+', label: 'Anos de Experiência' },
    { icon: Heart, number: '50+', label: 'Tratamentos Exclusivos' },
    { icon: Sparkles, number: '98%', label: 'Satisfação dos Clientes' },
  ];

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <div className="mb-6">
              <span className="text-amber-900 font-medium tracking-wide uppercase text-sm">
                Sobre Nós
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-6">
                Uma Jornada de
                <span className="text-amber-900"> Bem-Estar</span>
              </h2>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg font-medium text-gray-700">
                O La Vie Esbella Spa é referência em excelência no segmento de beleza e bem-estar 
                em Luanda, oferecendo serviços premium com os mais altos padrões de qualidade.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Nossa Missão</h4>
                  <p className="text-sm">
                    Proporcionar experiências transformadoras de beleza e bem-estar, 
                    utilizando técnicas avançadas e produtos de qualidade superior.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Nossa Visão</h4>
                  <p className="text-sm">
                    Ser reconhecido como o spa de referência em Angola, 
                    estabelecendo novos padrões de excelência no setor.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-900">
                <h4 className="font-semibold text-amber-900 mb-2">Nossos Diferenciais</h4>
                <ul className="text-sm space-y-1">
                  <li>• Profissionais certificados e especializados</li>
                  <li>• Produtos importados de alta qualidade</li>
                  <li>• Ambiente higienizado e seguro</li>
                  <li>• Atendimento personalizado e exclusivo</li>
                </ul>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-amber-900/10 rounded-full flex items-center justify-center">
                      <stat.icon className="text-amber-900" size={24} />
                    </div>
                  </div>
                  <div className="font-playfair text-2xl sm:text-3xl font-bold text-amber-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                  alt="Spa Interior"
                  className="w-full h-96 object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-amber-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center">
                    <Award className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Certificado</div>
                    <div className="text-sm text-gray-600">Excelência em Spa</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400/20 rounded-full animate-pulse"></div>
              <div className="absolute top-10 -left-2 w-4 h-4 bg-amber-300/30 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;