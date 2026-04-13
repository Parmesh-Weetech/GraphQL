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
      host: 'localhost',
      port: 5436,
      username: 'myuser',
      password: 'mypassword',
      database: 'graphql',
      synchronize: true,
      logging: true,
    } as DataSourceOptions,
  };
};
