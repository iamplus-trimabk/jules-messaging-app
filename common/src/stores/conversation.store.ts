import { create } from 'zustand';
import {
  ConversationsService,
  MessagesService,
  ConversationDto,
  MessageDto,
} from '@simflo/sdk';
import { socketService } from '../socket.service';

interface ConversationState {
  conversations: ConversationDto[];
  selectedConversation: ConversationDto | null;
  messages: MessageDto[];
  fetchConversations: () => Promise<void>;
  selectConversation: (conversationId: string) => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: { text: string }) => void;
  addMessage: (message: MessageDto) => void;
  createConversation: (title: string, participants: { userId: string, role: 'ADMIN' | 'MEMBER' }[]) => Promise<void>;
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  conversations: [],
  selectedConversation: null,
  messages: [],

  fetchConversations: async () => {
    const conversations = await ConversationsService.findAll();
    set({ conversations });
  },

  selectConversation: async (conversationId: string) => {
    const conversation = get().conversations.find(c => c.id === conversationId);
    if (conversation) {
      set({ selectedConversation: conversation });
      await get().fetchMessages(conversationId);
    }
  },

  fetchMessages: async (conversationId: string) => {
    const messages = await MessagesService.findAll(conversationId);
    set({ messages });
  },

  sendMessage: (conversationId: string, content: { text: string }) => {
    socketService.sendMessage({ conversationId, content });
  },

  addMessage: (message: MessageDto) => {
    if (get().selectedConversation?.id === message.conversationId) {
      set(state => ({ messages: [...state.messages, message] }));
    }
  },

  createConversation: async (title: string, participants: { userId: string, role: 'ADMIN' | 'MEMBER' }[]) => {
    await ConversationsService.create({ title, type: 'GROUP_CHAT', participants });
    await get().fetchConversations();
  },
}));
