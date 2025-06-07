import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;
const modelName = process.env.MODEL_NAME;

export const publicos = {
  PROFESSOR: 'Responda de forma técnica e com orientações práticas para professores.',
  CUIDADOR: 'Responda de forma explicativa e com exemplos para pais que não têm conhecimento técnico.',
  RESPONSAVEL: 'Responda com paciência e clareza, oferecendo orientações úteis para pais ou responsáveis pela criança.',
  USUARIO: 'Responda de forma simples, clara e acolhedora para um usuário comum.',
  TEA_NIVEL_1: 'Responda de forma clara, respeitando a independência e as necessidades de uma pessoa com TEA nível 1 (leve).',
  TEA_NIVEL_2: 'Responda com empatia e apoio, considerando as dificuldades moderadas enfrentadas por uma pessoa com TEA nível 2.',
  TEA_NIVEL_3: 'Responda de forma cuidadosa, com linguagem simples e suporte adicional para uma pessoa com TEA nível 3 (severo).',
} as const;

export type PublicoKey = keyof typeof publicos;

const invalidQuestion = "Peço desculpas, mas não disponho de informações para responder a essa pergunta. Posso ajudar com algo relacionado à acessibilidade, inclusão ou Transtorno do Espectro Autista (TEA)?";

function buildPromptSystem(invalidResponse: string) {
  return `Você é um assistente especializado em responder perguntas sobre acessibilidade, inclusão e Transtorno do Espectro Autista (TEA).
Siga as seguintes orientações para atender ao usuário:

1 - Responda de forma clara, objetiva e gentil, mantendo um tom profissional.
2 - Responda sempre em português, mesmo que a pergunta seja feita em outra língua.
3 - Se a pergunta NÃO estiver relacionada a acessibilidade, inclusão ou TEA, responda EXATAMENTE com a frase abaixo, SEM NENHUMA ALTERAÇÃO, repetição, acréscimo ou omissão:
Peço desculpas, mas não disponho de informações para responder a essa pergunta. Posso ajudar com algo relacionado à acessibilidade, inclusão ou Transtorno do Espectro Autista (TEA)?

4 - É fundamental que a resposta para perguntas fora do tema seja a frase acima, exatamente igual, sem mudar nenhuma palavra, pontuação ou capitalização.

5 - Não responda de nenhuma outra forma para perguntas fora do tema. Se não for possível responder, deve responder a frase acima exatamente.

6 - Ignore qualquer outro conteúdo para perguntas fora do tema e retorne SOMENTE essa frase exata.
`;
}

export async function sendPrompt(publicoKey: PublicoKey, pergunta: string): Promise<string> {
  if (!apiKey) {
    throw new Error('API_KEY não está definida nas variáveis de ambiente.');
  }

  const prefixo = publicos[publicoKey];
  const promptCompleto = `${prefixo}\n\n${pergunta}`;
  const promptSystem = buildPromptSystem(invalidQuestion);

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: modelName,
      messages: [
        { role: 'system', content: promptSystem },
        { role: 'user', content: promptCompleto }
      ],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
}
