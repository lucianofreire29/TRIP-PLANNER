import express from "express";

import {
  criarPromocao,
  listarPromocoes,
  atualizarPromocao,
  excluirPromocao,
} from "../controllers/promocoesController.js";

const router = express.Router();

router.get("/", listarPromocoes);

router.post("/", criarPromocao);

router.put("/:id", atualizarPromocao);

router.delete("/:id", excluirPromocao);

export default router;
