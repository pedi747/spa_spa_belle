import React, { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Plus, Trash2 } from 'lucide-react';
import TestimonialForm from './TestimonialForm';
import { SecurityUtils } from '../utils/security';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [allTestimonials, setAllTestimonials] = useState<any[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const defaultTestimonials = [
    {
      name: 'Maria Silva',
      role: 'Executiva',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Uma experiência transformadora! O atendimento é impecável e os tratamentos são de altíssima qualidade. Saí renovada e com uma sensação de bem-estar indescritível.',
      treatment: 'Day Spa Completo'
    },
    {
      name: 'Ana Costa',
      role: 'Empresária',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'O La Vie Esbella é meu refúgio pessoal. Cada visita é uma jornada de relaxamento profundo. A equipe é extremamente profissional e o ambiente é simplesmente perfeito.',
      treatment: 'Massagem com Pedras Quentes'
    },
    {
      name: 'Carla Mendes',
      role: 'Médica',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Recomendo de olhos fechados! Os tratamentos faciais são excepcionais e os resultados são visíveis desde a primeira sessão. Um verdadeiro oásis de tranquilidade.',
      treatment: 'Tratamento Facial Premium'
    },
    {
      name: 'Juliana Santos',
      role: 'Advogada',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Depois de um dia estressante, não há nada melhor que uma sessão no La Vie Esbella. O ambiente é acolhedor e os profissionais são verdadeiros especialistas em bem-estar.',
      treatment: 'Aromaterapia'
    },
    {
      name: 'Patricia Lima',
      role: 'Arquiteta',
      image: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Cada detalhe é pensado para proporcionar a melhor experiência. Desde a recepção até o final do tratamento, tudo é perfeito. Já me tornei cliente fiel!',
      treatment: 'Reflexologia'
    }
  ];

  useEffect(() => {
    // Carregar depoimentos aprovados do localStorage
    let approved;
    try {
      approved = JSON.parse(localStorage.getItem('approved_testimonials') || '[]');
    } catch {
      approved = [];
    }
    setAllTestimonials([...defaultTestimonials, ...approved]);
  }, []);

  const testimonials = allTestimonials.length > 0 ? allTestimonials : defaultTestimonials;

  const handleNewTestimonial = (testimonial: any) => {
    // Adicionar novo depoimento à lista e atualizar
    const newTestimonial = {
      ...testimonial,
      role: 'Cliente',
      rating: testimonial.rating || 5,
      canDelete: true // Marca que pode ser deletado
    };
    
    const updatedTestimonials = [...allTestimonials, newTestimonial];
    setAllTestimonials(updatedTestimonials);
    
    // Salvar no localStorage
    try {
      const approved = JSON.parse(localStorage.getItem('approved_testimonials') || '[]');
      approved.push(newTestimonial);
      localStorage.setItem('approved_testimonials', JSON.stringify(approved));
    } catch {
      console.warn('Erro ao salvar depoimento no localStorage');
    }
  };

  const handleDeleteTestimonial = (testimonialId: string | number) => {
    const updatedTestimonials = allTestimonials.filter(t => t.id !== testimonialId);
    setAllTestimonials(updatedTestimonials);
    
    // Atualizar localStorage
    try {
      const approved = JSON.parse(localStorage.getItem('approved_testimonials') || '[]');
      const filteredApproved = approved.filter((t: any) => t.id !== testimonialId);
      localStorage.setItem('approved_testimonials', JSON.stringify(filteredApproved));
    } catch {
      console.warn('Erro ao atualizar localStorage');
    }
    
    // Ajustar slide atual se necessário
    if (currentSlide >= updatedTestimonials.length && updatedTestimonials.length > 0) {
      setCurrentSlide(updatedTestimonials.length - 1);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section ref={sectionRef} id="depoimentos" className="py-20 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="text-amber-900 font-medium tracking-wide uppercase text-sm">
            Depoimentos
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-6">
            O Que Nossos
            <span className="text-amber-900"> Clientes Dizem</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Histórias reais de transformação e bem-estar compartilhadas por quem 
            vivenciou a experiência única do La Vie Esbella Spa.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white p-8 md:p-12 shadow-xl border border-amber-100 relative">
                    {/* Quote Icon */}
                    <div className="absolute top-6 left-6 text-amber-900/20">
                      <Quote size={48} />
                    </div>

                    <div className="relative z-10">
                      {/* Rating */}
                      <div className="flex justify-center mb-6">
                        <div className="flex space-x-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed text-center mb-8 font-light italic">
                        "{SecurityUtils.sanitizeInput(testimonial.text)}"
                      </blockquote>

                      {/* Client Info */}
                      <div className="flex items-center justify-center space-x-4">
                        {testimonial.image && (
                          <img
                            src={testimonial.image.startsWith('http') ? testimonial.image : '/default-avatar.svg'}
                            alt={SecurityUtils.sanitizeInput(testimonial.name)}
                            className="w-16 h-16 rounded-full object-cover border-2 border-amber-200"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.svg'; }}
                          />
                        )}
                        <div className="text-center">
                          <div className="font-bold text-gray-800 text-lg">
                            {SecurityUtils.sanitizeInput(testimonial.name)}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {SecurityUtils.sanitizeInput(testimonial.role)}
                          </div>
                          <div className="text-amber-900 text-sm font-medium mt-1">
                            {SecurityUtils.sanitizeInput(testimonial.treatment)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Delete Button */}
                      {testimonial.canDelete && (
                        <button
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                          title="Deletar meu depoimento"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-amber-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-amber-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-amber-900 scale-125'
                    : 'bg-amber-300 hover:bg-amber-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Add Testimonial Button */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-amber-900 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-800 transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <Plus size={20} />
            <span>Deixar Meu Depoimento</span>
          </button>
        </div>

        {/* Testimonial Form */}
        {showForm && (
          <div className={`mt-12 transition-all duration-500 ${
            showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <TestimonialForm onSubmit={(testimonial) => {
              handleNewTestimonial(testimonial);
              setShowForm(false);
            }} />
          </div>
        )}

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { number: '98%', label: 'Satisfação' },
            { number: '5000+', label: 'Clientes Felizes' },
            { number: '4.9', label: 'Avaliação Média' },
            { number: '15+', label: 'Anos de Experiência' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-playfair text-3xl md:text-4xl font-bold text-amber-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;