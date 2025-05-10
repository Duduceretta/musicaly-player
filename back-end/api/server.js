import express from "express";
import cors from "cors";
import { db } from "./connect.js";
import path from "path";

const __dirname = path.resolve();

const app = express();
const PORT = 5000;

app.use(cors());

// Rotas da API com melhor tratamento de erro
app.get("/api/", (request, response) => {
  response.send("API está funcionando!");
});

app.get("/api/debug", (request, response) => {
  // Rota de debug para verificar as configurações atuais
  response.json({
    environment: process.env.NODE_ENV || 'development',
    mongodb_connected: !!db,
    collections: db ? Object.keys(db.collections) : [],
    current_directory: process.cwd(),
    dirname: __dirname
  });
});

app.get("/api/artists", async (request, response) => {
  try {
    console.log("📊 Consultando coleção 'artists'...");
    
    // Verificar se o db está definido
    if (!db) {
      console.error("❌ Erro: Conexão com o banco de dados não estabelecida");
      return response.status(500).json({ error: "Conexão com o banco de dados não estabelecida" });
    }
    
    // Verificar se a coleção existe
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log("📚 Coleções disponíveis:", collectionNames);
    
    if (!collectionNames.includes('artists')) {
      console.error("❌ Erro: Coleção 'artists' não encontrada");
      return response.status(404).json({ error: "Coleção 'artists' não encontrada", availableCollections: collectionNames });
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
      return response.status(500).json({ error: "Conexão com o banco de dados não estabelecida" });
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

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
