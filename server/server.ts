import express from "express";
import cors from "cors";
import fs from "fs";
import CONFIG from "../config"; // Import the config

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "./server/challenges.json";

// Read existing challenges
app.get("/api/challenges", (req, res) => {
  const data = fs.existsSync(DATA_FILE) ? fs.readFileSync(DATA_FILE, "utf8") : "[]";
  res.json(JSON.parse(data));
});

// Add a new challenge
app.post("/api/challenges", (req, res) => {
  const data = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) : [];
  data.push(req.body);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// Clear challenges (For canceling active challenge)
app.delete("/api/challenges", (req, res) => {
  fs.writeFileSync(DATA_FILE, "[]");
  res.json({ success: true });
});

app.listen(CONFIG.PORT, () => console.log("Server running on http://localhost:3001"));
