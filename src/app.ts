import express from "express";
import cors from "cors";
import { env } from "./config/env";

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
});