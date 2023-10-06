import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DataBase/Database.js";
import router from "./Router/SM.router.js";
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const port = process.env.PORT;
connectDB();
app.use("/api", router);
app.listen(port, () => {
  console.log("App is Listen", port);
});
