import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 60 detik
  max: 3, // Maksimal 3 kali hit sesuai instruksi tes[cite: 3]
  message: { error: 'Too many authentication attempts, please try again after 60 seconds.' },
  standardHeaders: true,
  legacyHeaders: false,
});


export const productActionLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 detik
  max: 1,
  message: { error: 'Too many requests, please try again after 5 seconds.' },
  standardHeaders: true,
  legacyHeaders: false,
});