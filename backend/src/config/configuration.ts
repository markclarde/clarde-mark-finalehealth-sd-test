export default () => ({
  mongoUri: process.env.MONGO_URI,
  port: parseInt(process.env.PORT ?? '', 10) || 3000,
});