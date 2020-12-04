import dotenv from 'dotenv';

dotenv.config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const database = process.env.DATABASE;
export const dbUser = process.env.DB_USER;
export const dbPass = process.env.DB_PASS;
export const dbHost = process.env.DB_HOST;
