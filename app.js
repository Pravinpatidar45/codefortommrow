import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { dbconnect } from "./config/db.js";
dotenv.config();
const app = express();
dbconnect();
import AdminRouter from "./routes/admin.route.js"
import CategoryRouter from "./routes/category.route.js"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/admin",AdminRouter)
app.use(CategoryRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server Runing on Port ${process.env.PORT}`);
})