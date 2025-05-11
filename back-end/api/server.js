import express from "express";
import cors from "cors";
import { db } from "./connect.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Corrigindo __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const __dirname = path.resolve();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Rotas da API com melhor tratamento de erro
app.get("/api/", (request, response) => {
  response.send("API está funcionando!");
});

app.get("/api/debug", (request, response) => {
  // Rota de debug para verificar as configurações atuais
  response.json({
    environment: process.env.NODE_ENV || "development",
    mongodb_connected: !!db,
    collections: db ? Object.keys(db.collections) : [],
    current_directory: process.cwd(),
    dirname: __dirname,
  });
});

app.get("/api/artists", async (request, response) => {
  try {
    console.log("📊 Consultando coleção 'artists'...");

    // Verificar se o db está definido
    if (!db) {
      console.error("❌ Erro: Conexão com o banco de dados não estabelecida");
      return response
        .status(500)
        .json({ error: "Conexão com o banco de dados não estabelecida" });
    }

    // Verificar se a coleção existe
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);
    console.log("📚 Coleções disponíveis:", collectionNames);

    if (!collectionNames.includes("artists")) {
      console.error("❌ Erro: Coleção 'artists' não encontrada");
      return response.status(404).json({
        error: "Coleção 'artists' não encontrada",
        availableCollections: collectionNames,
      });
    }

    // Consultar a coleção
    const artists = await db.collection("artists").find({}).toArray();
    console.log(`✅ Encontrados ${artists.length} artistas`);

    response.json(artists);
  } catch (error) {
    console.error("❌ Erro ao consultar artistas:", error);
    response.status(500).json({ error: error.message, stack: error.stack });
  }
});

app.get("/api/songs", async (request, response) => {
  try {
    console.log("📊 Consultando coleção 'songs'...");

    if (!db) {
      console.error("❌ Erro: Conexão com o banco de dados não estabelecida");
      return response
        .status(500)
        .json({ error: "Conexão com o banco de dados não estabelecida" });
    }

    const songs = await db.collection("songs").find({}).toArray();
    console.log(`✅ Encontrados ${songs.length} músicas`);

    response.json(songs);
  } catch (error) {
    console.error("❌ Erro ao consultar músicas:", error);
    response.status(500).json({ error: error.message, stack: error.stack });
  }
});

// app.get("/api/", (request, response) => {
//   response.send("ola");
// });

// app.get("/api/artists", async (request, response) => {
//   response.send(await db.collection("artists").find({}).toArray());
// });

// app.get("/api/songs", async (request, response) => {
//   response.send(await db.collection("songs").find({}).toArray());
// });

app.use(express.static(path.join(__dirname, "../../front-end/dist")));

app.get("*", async (request, response) => {
  response.sendFile(path.join(__dirname, "../../front-end/dist/index.html"));
});

// Detectar o caminho correto para o frontend baseado no ambiente
let frontendPath;
const possiblePaths = [
  path.join(__dirname, "../../front-end/dist"), // Local dev
  path.join(__dirname, "../../../front-end/dist"), // Render
  path.join(__dirname, "../front-end/dist"), // Outro possível caminho
  path.join(process.cwd(), "front-end/dist"), // Usando o diretório de trabalho atual
];

// Percorre os possíveis caminhos e usa o primeiro que existir
for (const pathToCheck of possiblePaths) {
  try {
    if (fs.existsSync(pathToCheck)) {
      console.log(`✅ Encontrado diretório frontend em: ${pathToCheck}`);
      frontendPath = pathToCheck;
      break;
    }
  } catch (err) {
    console.log(`❌ Diretório não encontrado: ${pathToCheck}`);
  }
}

if (!frontendPath) {
  console.warn(
    "⚠️ AVISO: Nenhum caminho do frontend encontrado! Servindo apenas a API."
  );
} else {
  // Serve arquivos estáticos
  app.use(express.static(frontendPath));

  // Rota wildcard para o SPA
  app.get("*", (request, response) => {
    const indexPath = path.join(frontendPath, "index.html");

    // Verifica se o arquivo existe antes de enviá-lo
    if (fs.existsSync(indexPath)) {
      response.sendFile(indexPath);
    } else {
      response.status(404).send(`Arquivo não encontrado: ${indexPath}`);
    }
  });
}

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
