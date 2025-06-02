
import { useState, useEffect } from 'react';


export interface Message {
    author: 'user' | 'autoBot';
    text: string;
    timestamp: string;
}

export interface ConversationHistory {
    id: string;
    timestamp: string;
    title: string;
    messages: Message[];
}

// Mock de dados 
const mockConversations: ConversationHistory[] = [
    {
        id: '1',
        timestamp: '2025-05-31T10:30:00Z', 
        title: 'Dúvidas sobre o autoBot',
        messages: [
            { author: 'user', text: 'Olá, gostaria de saber mais sobre o autoBot.', timestamp: '2025-05-31T10:30:00Z' },
            { author: 'autoBot', text: 'O autoBot é um assistente virtual projetado para te ajudar com diversas tarefas e informações.', timestamp: '2025-05-31T10:30:30Z' },
            { author: 'user', text: 'Entendi, ele pode me ajudar com planejamento de viagens?', timestamp: '2025-05-31T10:31:00Z' },
            { author: 'autoBot', text: 'Sim, com certeza! Posso te dar dicas de destinos, passagens, hospedagem e muito mais.', timestamp: '2025-05-31T10:31:45Z' },
            { author: 'user', text: 'Legal, muito obrigado!', timestamp: '2025-05-31T10:32:00Z' },
            { author: 'autoBot', text: 'De nada! Fico feliz em ajudar. Há algo mais em que posso ser útil?', timestamp: '2025-05-31T10:32:30Z' },
        ],
    },
    {
        id: '2',
        timestamp: '2025-05-30T15:00:00Z', 
        title: 'Planejamento de viagem para Europa',
        messages: [
            { author: 'user', text: 'Quero planejar uma viagem para a Europa no próximo ano.', timestamp: '2025-05-30T15:00:00Z' },
            { author: 'autoBot', text: 'Que legal! Para qual país ou região você gostaria de ir? Tem alguma preferência?', timestamp: '2025-05-30T15:00:45Z' },
            { author: 'user', text: 'França e Itália, com foco em cultura e gastronomia.', timestamp: '2025-05-30T15:01:30Z' },
            { author: 'autoBot', text: 'Ótimo, vamos começar com as dicas de Paris e Roma.', timestamp: '2025-05-30T15:02:15Z' },
            { author: 'user', text: 'Perfeito! Quais seriam os pontos turísticos imperdíveis em Paris?', timestamp: '2025-05-30T15:03:00Z' },
            { author: 'autoBot', text: 'Em Paris, você não pode perder a Torre Eiffel, o Museu do Louvre, a Catedral de Notre-Dame...', timestamp: '2025-05-30T15:03:45Z' },
        ],
    },
    {
        id: '3',
        timestamp: '2025-03-10T09:45:00Z', 
        title: 'Ideias para presente de aniversário',
        messages: [
            { author: 'user', text: 'Preciso de ideias de presente para o meu irmão, ele fará aniversário em breve.', timestamp: '2025-03-10T09:45:00Z' },
            { author: 'autoBot', text: 'Qual o estilo dele? Ele gosta de tecnologia, livros, esportes, jogos, música?', timestamp: '2025-03-10T09:45:40Z' },
            { author: 'user', text: 'Ele adora jogos, principalmente RPGs e eSports!', timestamp: '2025-03-10T09:46:15Z' },
            { author: 'autoBot', text: 'Excelente! Que tal um novo console, um jogo lançamento, ou talvez acessórios de gaming? Podemos explorar as opções.', timestamp: '2025-03-10T09:47:00Z' },
            { author: 'user', text: 'Hum, ele já tem um console. Talvez um jogo específico?', timestamp: '2025-03-10T09:47:45Z' },
            { author: 'autoBot', text: 'Tem algum título ou gênero que ele esteja ansioso para jogar?', timestamp: '2025-03-10T09:48:10Z' },
        ],
    },
    {
        id: '4',
        timestamp: '2025-03-05T11:00:00Z',
        title: 'Ajuda com receita de bolo',
        messages: [
            { author: 'user', text: 'Olá autoBot, você pode me ajudar com uma receita de bolo de chocolate simples?', timestamp: '2025-03-05T11:00:00Z' },
            { author: 'autoBot', text: 'Claro! Para um bolo de chocolate simples, você vai precisar de: 2 xícaras de farinha de trigo, 1 xícara de chocolate em pó, 1 xícara de açúcar, 3 ovos, 1/2 xícara de óleo, 1 xícara de leite e 1 colher de sopa de fermento em pó.', timestamp: '2025-03-05T11:00:30Z' },
            { author: 'user', text: 'Entendi! Qual o modo de preparo?', timestamp: '2025-03-05T11:01:00Z' },
            { author: 'autoBot', text: 'Primeiro, misture os ingredientes secos. Em outra tigela, bata os ovos, óleo e leite. Junte as duas misturas e, por último, adicione o fermento.', timestamp: '2025-03-05T11:01:45Z' },
        ],
    },
    {
        id: '5',
        timestamp: '2025-03-01T14:20:00Z', 
        title: 'Informações sobre clima',
        messages: [
            { author: 'user', text: 'Qual a previsão do tempo para São Paulo amanhã?', timestamp: '2025-03-01T14:20:00Z' },
            { author: 'autoBot', text: 'Para São Paulo amanhã, a previsão é de sol com algumas nuvens e temperatura máxima de 28°C.', timestamp: '2025-03-01T14:20:40Z' },
            { author: 'user', text: 'E para o fim de semana?', timestamp: '2025-03-01T14:21:00Z' },
            { author: 'autoBot', text: 'O fim de semana promete ser ensolarado, com temperaturas agradáveis e pouca chance de chuva.', timestamp: '2025-03-01T14:21:30Z' },
        ],
    },
    {
        id: '6',
        timestamp: '2025-02-20T08:00:00Z', 
        title: 'Definição de Inteligência Artificial',
        messages: [
            { author: 'user', text: 'Pode me dar uma definição simples de Inteligência Artificial?', timestamp: '2025-02-20T08:00:00Z' },
            { author: 'autoBot', text: 'Claro! Inteligência Artificial (IA) é um campo da ciência da computação dedicado a criar máquinas capazes de raciocinar, aprender e tomar decisões como humanos.', timestamp: '2025-02-20T08:00:45Z' },
        ],
    },
    {
        id: '7',
        timestamp: '2025-02-15T16:00:00Z', 
        title: 'Explicação de criptomoedas',
        messages: [
            { author: 'user', text: 'O que são criptomoedas e como funcionam?', timestamp: '2025-02-15T16:00:00Z' },
            { author: 'autoBot', text: 'Criptomoedas são moedas digitais ou virtuais que usam criptografia para segurança e operam em uma tecnologia descentralizada chamada blockchain.', timestamp: '2025-02-15T16:01:00Z' },
        ],
    },
    {
        id: '8',
        timestamp: '2025-01-01T12:00:00Z', 
        title: 'Feliz Ano Novo!',
        messages: [
            { author: 'user', text: 'Feliz Ano Novo, autoBot!', timestamp: '2025-01-01T12:00:00Z' },
            { author: 'autoBot', text: 'Feliz Ano Novo para você também! Que 2025 seja repleto de conversas interessantes.', timestamp: '2025-01-01T12:00:30Z' },
        ],
    },
];


