import { io, Socket } from 'socket.io-client';
import { useAuthStore } from './stores/auth.store';
import { useConversationStore } from './stores/conversation.store';
import { MessageDto } from '@simflo/sdk';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    const token = useAuthStore.getState().token;
    if (token && !this.socket) {
      this.socket = io('http://localhost:3000', {
        auth: {
          token: `Bearer ${token}`,
        },
      });

      this.socket.on('connect', () => {
        console.log('Socket connected');
      });

      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      this.socket.on('newMessage', (message: MessageDto) => {
        useConversationStore.getState().addMessage(message);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  sendMessage(message: { conversationId: string; content: { text: string } }) {
    if (this.socket) {
      this.socket.emit('sendMessage', message);
    }
  }
}

export const socketService = new SocketService();
