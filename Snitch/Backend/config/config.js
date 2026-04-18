import dotenv from 'dotenv';

dotenv.config();


// Very Important Check - Very Helpful for debugging in case of any issues related to environment variables. It will log the current environment variables to the console when the application starts.
if(!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in .env file");
    process.exit(1);
}   

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}