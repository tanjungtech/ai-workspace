import axios from "axios";

import type {
  SendMessageRequest,
  SendMessageResponse,
} from "../types/chat";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function sendMessage(
  payload: SendMessageRequest
): Promise<SendMessageResponse> {
  const { data } = await api.post<SendMessageResponse>(
    "/chat",
    payload
  );

  return data;
}
