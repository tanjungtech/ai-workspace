import * as conversationRepository from "../repositories/conversation.repository.js";

export async function list(
  page: number,
  limit: number
) {
  return conversationRepository.findAll(page, limit);
}

export async function rename(
  id: string,
  title: string
) {
  return conversationRepository.rename(id, title);
}

export async function remove(
  id: string
) {
  return conversationRepository.remove(id);
}

export async function create() {
  return conversationRepository.create("New Conversation");
}
