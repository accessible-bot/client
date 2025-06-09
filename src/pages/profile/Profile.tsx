import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedTopBar from '../../components/topbar/SharedTopBar';
import './profile.css';
import { FaUserCircle, FaEnvelope, FaInfoCircle, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

interface UserProfile {
  name: string;
  email: string;
  bio: string;

}

const Profile = () => {
  const navigate = useNavigate(); // Embora SharedTopBar lide com o "voltar", pode ser útil aqui.

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile>({
    name: 'Nome do Usuário Exemplo',
    email: 'usuario@exemplo.com',
    bio: 'Professor, tutor, familiar...'
  });
  const [tempProfileData, setTempProfileData] = useState<UserProfile>(profileData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setTempProfileData(profileData); // Reseta os dados temporários para os dados atuais ao iniciar a edição
    setIsEditing(true);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    // Aqui você faria a chamada API para salvar os dados
    console.log('Salvando dados:', tempProfileData);
    setProfileData(tempProfileData);
    setIsEditing(false);
    // Adicionar feedback ao usuário (ex: toast notification)
  };

  const handleCancel = () => {
    setTempProfileData(profileData); // Restaura os dados originais
    setIsEditing(false);
  };
  
  return (
    <div className="profile-page-container">
      <SharedTopBar pageType="profile" />
      <main className="profile-content">
        <form onSubmit={handleSave} className="profile-card">
          <div className="profile-header">
            <h2>{isEditing ? 'Editar Perfil' : 'Meu Perfil'}</h2>
          </div>

      {/* Novo container para permitir rolagem apenas dos campos */}
          <div className="profile-fields-scroll-container">
            <div className="profile-field">
              <label htmlFor="name"><FaUserCircle className="field-icon" /> Nome:</label>
              {isEditing ? (
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={tempProfileData.name}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <span>{profileData.name}</span>
              )}
            </div>

                      <div className="profile-field">
              <label htmlFor="email"><FaEnvelope className="field-icon" /> Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={tempProfileData.email}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <span>{profileData.email}</span>
              )}
            </div>

            <div className="profile-field">
              <label htmlFor="bio"><FaInfoCircle className="field-icon" /> Tipo de conta:</label>
              {isEditing ? (
                <textarea
                  id="bio"
                  name="bio"
                  value={tempProfileData.bio}
                  onChange={handleInputChange}
                  rows={3} /* Reduzido para melhor encaixe no card quadrado/compacto */
                />
              ) : (
                <p className="profile-bio">{profileData.bio || "Nenhuma biografia adicionada."}</p>
              )}
            </div>
          </div> {/* Fim do .profile-fields-scroll-container */}

          <div className="profile-actions">
            {isEditing ? (
              <>
                <button type="submit" className="profile-button save-button">
                  <FaSave /> Salvar Alterações
                </button>
                <button type="button" onClick={handleCancel} className="profile-button cancel-button">
                  <FaTimes /> Cancelar
                </button>
              </>
            ) : (
              <button type="button" onClick={handleEdit} className="profile-button edit-button">
                <FaEdit /> Editar Perfil
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
