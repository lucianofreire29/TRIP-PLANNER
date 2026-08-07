import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/db.js";

import destinosRoutes from "./routes/destinos.js";
import promocoesRoutes from "./routes/promocoes.js";
import pacotesRoutes from "./routes/pacotes.js";

dotenv.config();

const app = express();

// Permite requisições do seu site
app.use(cors());

// Permite receber JSON
app.use(express.json());

// Rotas
app.use("/destinos", destinosRoutes);
app.use("/promocoes", promocoesRoutes);
app.use("/pacotes", pacotesRoutes);

// Teste
app.get("/", (req, res) => {
  res.send("API Trip Planner funcionando 🚀");
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;

pool
  .connect()
  .then((cliente) => {
    console.log("✅ Conectado ao Neon!");
    cliente.release();
  })
  .catch((err) => {
    console.error("Erro ao conectar:", err);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
