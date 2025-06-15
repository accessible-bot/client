import { useNavigate } from 'react-router-dom';
import './SharedTopBar.css';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa'; 

interface SharedTopBarProps {
  pageType: 'login' | 'register' | 'chat' | 'tutorial' | 'profile' | 'info';
  onShowChatView?: () => void;    
  onShowHistoryView?: () => void; 
  isHistoryViewActive?: boolean;  
}

const SharedTopBar = ({ pageType, onShowChatView, onShowHistoryView, isHistoryViewActive }: SharedTopBarProps) => {
  const navigate = useNavigate();

  const showBackButton = pageType === 'tutorial' || pageType === 'profile' || pageType === 'info';

  const handleAutBotClick = () => {
    if (pageType === 'chat' && onShowChatView) {
      onShowChatView(); 
    } else {
      navigate('/');
    }
  };

  return (
    <header className="shared-top-bar">
      <div className="shared-top-bar-left">
        <div className="shared-top-bar-return">

        {showBackButton && (
          <button title="Voltar" className="shared-nav-button icon-button" onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
          </button>
        )}
        </div>
        <img src="/AutBot_Logo.png" alt="AutBot Logo" className="shared-logo" />
        <button className="shared-app-name-button" onClick={handleAutBotClick}>
          AutBot
        </button>
      </div>

      <nav className="shared-top-bar-right">
        {pageType === 'chat' && (
          <>
            <button className="shared-nav-button" onClick={() => navigate('/')}>
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
          <>
            <button className="shared-nav-button" onClick={() => navigate('/cadastro')}>
              Cadastre-se
            </button>
            <button className="shared-nav-button" onClick={() => navigate('/sobre')}>
              Info
            </button>
          </>
        )}

        {pageType === 'register' && (
          <>
            <button className="shared-nav-button" onClick={() => navigate('/')}>
              Login
            </button>
            <button className="shared-nav-button" onClick={() => navigate('/sobre')}>
              Info
            </button>
          </>
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
