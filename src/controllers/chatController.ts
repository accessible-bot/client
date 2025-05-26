import { WebSocketServer, WebSocket, Data } from 'ws';
import { PublicoKey, sendPrompt } from '../services/chatService';
import { ChatModel } from '../models/Message';

const MAX_MESSAGES = 50;

interface ClientMessage {
  userId: string;
  publico: PublicoKey;
  pergunta: string;
}

export class ChatController {
  wss: WebSocketServer;

  constructor(server: any) {
    this.wss = new WebSocketServer({ server });

    this.wss.on('connection', (ws: WebSocket) => {
      ws.on('message', async (data: Data) => {
        try {
          const rawMsg: ClientMessage = JSON.parse(data.toString());

          if (
            !rawMsg.userId ||
            typeof rawMsg.userId !== 'string' ||
            !rawMsg.publico ||
            !rawMsg.pergunta ||
            typeof rawMsg.pergunta !== 'string'
          ) {
            ws.send(JSON.stringify({ error: 'Dados inválidos na mensagem recebida.' }));
            return;
          }

          let chat = await ChatModel.findOne({ userId: rawMsg.userId });
          if (!chat) {
            chat = new ChatModel({ userId: rawMsg.userId, messages: [] });
          }

          chat.messages.push({
            role: 'user',
            content: rawMsg.pergunta,
            createdAt: new Date(),
          });

          if (chat.messages.length > MAX_MESSAGES) {
            chat.messages = chat.messages.slice(chat.messages.length - MAX_MESSAGES);
          }

          const resposta = await sendPrompt(rawMsg.publico, rawMsg.pergunta);

          chat.messages.push({
            role: 'assistant',
            content: resposta,
            createdAt: new Date(),
          });

          chat.updatedAt = new Date();

          await chat.save();

          ws.send(
            JSON.stringify({
              role: 'assistant',
              content: resposta,
            })
          );
        } catch (error) {
          console.error('Erro no WS chat:', error);
          ws.send(JSON.stringify({ error: 'Erro no processamento da mensagem' }));
        }
      });
    });
  }
}
