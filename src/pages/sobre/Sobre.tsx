import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sobre.css";

const Sobre = () => {

    const navigate = useNavigate();




    return (
        <div className="chat-container">
            <div className="top-bar">
  <div className="logo-title-container">
    <div className="top-bar-logo"> {/* Div que envolve a imagem do logo */}
      <img src="/AutBot_Logo.png" alt="Logo" />
    </div>
    <button className="botao-inicio">AutBot</button>
  </div> 
  <div className="top-bar-links"> {/* Div para os links da direita ou talvez só a seta pra voltar seja mais interessante */} 
    <button className="botao-perfil">Login</button>
  </div>
</div>


            <div className="main-chat">
                <main className="chat-body">
                    <div className="chatIMGsobre">
                        <img src="src\assets\Sobre_Autobot.png" alt="chatBotimagem" className="sobre-page-image"/>
                    </div>
                    <div className="sobre-card">
                        <h2><strong>Sobre o AutBot</strong></h2>
                        <p>
                            AutBot é um chatbot pensado para apoiar pessoas que convivem com o Transtorno do Espectro Autista (TEA). Criamos esse espaço acessível e acolhedor para que familiares, educadores, colegas de trabalho e interessados possam tirar dúvidas e encontrar informações claras e confiáveis sobre o autismo.
                            Com base em documentos oficiais, guias educacionais e legislações, o AutBot oferece respostas sobre temas do dia a dia relacionados ao TEA, promovendo mais compreensão, empatia e autonomia.
                            Nosso objetivo é facilitar o acesso à informação de forma respeitosa, segura e acessível — tudo isso por meio de uma conversa simples com o chatbot
                        </p>
                        <a href="">Clique aqui para saber como usar o chatbot!</a>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Sobre;