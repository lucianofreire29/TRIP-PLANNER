import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/db.js";

import destinosRoutes from "./routes/destinos.js";

dotenv.config();

const app = express();

// Permite requisições do seu site
app.use(cors());

// Permite receber JSON
app.use(express.json());

// Rotas
app.use("/destinos", destinosRoutes);

// Teste
app.get("/", (req, res) => {
  res.send("API Trip Planner funcionando 🚀");
});

// Inicializar servidor
const PORT = 3000;

pool
  .connect()
  .then(() => {
    console.log("✅ Conectado ao Neon!");
  })
  .catch((err) => {
    console.error("Erro ao conectar:", err);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
