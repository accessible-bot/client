export interface UserData {
  id: string;
  name: string;
  userType: string;
}

export async function fetchUserData(userId: string): Promise<UserData | null> {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    console.error("Token de autenticação não encontrado no localStorage.");
    return null;
  }

  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    console.error("Variável de ambiente VITE_API_URL não configurada.");
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      console.error(`Erro ao buscar dados do usuário: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data as UserData;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return null;
  }
}
