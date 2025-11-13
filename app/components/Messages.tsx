"use client"
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { SendIcon } from 'lucide-react';
import { useMarketplaceStore } from '../stores/useMarketplaceStore';

export function Messages() {
  const { threads, messages, selectedThread, setSelectedThread, addMessage } =
    useMarketplaceStore();
  const [messageInput, setMessageInput] = useState('');

  const currentMessages = selectedThread ? messages[selectedThread] || [] : [];

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedThread) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'You',
      content: messageInput,
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    addMessage(selectedThread, newMessage);
    setMessageInput('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with your customers in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        <Card className="lg:col-span-1 p-4 bg-card text-card-foreground border-border">
          <h2 className="font-bold text-foreground mb-4">Conversations</h2>
          <ScrollArea className="h-[calc(600px-80px)]">
            <div className="space-y-2">
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ease-in-out cursor-pointer ${
                    selectedThread === thread.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold">{thread.participant}</p>
                    {thread.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-tertiary text-tertiary-foreground text-xs flex items-center justify-center font-normal">
                        {thread.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm opacity-80 line-clamp-1">
                    {thread.lastMessage}
                  </p>
                  <p className="text-xs opacity-60 mt-1">
                    {new Date(thread.timestamp).toLocaleTimeString()}
                  </p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="lg:col-span-2 p-6 bg-card text-card-foreground border-border flex flex-col">
          {selectedThread ? (
            <>
              <div className="border-b border-border pb-4 mb-4">
                <h2 className="font-bold text-foreground">
                  {threads.find((t) => t.id === selectedThread)?.participant}
                </h2>
              </div>

              <ScrollArea className="flex-1 pr-4 mb-4">
                <div className="space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'You' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-4 rounded-lg ${
                          message.sender === 'You'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-60 mt-2">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-background text-foreground border-border"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <SendIcon className="w-5 h-5" strokeWidth={2} />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                Select a conversation to start messaging
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
