import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

// Allow frontend (Vercel) to call backend
app.use(cors({
  origin: [
    "http://localhost:5173",          // dev frontend
    /\.vercel\.app$/                  // any deployed Vercel frontend
  ],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
