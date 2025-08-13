import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { SecurityUtils } from '../utils/security';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: SecurityUtils.sanitizeInput(value)
    });
    setErrors([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar rate limiting
    if (!SecurityUtils.checkRateLimit('contact', 5, 3600000)) {
      setErrors(['Muitas tentativas. Tente novamente em 1 hora.']);
      return;
    }
    
    // Validar dados
    const validationErrors: string[] = [];
    
    if (!formData.name || formData.name.length < 2) {
      validationErrors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!SecurityUtils.isValidEmail(formData.email)) {
      validationErrors.push('Email inválido');
    }
    
    if (formData.phone && !SecurityUtils.isValidPhone(formData.phone)) {
      validationErrors.push('Telefone inválido');
    }
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      info: '+244 930 025 350',
      subInfo: 'WhatsApp disponível'
    },
    {
      icon: Mail,
      title: 'E-mail',
      info: 'contato@lavieesbellaangola.com',
      subInfo: 'Resposta em até 24h'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      info: 'Condomínio Pitanga Casa A1',
      subInfo: 'Talatona - Luanda'
    },
    {
      icon: Clock,
      title: 'Horário de Funcionamento',
      info: 'Segunda a Sexta: 8h às 19h',
      subInfo: 'Sábado: 8h às 17h | Domingo: Fechado'
    }
  ];

  const services = [
    'Hidratação Capilar com Brushing',
    'Manutenção de Acrílico',
    'Manicure com Gelinho',
    'Depilação com Cera',
    'Pedicure com Gelinho',
    'Depilação com Linha',
    'Limpeza Facial Profissional',
    'Consulta Personalizada'
  ];

  return (
    <section ref={sectionRef} id="contato" className="py-20 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="text-amber-900 font-medium tracking-wide uppercase text-sm">
            Contato
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-6">
            Agende Sua
            <span className="text-amber-900"> Experiência</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Estamos prontos para atendê-lo com excelência. Entre em contato para 
            agendar sua consulta ou esclarecer dúvidas sobre nossos serviços.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-6">
                Formulário de Agendamento
              </h3>

              {errors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-red-700">
                    <AlertCircle size={20} />
                    <span className="font-medium">Erro:</span>
                  </div>
                  <ul className="mt-2 text-red-600 text-sm">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
                  <h4 className="font-bold text-xl text-gray-800 mb-2">
                    Agendamento Enviado!
                  </h4>
                  <p className="text-gray-600">
                    Entraremos em contato em breve para confirmar seu horário.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Data Preferida
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Serviço de Interesse
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Selecione um serviço</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Mensagem
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Conte-nos mais sobre suas necessidades ou preferências..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-900 text-white py-4 rounded-lg font-medium hover:bg-amber-800 transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 group"
                  >
                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    <span>Enviar Agendamento</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-900/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-amber-900" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-700 font-medium">
                        {item.info}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {item.subInfo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
              <div className="p-6 border-b border-amber-100">
                <h3 className="font-playfair text-xl font-bold text-gray-800 flex items-center">
                  <MapPin className="text-amber-900 mr-2" size={24} />
                  Nossa Localização
                </h3>
              </div>
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                {/* Google Maps Embed Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="text-amber-900 mx-auto mb-2" size={48} />
                    <p className="text-gray-700 font-medium">
                      Condomínio Pitanga Casa A1
                    </p>
                    <p className="text-gray-600">
                      Talatona - Luanda
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Condom%C3%ADnio+Pitanga+Casa+A1,+Talatona,+Luanda,+Angola" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 bg-amber-900 text-white px-6 py-2 rounded-full text-sm hover:bg-amber-800 transition-colors inline-block"
                    >
                      Ver no Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-2xl p-6 text-white">
              <h3 className="font-playfair text-xl font-bold mb-3">
                Atendimento Rápido
              </h3>
              <p className="mb-4 text-amber-100">
                Para agendamentos e informações rápidas, 
                fale conosco diretamente pelo WhatsApp.
              </p>
              <button className="bg-white text-amber-900 px-6 py-3 rounded-full font-medium hover:bg-amber-50 transition-colors flex items-center space-x-2">
                <Phone size={20} />
                <span>WhatsApp: +244 930 025 350</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;