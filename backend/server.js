const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./database");

//handling uncaught exception        bugs like wrong console
process.on("uncaughtException", (err) => {
  console.log(`error:${err.message}`);
  console.log(`shutting down the server`);

  process.exit(1);
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//connecting to db
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection          used for shutting down server properly in case of bug in config file
process.on("unhandledRejection", (err) => {
  console.log(`error:${err.message}`);
  console.log(`shutting down the server unhandled`);

  server.close(() => {
    process.exit(1);
  });
});
