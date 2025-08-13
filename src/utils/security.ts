// Utilitários de segurança para o site
export class SecurityUtils {
  // Sanitizar entrada de texto para prevenir XSS
  static sanitizeInput(input: string): string {
    if (!input || typeof input !== 'string') return '';
    return input
      .replace(/[&<>"']/g, (match) => {
        const entities: { [key: string]: string } = {
          '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;'
        };
        return entities[match] || match;
      })
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
      .trim()
      .substring(0, 500);
  }

  // Validar email
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 100;
  }

  // Validar telefone
  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^[0-9\s\-\+\(\)]{8,15}$/;
    return phoneRegex.test(phone);
  }

  // Rate limiting simples (localStorage)
  static checkRateLimit(action: string, maxAttempts: number = 5, timeWindow: number = 300000): boolean {
    const key = `rate_limit_${action}`;
    const now = Date.now();
    let attempts;
    try {
      attempts = JSON.parse(localStorage.getItem(key) || '[]');
    } catch {
      attempts = [];
    }
    
    // Remove tentativas antigas
    const validAttempts = attempts.filter((time: number) => now - time < timeWindow);
    
    if (validAttempts.length >= maxAttempts) {
      return false; // Rate limit excedido
    }
    
    validAttempts.push(now);
    try {
      localStorage.setItem(key, JSON.stringify(validAttempts));
    } catch {
      // Falha silenciosa se localStorage não disponível
    }
    return true;
  }

  // Validar conteúdo de depoimento
  static validateTestimonial(name: string, message: string, rating: number): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!name || name.length < 2 || name.length > 50) {
      errors.push('Nome deve ter entre 2 e 50 caracteres');
    }
    
    if (!message || message.length < 10 || message.length > 500) {
      errors.push('Mensagem deve ter entre 10 e 500 caracteres');
    }
    
    if (rating < 1 || rating > 5) {
      errors.push('Avaliação deve ser entre 1 e 5 estrelas');
    }
    
    // Verificar palavras proibidas
    const forbiddenWords = ['spam', 'fake', 'bot', 'test'];
    const lowerMessage = message.toLowerCase();
    if (forbiddenWords.some(word => lowerMessage.includes(word))) {
      errors.push('Conteúdo não permitido detectado');
    }
    
    return { valid: errors.length === 0, errors };
  }

  // Gerar hash simples para identificar conteúdo duplicado
  static generateHash(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }
}