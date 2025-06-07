const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const requestPasswordReset = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Falha ao solicitar a redefinição de senha.');
  }

  return data;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/reset-password/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Falha ao redefinir a senha.');
  }

  return data;
};
