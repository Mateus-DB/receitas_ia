import z from "zod";
export const receitaSchema = z.object({
    pergunta: z.string().min(3, { message: "O campo é obrigatório!" }),
});
//# sourceMappingURL=userTypes.js.map