import express from "express";
import usuariosRoutes from "./routes/usuarios";

const app = express();
app.use(express.json());

// usar rotas de usuários
app.use("/usuarios", usuariosRoutes);

app.listen(3000, () => {
  console.log("🚀 API rodando na porta 3000");
});
