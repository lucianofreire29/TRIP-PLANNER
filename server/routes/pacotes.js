import express from "express";

import {
  criarPacote,
  listarPacotes,
  atualizarPacote,
  excluirPacote,
} from "../controllers/pacotesController.js";

const router = express.Router();

router.get("/", listarPacotes);
router.post("/", criarPacote);
router.put("/:id", atualizarPacote);
router.delete("/:id", excluirPacote);

export default router;
