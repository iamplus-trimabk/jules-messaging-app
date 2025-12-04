import { useEffect } from 'react';
import { useConversations } from '@simflo/common';
import { Button } from '@/components/ui/button';

export function ConversationList() {
  const { conversations, fetchConversations, selectConversation, createConversation } = useConversations();

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handleCreateConversation = () => {
    const title = prompt('Enter conversation title');
    if (title) {
      createConversation(title, []);
    }
  };

  return (
    <div className="p-4">
      <Button onClick={handleCreateConversation} className="mb-4">New Conversation</Button>
      <ul>
        {conversations.map(conversation => (
          <li
            key={conversation.id}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => selectConversation(conversation.id)}
          >
            {conversation.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
