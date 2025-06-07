import axios from 'axios';

const hfToken = process.env.HUGGINGFACE_API_TOKEN;

function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\n\r\t]/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function getSimilarityScores(sourceSentence: string, sentences: string[]): Promise<number[]> {
  const cleanSource = cleanText(sourceSentence);
  const cleanSentences = sentences.map(cleanText);

  const response = await axios.post(
    'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2',
    {
      inputs: {
        source_sentence: cleanSource,
        sentences: cleanSentences,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${hfToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log('Resposta da API Hugging Face:', response.data);

  if (!Array.isArray(response.data)) {
    throw new Error('Resposta inválida da API Hugging Face para similaridade');
  }

  return response.data; 
}
