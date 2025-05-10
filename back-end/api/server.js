import express from "express";
import cors from "cors";
import { db } from "./connect.js";

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/", (request, response) => {
  response.send("ola");
});

app.get("/api/artists", async (request, response) => {
  response.send(await db.collection("artists").find({}).toArray());
});
app.get("/api/songs", async (request, response) => {
  response.send(await db.collection("songs").find({}).toArray());
});

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
