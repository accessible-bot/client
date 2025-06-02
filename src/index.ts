import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import http from 'http'; 
import userRoutes from './routes/userRoutes';
import { ChatController } from './controllers/chatController';
import chatRoutes from './routes/chatRoutes';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

const chatController = new ChatController(server);

// const connectionString = process.env.MONGO_URI;
// if (!connectionString) {
//   throw new Error("Key not found");
// }

// mongoose.connect(connectionString)
//   .then(() => console.log('Conectado ao MongoDB!'))
//   .catch(err => console.error('Erro ao conectar ao MongoDB', err));

prisma.$connect()
  .then((): void => console.log('Conectado ao PostgreSQL via Prisma!'))
  .catch((err: Error): void => console.error('Erro na conexão Prisma → PostgreSQL:', err));

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
