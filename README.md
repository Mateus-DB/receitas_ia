# 🍳 Dev Chef

> Assistente culinário com IA desenvolvido com React, TypeScript, Node.js e Llama 3.1.

Aplicação Full Stack que gera receitas a partir de ingredientes ou perguntas do usuário, com **respostas em streaming exibidas em tempo real**.

🔗 **Demo:** https://receitas-ia-inky.vercel.app/

## 🚀 Features

* 🤖 Geração de receitas com Llama 3.1
* ⚡ Streaming de respostas em tempo real
* 💬 Interface de chat responsiva
* ✅ Validação com Zod
* 🧠 Engenharia de Prompt
* 📡 Integração com API de IA

## 🛠️ Stack

**Frontend:** React 19 · TypeScript · Vite · Tailwind CSS

**Backend:** Node.js · Express · TypeScript · Zod

**AI:** Hugging Face · Llama 3.1 8B Instruct

## 🏗️ Architecture

```text
React + TypeScript
        │
        ▼
Node.js + Express
        │
        ▼
      Zod
        │
        ▼
Hugging Face
        │
        ▼
Llama 3.1
        │
    Streaming
        │
        ▼
ReadableStream
        │
        ▼
React Chat
```

### 🔥 Technical Highlight

O projeto utiliza **streaming de respostas** para transmitir os dados da IA progressivamente do backend para o frontend.

O `ReadableStream` permite que o React atualize a mensagem conforme os dados são recebidos, criando uma experiência de chat mais dinâmica.

## 💻 Run locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Configure:

```env
HF_TOKEN=sua_api_key
```

### Frontend

```bash
cd frontend/interface-receita
npm install
npm run dev
```

## 👨‍💻 Author

**Mateus Demartino Bastos**

Full Stack Developer · React · TypeScript · Node.js · AI
