import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/receita.route.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router)

const PORT = process.env.PORT;
const port = PORT || 3333;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});