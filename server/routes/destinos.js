import express from "express";

import {
  criarDestino,
  listarDestinos,
} from "../controllers/destinosController.js";

const router = express.Router();

router.post("/", criarDestino);

router.get("/", listarDestinos);

export default router;