// Helper para agrupar conversas por data (mantido o mesmo)
const groupConversationsByDate = (conversations: ConversationHistory[]) => {
    const groups: { [key: string]: ConversationHistory[] } = {};
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    conversations.forEach(conv => {
        const convDate = new Date(conv.timestamp);
        let groupKey: string;

        if (convDate.toDateString() === today.toDateString()) {
            groupKey = 'Hoje';
        } else if (convDate.toDateString() === yesterday.toDateString()) {
            groupKey = 'Ontem';
        } else {
            const month = convDate.toLocaleString('pt-BR', { month: 'long' });
            const year = convDate.getFullYear();
            groupKey = `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
        }

        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(conv);
    });

    const orderedKeys = Object.keys(groups).sort((a, b) => {
        if (a === 'Hoje') return -2;
        if (b === 'Hoje') return 2;
        if (a === 'Ontem') return -1;
        if (b === 'Ontem') return 1;

        const dateA = groups[a][0] ? new Date(groups[a][0].timestamp).getTime() : 0;
        const dateB = groups[b][0] ? new Date(groups[b][0].timestamp).getTime() : 0;
        return dateB - dateA;
    });

    const orderedGroups: { [key: string]: ConversationHistory[] } = {};
    orderedKeys.forEach(key => {
        orderedGroups[key] = groups[key].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    });

    return orderedGroups;
};

export const useHistoryData = () => {
    const [conversations, setConversations] = useState<ConversationHistory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 700));
                const data = mockConversations; // Use mock de dados
                setConversations(data);
                if (data.length > 0) {
                    setSelectedConversationId(data[0].id); // Seleciona a primeira conversa por padrão
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const groupedConversations = groupConversationsByDate(conversations);
    const selectedConversation = conversations.find(
        (conv) => conv.id === selectedConversationId
    );

    return {
        conversations,
        loading,
        error,
        selectedConversationId,
        setSelectedConversationId,
        groupedConversations,
        selectedConversation,
    };
};