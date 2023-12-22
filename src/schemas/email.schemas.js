import { z } from 'zod';

/**
 * Esquema válido para enviar un correo electrónico.
 */
const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  information: z.object({
    name: z.string().min(1),
    lastName: z.string().min(1),
    address: z.string().min(1),
    neighborhood: z.string().min(1),
    services: z.string().min(1),
    document: z.string().min(1),
    numDocument: z.string().min(1),
    numFijo: z.string().optional(),
    numPhone: z.string().min(1),
  }),
});

export default emailSchema;
