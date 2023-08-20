import { z } from 'zod';

export const EnvironmentSchema = z
  .object(
    {
      NODE_ENV: z.enum(['PROD', 'DEV']),
      PORT: z.coerce.number().positive(),
      API_PREFIX: z.string().startsWith('/'),
      ALLOWED_ORIGINS: z.string(),
      DATABASE_HOST: z.string().min(1),
      DATABASE_PORT: z.coerce.number().positive(),
      DATABASE_USER: z.string().min(1),
      DATABASE_PASSWORD: z.string(),
      DATABASE_NAME: z.string().min(1),
      STRIPE_SECRET: z.string(),
    },
    { required_error: '.env file is required' },
  )
  .superRefine((environment, ctx) => {
    environment.ALLOWED_ORIGINS.split(';').forEach((origin) => {
      const result = z.string().url(`Invalid origin url(${origin})`).safeParse(origin);

      if (result.success === false) {
        ctx.addIssue({ ...result.error.errors[0], path: ['ALLOWED_ORIGINS'] });
      }
    });
  });
