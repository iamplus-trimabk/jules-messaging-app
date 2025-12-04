import { useConversationStore } from '../stores/conversation.store';

export const useConversations = () => {
  const {
    conversations,
    selectedConversation,
    messages,
    fetchConversations,
    selectConversation,
    sendMessage,
    createConversation,
  } = useConversationStore();

  return {
    conversations,
    selectedConversation,
    messages,
    fetchConversations,
    selectConversation,
    sendMessage,
    createConversation,
  };
};
