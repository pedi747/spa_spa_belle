import React, { useEffect } from 'react';

const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Configurar headers de segurança
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://wa.me; frame-src 'none'; object-src 'none';";
    document.head.appendChild(meta);

    // Prevenir click-jacking
    try {
      if (window.top && window.top !== window.self) {
        window.top.location = window.self.location;
      }
    } catch (e) {
      // Ignorar erros de cross-origin
    }

    // Limpar dados sensíveis ao sair
    const handleBeforeUnload = () => {
      // Limpar dados temporários se necessário
      sessionStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Prevenir console access em produção
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      try {
        const devtools = {
          open: false,
          orientation: null
        };
        
        const threshold = 160;
        
        const intervalId = setInterval(() => {
          if (window.outerHeight - window.innerHeight > threshold || 
              window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
              devtools.open = true;
              console.clear();
              console.log('%cPare!', 'color: red; font-size: 50px; font-weight: bold;');
              console.log('%cEsta é uma funcionalidade do navegador destinada a desenvolvedores. Não cole ou digite código aqui.', 'color: red; font-size: 16px;');
            }
          } else {
            devtools.open = false;
          }
        }, 2000);
        
        return () => {
          clearInterval(intervalId);
        };
      } catch (error) {
        console.warn('Security provider error:', error);
      }
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <>{children}</>;
};

export default SecurityProvider;