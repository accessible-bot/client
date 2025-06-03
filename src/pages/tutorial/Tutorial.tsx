import { useState } from "react";
import "./Tutorial.css";
import tutorial1 from "../../assets/tutorial1.png";
import tutorial2 from "../../assets/tutorial2.png";
import tutorial3 from "../../assets/tutorial3.png";
import tutorial4 from "../../assets/tutorial4.png";

interface Slide {
    imgSrc: string;
    text: string;
}

const slides: Slide[] = [
    {
        imgSrc: tutorial1,
        text: "Digite sua dúvida ou tema sobre o Transtorno do Espectro Autista (TEA). Ex.: Como ajudar meu filho na escola? Quais são os direitos legais das pessoas com TEA?.",
    },
    {
        imgSrc: tutorial2,
        text: "Clique no ícone de enviar para que o AutBot possa responder à sua pergunta! Pronto! É só aguardar a resposta com informações.",
    },
    {
        imgSrc: tutorial3,
        text: "Após a resposta do AutBot, você pode copiá-la, avaliá-la como útil ou não e seguir perguntando sobre seus direitos ou outros temas relacionados ao TEA.",
    },
    {
        imgSrc: tutorial4,
        text: "Você pode clicar no ícone de lupa, localizado acima, para pesquisar seus chats anteriores de forma rápida e prática. Também é possível iniciar um novo chat clicando na opção “Novo chat” ou selecionar uma das conversas recentes exibidas na lista.",
    },
];

const Tutorial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        if (currentIndex < slides.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const prevSlide = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    return (
        <div className="chat-container">
            <div className="top-bar">
  <div className="logo-title-container">
    <div className="top-bar-logo"> 
      <img src="/AutBot_Logo.png" alt="Logo" />
    </div>
    <button className="botao-inicio">AutBot</button>
  </div>
  <div className="top-bar-links"> 
    <button className="botao-perfil">Login</button>
  </div>
</div>
            <div className="manual-carousel">
                <h2>Como usar o AutBot?</h2>
                <div className="slide">
                    <img src={slides[currentIndex].imgSrc} alt={"autobotImgTutorial"} />
                    <p>{slides[currentIndex].text}</p>
                </div>
                <div className="controls">
                    <button onClick={prevSlide} disabled={currentIndex === 0}>
                        ◀
                    </button>
                    <button onClick={nextSlide} disabled={currentIndex === slides.length - 1}>
                        ▶
                    </button>
                </div>
                <div className="dots">
                    {slides.map((_, i) => (
                        <span key={i} className={i === currentIndex ? "active" : ""}>●</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tutorial;