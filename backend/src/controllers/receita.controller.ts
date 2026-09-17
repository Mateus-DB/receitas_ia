import { Request, Response } from "express"
import obterResposta from "../services/huggingFace.service.js";
import { receitaSchema } from "../userTypes.js";

export const perguntaReceita = async (req: Request, res: Response) => {
    try {
        const result = receitaSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: "Erro de validação",
                details: result.error.flatten((issue) => issue.message)
            })
        }

        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");

        for await (const chunk of obterResposta(result.data.pergunta)) {
            res.write(chunk);
        }

        return res.end();

    } catch (error) {
        console.error("Erro ao processar a pergunta: " + error);

        if (res.headersSent) {
            return res.end();
        }

        return res.status(500).json({ error: "Erro ao processar a pergunta" });
    }
}