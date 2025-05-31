import express, { Request, Response } from 'express';
import { sendPrompt } from '../services/chatService';
import { ChatModel } from '../models/Message';

const chatRoutes = express.Router();

chatRoutes.post('/chat', async (req: Request, res: Response) => {
  const { publico, pergunta } = req.body;

  try {
    const start = Date.now();
    const resposta = await sendPrompt(publico, pergunta);
    console.log(`Tempo de resposta: ${Date.now() - start}ms`);

    res.json({ resposta });
  } catch (error) {
    console.error('Erro ao processar pergunta:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

chatRoutes.get('/chat/history/:userId', async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const chat = await ChatModel.findOne({ userId });

    if (!chat) {
      res.status(404).json({ error: 'Histórico não encontrado para este usuário.' });
      return;
    }

    res.json({ messages: chat.messages });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

export default chatRoutes;
