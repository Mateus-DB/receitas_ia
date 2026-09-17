import {useState} from "react"
const ChatBox = ({ onEnviarMensagem, disabled }: { onEnviarMensagem: (mensagem:string) => void; disabled: boolean }) => {

    const [mensagem, setMensagem] = useState<string>('');

    const handleSubmit =(e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(mensagem.trim() !== ""){
            onEnviarMensagem(mensagem);
            setMensagem('');
        }
    }

    return (
        <div className="border-t border-gray-200 bg-gray-50/80 p-4">
            <form className="flex space-x-3" onSubmit={handleSubmit}>
                <input type="text" value={mensagem} onChange={(e)=> setMensagem(e.target.value)} placeholder="Digite o ingrediente da receita..." disabled={disabled} className="flex-1 px-5 py-3 bg-white border border-gray-300 rounded-full shadow-sm focus:ring-2 outline-none focus:ring-purple-500" />
                <button type="submit" disabled={disabled} className="px-8 py-3 bg-linear-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-700 text-white rounded-full cursor-pointer disabled:from-gray-400 disabled:to-gray-300 disabled:cursor-not-allowed">Enviar</button>
            </form>
        </div>
    )
}

export default ChatBox