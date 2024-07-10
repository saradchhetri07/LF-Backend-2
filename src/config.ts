import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 30000,
    refreshTokenExpiryMS: 50000,
  },
};

export default config;
