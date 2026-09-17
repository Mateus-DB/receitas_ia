const api_url = import.meta.env.VITE_API_URL;

export const api = async (pergunta: string, onChunk: (chunk: string) => void) => {
    try {
        const response = await fetch(`${api_url}perguntar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pergunta })
        });

        if (!response.ok || !response.body) {
            throw new Error(`Servidor respondeu com status ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            onChunk(decoder.decode(value, { stream: true }));
        }

        const remaining = decoder.decode();
        if (remaining) {
            onChunk(remaining);
        }

    } catch (error) {
        console.log("Erro ao buscar resposta no servidor: ", error);
        throw new Error("Erro ao buscar resposta no servidor");
    }
}