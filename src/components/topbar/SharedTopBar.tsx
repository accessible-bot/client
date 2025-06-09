import { useNavigate } from 'react-router-dom';
import './SharedTopBar.css';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa'; 

interface SharedTopBarProps {
  pageType: 'login' | 'register' | 'chat' | 'tutorial';
  onShowChatView?: () => void;    // Específico para a página de Chat
  onShowHistoryView?: () => void; // Específico para a página de Chat
  isHistoryViewActive?: boolean;  // Indica se a visualização de histórico está ativa no chat
}

const SharedTopBar = ({ pageType, onShowChatView, onShowHistoryView, isHistoryViewActive }: SharedTopBarProps) => {
  const navigate = useNavigate();

  const handleAutBotClick = () => {
    if (pageType === 'chat' && onShowChatView) {
      onShowChatView(); // Volta para a visualização principal do chat
    } else if (pageType === 'tutorial') { // Volta para a visualização principal do histórico
      navigate('/'); // Leva para a página de chat
    } else {
      navigate('/'); // Comportamento padrão para login/register (vai para a home/login)
    }
  };

  return (
    <header className="shared-top-bar">
      <div className="shared-top-bar-left">
        <img src="/AutBot_Logo.png" alt="AutBot Logo" className="shared-logo" />
        <button className="shared-app-name-button" onClick={handleAutBotClick}>
          AutBot
        </button>
      </div>
      <nav className="shared-top-bar-right">

        {pageType === 'tutorial' && (
          <button title="Voltar" className="shared-nav-button icon-button" onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
          </button>
        )}
        
        {pageType === 'chat' && (
          <>
            
            <button className="shared-nav-button" onClick={() => navigate('/')}> {/* Assume / como logout/home */}
              Sair
            </button>
            
            {isHistoryViewActive ? (
              <button title="Voltar ao Chat" className="shared-nav-button icon-button" onClick={onShowChatView}>
                <FaArrowLeft size={20} />
              </button>
            ) : (
              <button className="shared-nav-button" onClick={onShowHistoryView}>
                Histórico
              </button>
            )}

          </>
        )}

        {(pageType === 'login' || pageType === 'register' || (pageType === 'chat' && !isHistoryViewActive)) && (
          <button className="shared-nav-button" onClick={() => navigate('/tutorial')}>
            Tutorial
          </button>
        )}

        {pageType === 'login' && (
          <button className="shared-nav-button" onClick={() => navigate('/cadastro')}>
            Cadastre-se
          </button>
        )}

        {pageType === 'register' && (
          <button className="shared-nav-button" onClick={() => navigate('/')}>
            Login
          </button>
        )}

        {pageType === 'chat' && (
                      <button title="Perfil" className="shared-nav-button icon-button" onClick={() => navigate('/perfil')}>
              <FaUserCircle size={20} />
            </button>

        )}

      </nav>
    </header>
  );
};

export default SharedTopBar;