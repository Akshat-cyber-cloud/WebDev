import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in .env file");
    process.exit(1);
}   

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}