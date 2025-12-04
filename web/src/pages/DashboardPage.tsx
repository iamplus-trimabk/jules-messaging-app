import { useAuth } from '@simflo/common';
import { Button } from '@/components/ui/button';
import { ConversationList } from '@/components/ConversationList';
import { MessageView } from '@/components/MessageView';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-bold">Conversations</h1>
          <Button onClick={logout} size="sm">Logout</Button>
        </div>
        <ConversationList />
      </div>
      <div className="w-3/4 flex flex-col">
        <MessageView />
      </div>
    </div>
  );
}
