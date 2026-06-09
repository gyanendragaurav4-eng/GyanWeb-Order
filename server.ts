import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import http from 'http';
import { Server } from 'socket.io';
import multer from 'multer';
import fs from 'fs';
import { initDB } from './server/db.js';
import { setupAuth } from './server/auth.js';
import { apiRouter } from './server/api.js';

const PORT = 3000;

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: '*' } });

  app.use(express.json());

  // Initialize DB
  await initDB();
  
  // Create uploads directory if not exists
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
  
  // Serve uploaded files securely (in a real app, use auth middleware, for now public)
  app.use('/uploads', express.static(uploadsDir));

  app.use('/api/auth', setupAuth());
  app.use('/api', apiRouter(io));

  // Vite middlewware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Socket.io for Real-time Chat
  io.on('connection', (socket) => {
    socket.on('join_order_room', (orderId) => {
      socket.join(orderId);
    });
    
    // In actual implementation we will handle sending messages via API so we can save to DB
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
