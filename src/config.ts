import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

const config = {
  PORT: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 30000,
    refreshTokenExpiryMS: 50000,
  },
  test: {
    accessToken: process.env.TEST_ACCESS_TOKEN,
    accessTokenSuperAdmin: process.env.TEST_ACCESS_TOKEN_SUPER_ADMIN,
  },
  database: {
    client: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
};

export default config;
