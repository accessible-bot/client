import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import http from 'http'; 
import userRoutes from './routes/userRoutes';
import { ChatController } from './controllers/chatController';
import chatRoutes from './routes/chatRoutes';

dotenv.config();

const app = express();
const server = http.createServer(app);

const chatController = new ChatController(server);

const connectionString = process.env.MONGO_URI;
if (!connectionString) {
  throw new Error("Key not found");
}

mongoose.connect(connectionString)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST'],    
  allowedHeaders: ['Content-Type', 'Authorization'],  
  credentials: true,  
}));

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
