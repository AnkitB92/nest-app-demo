import { allowedOrigins } from './allowedOrigins';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsOptions: CorsOptions = {
  origin: allowedOrigins,
};
