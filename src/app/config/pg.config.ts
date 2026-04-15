import { DataSourceOptions } from 'typeorm';

declare global {
  interface EnvVar {
    DB_HOST: string;
    DB_PORT?: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  }
}

export const postgresConfig = () => {
  return {
    postgresConfig: {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5436,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    } as DataSourceOptions,
  };
};
