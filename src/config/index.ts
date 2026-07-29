import { AppConfig } from '../types';

const config: AppConfig = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export default config;
