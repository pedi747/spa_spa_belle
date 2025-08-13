import React, { useState } from 'react';
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { SecurityUtils } from '../utils/security';

interface Testimonial {
  id: string | number;
  name: string;
  message: string;
  rating: number;
  treatment: string;
  date: string;
  approved: boolean;
  role: string;
}

interface TestimonialFormProps {
  onSubmit: (testimonial: Testimonial) => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: 5,
    treatment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const treatments = [
    'Hidratação Capilar com Brushing',
    'Manutenção de Acrílico',
    'Manicure com Gelinho',
    'Depilação com Cera',
    'Pedicure com Gelinho',
    'Depilação com Linha',
    'Limpeza Facial Profissional',
    'Outro'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: SecurityUtils.sanitizeInput(value)
    }));
    setErrors([]);
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar rate limiting
    const HOUR_IN_MS = 60 * 60 * 1000;
    if (!SecurityUtils.checkRateLimit('testimonial', 3, HOUR_IN_MS)) { // 3 tentativas por hora
      setErrors(['Muitas tentativas. Tente novamente em 1 hora.']);
      return;
    }

    // Validar dados
    const validation = SecurityUtils.validateTestimonial(formData.name, formData.message, formData.rating);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    // Verificar duplicatas
    const contentHash = SecurityUtils.generateHash(formData.message);
    const existingHashes = JSON.parse(localStorage.getItem('testimonial_hashes') || '[]');
    if (existingHashes.includes(contentHash)) {
      setErrors(['Este depoimento já foi enviado anteriormente.']);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simular envio (em produção seria uma API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Salvar hash para evitar duplicatas
      existingHashes.push(contentHash);
      localStorage.setItem('testimonial_hashes', JSON.stringify(existingHashes));
      
      // Salvar depoimento e aprovar automaticamente
      const testimonial: Testimonial = {
        ...formData,
        id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        date: new Date().toISOString(),
        approved: true,
        role: 'Cliente'
      };
      
      try {
        const existingTestimonials = JSON.parse(localStorage.getItem('approved_testimonials') || '[]');
        existingTestimonials.push(testimonial);
        localStorage.setItem('approved_testimonials', JSON.stringify(existingTestimonials));
      } catch (storageError) {
        console.warn('Erro ao salvar no localStorage:', storageError);
      }
      
      onSubmit(testimonial);
      setIsSubmitted(true);
      
      // Reset form
      setTimeout(() => {
        setFormData({ name: '', message: '', rating: 5, treatment: '' });
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      setErrors(['Erro ao enviar depoimento. Tente novamente.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
        <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-2">
          Depoimento Enviado!
        </h3>
        <p className="text-gray-600">
          Obrigado pelo seu feedback! Seu depoimento já está publicado em nossa página.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-6 text-center">
        Compartilhe Sua Experiência
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Seu Nome *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              maxLength={50}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Tratamento Realizado
            </label>
            <select
              name="treatment"
              value={formData.treatment}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">Selecione um tratamento</option>
              {treatments.map(treatment => (
                <option key={treatment} value={treatment}>
                  {treatment}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Avaliação *
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className="focus:outline-none"
              >
                <Star
                  size={32}
                  className={`transition-colors ${
                    star <= formData.rating
                      ? 'text-amber-400 fill-current'
                      : 'text-gray-300 hover:text-amber-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Seu Depoimento *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            placeholder="Conte-nos sobre sua experiência no La Vie Esbella..."
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {formData.message.length}/500 caracteres
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-900 text-white py-4 rounded-lg font-medium hover:bg-amber-800 transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Enviar Depoimento</span>
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        Seu depoimento será publicado imediatamente após o envio.
      </p>
    </div>
  );
};

export default TestimonialForm;