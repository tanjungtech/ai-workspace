import { useEffect, useState } from "react";

import {
  createConversation,
  deleteConversation,
  getConversations,
  renameConversation,
} from "../api/conversation.api";

import type { Conversation } from "../types/conversation";

export function useConversation() {
  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  async function load() {
    const data = await getConversations();

    setConversations(data);
  }

  async function create() {
    await createConversation();
    await load();
  }

  async function rename(
    id: string,
    title: string
  ) {
    await renameConversation(id, title);

    await load();
  }

  async function remove(
    id: string
  ) {
    await deleteConversation(id);

    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return {
    conversations,
    create,
    rename,
    remove,
    reload: load,
  }
}
