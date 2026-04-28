import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import apiRoutes from './routes/api.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Real-time SOS handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('trigger_sos', async (data) => {
    console.log('SOS TRIGGERED:', data);
    
    // In a real app, we would save this to DB
    // const sosEvent = await prisma.sosEvent.create({ ... })
    
    // Broadcast to all connected clients (e.g., admin dashboard, nearby users)
    io.emit('sos_alert', {
      id: Date.now().toString(),
      latitude: data.latitude,
      longitude: data.longitude,
      timestamp: new Date().toISOString(),
      user: data.user || 'Anonymous'
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
