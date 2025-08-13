import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const Gallery = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: '/hidratacao-capilar.jpg',
      alt: 'Hidratação Capilar com Brushing',
      category: 'Cabelo'
    },
    {
      src: '/manutencao-acrilico.jpg',
      alt: 'Manutenção de Acrílico',
      category: 'Unhas'
    },
    {
      src: '/manicure-gelinho.jpg',
      alt: 'Manicure com Gelinho',
      category: 'Unhas'
    },
    {
      src: '/pedicure-gelinho.jpg',
      alt: 'Pedicure com Gelinho',
      category: 'Unhas'
    },
    {
      src: '/depilacao-linha.jpg',
      alt: 'Depilação com Linha',
      category: 'Depilação'
    },
    {
      src: '/limpeza-facial.jpg',
      alt: 'Limpeza Facial Profissional',
      category: 'Facial'
    },
    {
      src: '/depilacao-cera.jpg',
      alt: 'Depilação com Cera',
      category: 'Depilação'
    },
    {
      src: '/Imagem WhatsApp 2025-08-13 às 09.52.34_a54b0085.jpg',
      alt: 'Trabalho Realizado',
      category: 'Serviços'
    },
    {
      src: '/Imagem WhatsApp 2025-08-13 às 09.52.34_54f6a6ca.jpg',
      alt: 'Resultado Final',
      category: 'Serviços'
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <>
      <section id="galeria" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-amber-900 font-medium tracking-wide uppercase text-sm">
              Nossa Galeria
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-6">
              Nossos
              <span className="text-amber-900"> Trabalhos</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
              Veja alguns dos nossos melhores trabalhos e resultados.
            </p>

            {/* Gallery Button */}
            <button
              onClick={() => setShowGallery(true)}
              className="bg-amber-900 text-white px-8 py-4 rounded-full font-medium hover:bg-amber-800 transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <Eye size={20} />
              <span>Ver Galeria</span>
            </button>
          </div>
        </div>
      </section>

      {/* Full Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6 text-white">
            <h3 className="text-2xl font-playfair font-bold">Nossa Galeria</h3>
            <button
              onClick={() => setShowGallery(false)}
              className="text-white hover:text-amber-400 transition-colors"
            >
              <X size={32} />
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white">
                        <div className="text-sm font-medium text-amber-200 mb-1">
                          {image.category}
                        </div>
                        <div className="font-medium">
                          {image.alt}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors z-10"
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-4 text-white hover:text-amber-400 transition-colors z-10"
          >
            <ChevronLeft size={48} />
          </button>
          
          <button
            onClick={() => navigateImage('next')}
            className="absolute right-4 text-white hover:text-amber-400 transition-colors z-10"
          >
            <ChevronRight size={48} />
          </button>

          {/* Image */}
          <div className="max-w-4xl max-h-full">
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Image Info */}
            <div className="text-center mt-4 text-white">
              <div className="text-amber-400 text-sm font-medium mb-1">
                {galleryImages[selectedImage].category}
              </div>
              <div className="text-lg">
                {galleryImages[selectedImage].alt}
              </div>
              <div className="text-sm text-gray-400 mt-2">
                {selectedImage + 1} de {galleryImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;