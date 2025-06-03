import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { IoMdSearch, IoMdChatboxes } from "react-icons/io";

// Importa o custom hook e os componentes de histórico
import { useHistoryData } from '../../hooks/useHistoryData';
import HistoryListItem from '../../components/historico/HistoryListItem';
import ConversationDetailView from '../../components/historico/ConversationDetailView';

// Interface para mensagens do chat ATIVO
interface ActiveConversationMessage {
    id: string;
    author: 'user' | 'autbot';
    text: string;
    timestamp: string;
}

const Chat = () => {
    const navigate = useNavigate();
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [activeChatMessages, setActiveChatMessages] = useState<ActiveConversationMessage[]>([]);

    // Novo estado para controlar qual visualização está ativa: 'chat' ou 'history'
    const [currentView, setCurrentView] = useState<'chat' | 'history'>('chat'); // Começa no chat padrão

    // Usa o hook de dados do histórico
    const {
        loading: historyLoading,
        error: historyError,
        selectedConversationId,
        setSelectedConversationId,
        groupedConversations,
        selectedConversation,
    } = useHistoryData(); // Este hook agora gerencia o estado do histórico

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (currentMessage.trim() === "") {
            return;
        }

        const newMessage: ActiveConversationMessage = {
            id: Date.now().toString(),
            author: 'user',
            text: currentMessage.trim(),
            timestamp: new Date().toISOString(),
        };

        setActiveChatMessages(prevMessages => [...prevMessages, newMessage]);
        setCurrentMessage("");

        // TODO: Enviar mensagem para o backend aqui
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const showChatView = () => {
        setCurrentView('chat');
        // Você pode querer redefinir activeChatMessages ou carregar uma nova conversa aqui
    };
    const showHistoryView = () => {
        setCurrentView('history');
        // Quando entra no histórico, se não houver um selecionado, seleciona o primeiro
        if (!selectedConversationId && Object.keys(groupedConversations).length > 0) {
            setSelectedConversationId(Object.values(groupedConversations)[0][0].id);
        }
    };

    return (
        <div className="chat-container">
            <div className="top-bar">
                <div className="top-bar-logo"><img src="/AutBot_Logo.png" alt="Logo AutBot" /></div>
                <div className="logo-title-container">


                    <button className="botao-inicio" onClick={showChatView}>AutBot</button>
                </div>
                <div className="top-bar-links">

                    <button className="botao-sobre" onClick={() => navigate('/sobre')}>Sobre</button>
                    <button className="botao-historico" onClick={showHistoryView}>Histórico</button>
                    <button title="Perfil" className="botao-perfil" ><FaUserCircle /></button>
                </div>
            </div>

            <div className="content-area-below-top-bar">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="icon-section">
                        <button title="buscar chat" className="send-button" ><IoMdSearch /></button>
                        <button title="criar um novo chat" className="send-button"><IoMdChatboxes /></button>
                    </div>

                    {currentView === 'chat' ? (
                        <div className="conversations-list">
                            {/* Sua lista de conversas ATIVAS (se houver) */}
                            <p className="no-conversations-message">
                                Inicie uma nova conversa para que ela apareça aqui.
                            </p>
                        </div>
                    ) : (
                        // Conteúdo da sidebar do histórico
                        <div className="conversations-list">
                            {historyLoading ? (
                                <div className="history-section-loading">
                                    <div className="loading-spinner"></div>
                                    <p>Carregando histórico...</p>
                                </div>
                            ) : historyError ? (
                                <div className="history-section-error">
                                    <p>Erro: {historyError}</p>
                                </div>
                            ) : Object.keys(groupedConversations).length === 0 ? (
                                <p className="no-conversations-message">
                                    Você ainda não teve nenhuma conversa salva.<br />Interaja com o AutBot para começar!
                                </p>
                            ) : (
                                <div className="history-list-groups">
                                    {Object.keys(groupedConversations).map((groupName) => (
                                        <div key={groupName} className="history-group">
                                            <h3 className="history-group-title">{groupName}</h3>
                                            <div className="history-group-items">
                                                {groupedConversations[groupName].map((conv) => (
                                                    <HistoryListItem
                                                        key={conv.id}
                                                        conversation={conv}
                                                        onSelect={setSelectedConversationId}
                                                        isSelected={conv.id === selectedConversationId}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </aside>

                {/* Main Chat Area */}
                <div className="main-chat">
                    <header className="chat-header">
                        {currentView === 'chat' ? (
                            <>
                                <div>Chat Ativo</div>
                            </>
                        ) : (
                            <>
                                <div>Histórico de Conversas</div>
                            </>
                        )}
                    </header>

                    <main className="chat-body">
                        {currentView === 'chat' ? (
                            <>
                                <div className="chat-messages-live">
                                    {activeChatMessages.length === 0 ? (
                                        <div className="chat-card">
                                            <h2>Em que posso ajudar?</h2>
                                        </div>
                                    ) : (
                                        activeChatMessages.map((message, index) => (
                                            <div key={index} className={`chat-bubble ${message.author}`}>
                                                <p className="message-text">{message.text}</p>
                                                <span className="message-time">
                                                    {new Date(message.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="chat-input-container">
                                    <input
                                        type="text"
                                        placeholder="Escreva sua mensagem aqui..."
                                        value={currentMessage}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button
                                        type="button"
                                        className="send-button"
                                        onClick={handleSendMessage}
                                        title="Enviar mensagem"
                                        aria-label="Enviar mensagem"
                                    >
                                        <FaPaperPlane />
                                    </button>
                                </div>
                            </>
                        ) : (
                            // Conteúdo da área principal do histórico
                            <ConversationDetailView conversation={selectedConversation ?? null} />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Chat;
