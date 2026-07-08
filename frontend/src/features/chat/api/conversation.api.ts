import axios from "axios";

import type { Conversation } from "../types/conversation";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function getConversations(
  page = 1,
  limit = 20,
) {
  const { data } =
    await api.get<Conversation[]> (
      "/conversations",
      {
        params: {
          page,
          limit,
        },
      }
    );
  
  return data;
}

export async function renameConversation(
  id: string,
  title: string
) {
  return api.patch(
    `/conversations/${id}`,
    {
      title,
    }
  );
}

export async function deleteConversation(
  id: string
) {
  return api.delete(`/conversations/${id}`);
}

export async function createConversation() {
  const { data } =
    await api.post<Conversation>(
      "/conversations"
    );
  
    return data;
}
