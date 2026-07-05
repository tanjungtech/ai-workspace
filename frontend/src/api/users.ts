import { api } from "./client";

export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}