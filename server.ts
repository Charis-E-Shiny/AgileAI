import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API to get results
  app.get("/api/results/:type", (req, res) => {
    const { type } = req.params;
    const filePath = path.join(process.cwd(), 'results', `${type}_results.json`);
    
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      res.json(JSON.parse(data));
    } else {
      res.status(404).json({ error: "Results not found" });
    }
  });

  // API to trigger pipeline
  app.post("/api/run-pipeline", (req, res) => {
    exec("python3 run_pipeline.py", (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ error: stderr });
      }
      res.json({ message: "Pipeline completed", output: stdout });
    });
  });

  // Serve charts as static files
  app.use('/charts', express.static(path.join(process.cwd(), 'charts')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
