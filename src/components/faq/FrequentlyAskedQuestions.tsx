
interface FaqItem {
  id: string;
  question: string;
}

const mockFaqs: FaqItem[] = [
  { id: 'faq1', question: "Tenho direito a acompanhante gratuito no cinema?" },
  { id: 'faq2', question: "Como faço a carteirinha municipal para TEA?" },
  { id: 'faq3', question: "Meu filho pode estudar em escola regular?" },
  { id: 'faq4', question: "Tenho direito ao BPC (Benefício de Prestação Continuada)?" },
  { id: 'faq5', question: "O que é a Lei 12.764/2012?" },
];

interface FrequentlyAskedQuestionsProps {
  onQuestionClick: (questionText: string) => void;
}

const FrequentlyAskedQuestions: React.FC<FrequentlyAskedQuestionsProps> = ({ onQuestionClick }) => {
  return (
    <div className="faq-container">
      <h3 className="faq-title">Perguntas Frequentes</h3>
      <div className="faq-list">
        {mockFaqs.map((faq) => (
          <button
            key={faq.id}
            className="faq-button"
            onClick={() => onQuestionClick(faq.question)}
          >
            {faq.question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;