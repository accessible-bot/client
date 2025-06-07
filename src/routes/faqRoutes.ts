import { Router } from 'express';
import { getFrequentQuestions } from '../controllers/faqController';

const faqRoutes = Router();

faqRoutes.get('/faq', getFrequentQuestions);

export default faqRoutes;
