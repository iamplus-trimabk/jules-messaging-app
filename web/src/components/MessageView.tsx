import { useState } from 'react';
import { useConversations } from '@simflo/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function MessageView() {
  const { selectedConversation, messages, sendMessage } = useConversations();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (selectedConversation) {
      sendMessage(selectedConversation.id, { text: newMessage });
      setNewMessage('');
    }
  };

  if (!selectedConversation) {
    return <div className="p-4">Select a conversation to start messaging</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        <ul>
          {messages.map(message => (
            <li key={message.id} className="mb-2">
              <strong>{message.sender.firstName || message.sender.mobileNumber}: </strong>
              {message.content.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
}
