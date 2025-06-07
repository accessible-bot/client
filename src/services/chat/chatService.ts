import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;
const modelName = process.env.MODEL_NAME 

const publicos = {
  PROFESSOR: 'Responda de forma técnica e com orientações práticas para professores.',
  CUIDADOR: 'Responda de forma explicativa e com exemplos para pais que não têm conhecimento técnico.',
  RESPONSAVEL: 'Responda com paciência e clareza, oferecendo orientações úteis para pais ou responsáveis pela criança.',
  USUARIO: 'Responda de forma simples, clara e acolhedora para uma pessoa com Transtorno do Espectro Autista (TEA).',
  TEA_NIVEL_1: 'Responda de forma clara, respeitando a independência e as necessidades de uma pessoa com TEA nível 1 (leve).',
  TEA_NIVEL_2: 'Responda com empatia e apoio, considerando as dificuldades moderadas enfrentadas por uma pessoa com TEA nível 2.',
  TEA_NIVEL_3: 'Responda de forma cuidadosa, com linguagem simples e suporte adicional para uma pessoa com TEA nível 3 (severo).',
} as const;

export type PublicoKey = keyof typeof publicos;


export async function sendPrompt(publicoKey: PublicoKey, pergunta: string): Promise<string> {
  if (!apiKey) {
    throw new Error('API_KEY não está definida nas variáveis de ambiente.');
  }

  const prefixo = publicos[publicoKey];
  const promptCompleto = `${prefixo}\n\n${pergunta}`;

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: modelName,
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente especializado em acessibilidade e inclusão para pessoas com TEA.'
        },
        {
          role: 'user',
          content: promptCompleto
        }
      ],
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content;
}
