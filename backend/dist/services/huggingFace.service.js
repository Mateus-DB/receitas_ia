import { InferenceClient } from "@huggingface/inference";
import { promptSystem } from "../prompt/promptSystem.js";
const obterResposta = async function* (pergunta) {
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error("API_KEY não configurada no arquivo .env");
        }
        const hf = new InferenceClient(apiKey);
        const stream = await hf.chatCompletionStream({
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
                {
                    role: "system",
                    content: promptSystem
                },
                {
                    role: "user",
                    content: pergunta
                }
            ],
            stream: true,
            max_tokens: 1000,
            temperature: 0.7
        });
        for await (const chunk of stream) {
            const text = chunk.choices?.[0]?.delta?.content;
            if (text) {
                process.stdout.write(text);
                yield text;
            }
        }
    }
    catch (error) {
        console.error("Erro ao obter resposta " + error);
        throw new Error("Erro ao obter resposta" + error);
    }
};
export default obterResposta;
//# sourceMappingURL=huggingFace.service.js.map