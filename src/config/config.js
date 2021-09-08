module.exports.config = () => ({
  DB_URL: process.env.MONGO_URI || "mongodb://localhost:27017/local",
  PORT: process.env.PORT || 3000,
});
