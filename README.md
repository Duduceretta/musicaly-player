
# 🎵 Musicaly Player

Um player musical Full Stack desenvolvido com **React**, **Node.js**, **Express** e **MongoDB**. O Musicaly permite visualizar artistas, músicas e seus detalhes de forma intuitiva e responsiva, ideal para treinar e demonstrar habilidades modernas de desenvolvimento web.

🌐 **Acesse o projeto em produção:**  
[https://musicaly-player.onrender.com](https://musicaly-player.onrender.com)

---

## 📁 Estrutura do Projeto
Este projeto segue uma arquitetura separada por pastas de front-end e back-end:

```bash
musicaly-player/
├── back-end/
│   ├── api/
│   │   ├── connect.js         # Conexão com o MongoDB
│   │   └── server.js          # Servidor Express + rotas
│   └── .env                   # Variáveis de ambiente (MONGO_URI)
├── front-end/
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/             # Páginas: Home, Songs, Artists, etc.
│   │   └── App.jsx            # Roteamento e estrutura principal
│   └── .env                   # Variáveis de ambiente do Vite
└── README.md
```

---

## 🚀 Tecnologias Utilizadas

### 🔹 Front-end
- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)

### 🔸 Back-end
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [CORS](https://expressjs.com/en/resources/middleware/cors.html)
- [Axios](https://axios-http.com/)

---

## 📦 Instalação Local

### 🔧 Pré-requisitos
- Node.js v18+
- MongoDB Atlas (ou local)
- NPM

---

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/musicaly-player.git
cd musicaly-player
```

---

### 2. Configure o back-end

```bash
cd back-end
cp .env.example .env            # ou crie manualmente
```

Preencha o `.env` com sua conexão MongoDB:

```
MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/?retryWrites=true&w=majority
```

Instale as dependências e inicie o servidor:

```bash
npm install
node api/server.js
```

---

### 3. Configure o front-end

```bash
cd ../front-end
npm install
npm run dev
```

---

## 🌍 Deploy

Este projeto foi deployado com [Render](https://render.com):

- **Back-end:** como um Web Service Node.js
- **Front-end:** build do Vite servida como estática via `Express`

Para servir corretamente os arquivos do front-end, use no `server.js` do back-end:

```js
import path from "path";
app.use(express.static(path.join(__dirname, "../../front-end/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../front-end/dist/index.html"));
});
```

E execute o build antes de subir:

```bash
cd front-end
npm run build
```

---

## 📌 Funcionalidades

- 🔎 Listagem de artistas e músicas
- 🔗 Rotas dinâmicas para cada artista e música (`/artist/:id`, `/song/:id`)
- 🔁 Integração com MongoDB via API REST
- 📡 Backend com Express
- 🌐 Interface responsiva e moderna com React

---

## 🐛 Problemas Comuns

- `process is not defined`: evite `process.env` no front-end com Vite. Use `import.meta.env`.
- `vite: not found`: instale localmente com `npm install vite` ou use via script (`vite build` no `package.json`).
- `ENOENT: no such file or directory, dist/index.html`: ocorre se o `vite build` não foi executado ou o caminho do `static` está errado.

---

## 👨‍💻 Autor

Desenvolvido por **Eduardo Ceretta** como parte da jornada de aprendizado Full Stack.  
Sinta-se à vontade para contribuir ou enviar feedback!

---

## 📃 Licença

Este projeto está licenciado sob a licença **MIT**.  
Você pode usar, modificar e distribuir livremente.

---
