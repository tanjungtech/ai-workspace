import * as conversationRepository from "../repositories/conversation.repository.js";
import * as messageRepository from "../repositories/message.repository.js";
import * as retrieverService from "./retriever.service.js";

import type { LLMMessage } from "../llm/types.js";

export async function prepareChatContext(
  conversationId: string | undefined,
  prompt: string
) {
  let conversation = conversationId
    ? await conversationRepository.findById(conversationId)
    : null;

  if (!conversation) {
    conversation =
      await conversationRepository.create(
        prompt.substring(0,40)
      );
  }

  await messageRepository.create({
    conversationId: conversation.id,
    role: "user",
    content: prompt,
  });

  const messages =
    await messageRepository.findByConversationId(conversation.id);

  const history: LLMMessage[] =
    messages.map(message => ({
      role: message.role,
      content: message.content,
    }));

  const retrieved = await retrieverService.retrieve(prompt);

  const context =
    retrieved.map(chunk => chunk.content)
      .join("\n\n");

  return {
    conversation,
    history,
    retrieved,
    context
  };
}
