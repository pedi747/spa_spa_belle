export default function handler(req, res) {
  res.status(503).setHeader('Retry-After', '3600').json({
    message: 'Site em manutenção temporária',
    retryAfter: 3600
  });
}