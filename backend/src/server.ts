import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import geminiRoutes from "./routes/gemini.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/gemini", geminiRoutes);

app.get("/", (_, res) => {
  res.send("ZiaraQA Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
