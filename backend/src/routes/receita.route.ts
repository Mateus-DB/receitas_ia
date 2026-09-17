import { perguntaReceita } from "../controllers/receita.controller.js";
import { Router } from "express";

const router = Router();

router.post("/perguntar", perguntaReceita);

export default router;