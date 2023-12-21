import { z } from 'zod';

/**
 * Esquema válido para enviar un correo electrónico.
 */
const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  text: z.string().min(1),
});

export default emailSchema;
