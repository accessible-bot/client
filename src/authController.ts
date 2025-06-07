import { Request, Response } from 'express';
import * as authService from './authService';

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'O campo e-mail é obrigatório.' });
        }
        
        await authService.requestPasswordReset(email);
        
        return res.status(200).json({ message: 'Se um usuário com este e-mail existir, um link para redefinição de senha foi enviado.' });

    } catch (error) {
        console.error('Erro ao solicitar redefinição de senha:', error);
        return res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: 'A nova senha é obrigatória.' });
        }

        await authService.resetPassword(token, password);
        return res.status(200).json({ message: 'Senha redefinida com sucesso!' });

    } catch (error: any) {
        console.error('Erro ao redefinir senha:', error);
        return res.status(400).json({ message: error.message });
    }
};
