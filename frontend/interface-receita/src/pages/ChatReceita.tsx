import { useState } from "react"
import ListaMensagens from "../components/ListaMensagens"
import ChatBox from "../components/ChatBox"
import { api } from "../services/api"

interface Mensagens {
    id: number,
    text: string,
    remetente: "bot" | "usuario"
}
const ChatReceita = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [mensagens, setMensagens] = useState<Mensagens[]>([
        {
            id: 1,
            text: "Olá, sou assistente de receita. Como posso ajudar você hoje? Digite o nome de um prato ou ingrediente e eu vou te dar uma receita deliciosa!",
            remetente: "bot"
        },

    ])

    const onEnviarMensagem = async (mensagem: string) => {

        const novaMensagemUsuario: Mensagens = {
            id: Date.now(),
            text: mensagem,
            remetente: "usuario"
        }

        setMensagens(prev => [...prev, novaMensagemUsuario])
        setLoading(true);

        try {
            const idMensagemBot = Date.now() + 1;
            setMensagens(prev => [...prev, {
                id: idMensagemBot,
                text: "",
                remetente: "bot"
            }]);

            await api(mensagem, (chunk) => {
                setMensagens(prev => prev.map(item => item.id === idMensagemBot
                    ? { ...item, text: item.text + chunk }
                    : item
                ));
            });


        } catch (error) {
            console.log("Erro ao enviar mensagem: ", error);

            const mensagemErro: Mensagens = {
                id: Date.now(),
                text: "Desculpe, ocorreu um erro ap processar sua solicitação. Por favor, tente novamente mais tarde!",
                remetente: "bot"
            }

            setMensagens(prev => [...prev, mensagemErro]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-200 via-gray-50 to-emerald-50 p-4">
            <div className="container mx-auto max-w-4xl mt-10">
                <header className="text-center mb-8">
                    <h1 className="text-5xl font-bold bg-linear-to-r from-purple-600 to-emerald-600 text-transparent bg-clip-text mb-2">🍳 Dev Chef</h1>
                    <p className="text-gray-600 text-lg">Seu assistente pessoal de receitas </p>
                </header>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl h-150 border border-gray-100 flex flex-col ">
                    <ListaMensagens mensagens={mensagens} />
                    <ChatBox onEnviarMensagem={onEnviarMensagem} disabled={loading} />
                </div>
            </div>
        </div>
    )
}

export default ChatReceita