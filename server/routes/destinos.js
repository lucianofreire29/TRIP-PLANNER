import express from "express";

console.log("Arquivo destinos.js carregado");

import {
  criarDestino,
  listarDestinos,
  buscarDestinoPorId,
  excluirDestino,
  atualizarDestino,
} from "../controllers/destinosController.js";

console.log("Controller importado");

const router = express.Router();

router.get("/", listarDestinos);
router.get("/:id", buscarDestinoPorId);
router.post("/", criarDestino);
router.put("/:id", atualizarDestino);
router.delete("/:id", excluirDestino);

export default router;
