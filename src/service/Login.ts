import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export async function loginUser(data: LoginData): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(`${apiUrl}/login`, data);
  return response.data;
}
