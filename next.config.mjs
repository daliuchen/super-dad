import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

const nextConfig = {
    env: {
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    },
};

export default nextConfig;