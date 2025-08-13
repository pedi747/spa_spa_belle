import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '244930025350';
    const message = encodeURIComponent(
      'Olá! Gostaria de agendar um horário no La Vie Esbella Spa. Poderia me ajudar?'
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="whatsapp-button fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

export default WhatsAppButton;