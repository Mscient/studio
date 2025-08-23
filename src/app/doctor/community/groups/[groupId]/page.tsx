
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArrowLeft, Paperclip, Phone, Send, Video, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Group {
  name: string;
  members: number;
  description: string;
  avatarHint: string;
}

interface Message {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  timestamp: Date;
  avatarHint: string;
}

const sampleGroup: Group = {
    name: 'Cardiology Experts',
    members: 128,
    description: 'Discussion group for cardiologists.',
    avatarHint: 'heartbeat cardiogram',
};

const sampleMessages: Message[] = [
    { id: '1', sender: 'Dr. Emily Carter', senderId: 'doc1', content: 'Has anyone seen the latest study on statin alternatives?', timestamp: new Date(Date.now() - 1000 * 60 * 25), avatarHint: 'doctor professional woman' },
    { id: '2', sender: 'Dr. Ben Hanson', senderId: 'doc2', content: 'Yes, I was just reading it. The results for bempedoic acid are quite promising, especially for statin-intolerant patients.', timestamp: new Date(Date.now() - 1000 * 60 * 20), avatarHint: 'doctor professional man' },
    { id: '3', sender: 'You', senderId: 'currentUser', content: 'I agree. I have a patient who might be a good candidate. I\'ll forward the study to them.', timestamp: new Date(Date.now() - 1000 * 60 * 10), avatarHint: 'doctor professional' },
];


export default function GroupChatPage() {
  const params = useParams();
  const groupId = typeof params.groupId === 'string' ? params.groupId : '';
  const [group, setGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  useEffect(() => {
    if (!groupId) return;
    setLoading(true);
    setTimeout(() => {
        setGroup(sampleGroup);
        setMessages(sampleMessages);
        setLoading(false);
    }, 500);
  }, [groupId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
        id: (messages.length + 1).toString(),
        sender: "You",
        senderId: "currentUser",
        content: newMessage,
        timestamp: new Date(),
        avatarHint: 'doctor professional',
    };
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
  };

  if (loading || !group) {
    return (
      <AppLayout userType="doctor">
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout userType="doctor">
      <div className="flex flex-col h-[calc(100vh-6rem)]">
        <Card className="flex-shrink-0 rounded-b-none">
          <CardHeader className="flex flex-row items-center justify-between p-3 border-b">
             <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/doctor/community">
                        <ArrowLeft />
                    </Link>
                </Button>
                <Avatar>
                    <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint={group.avatarHint}/>
                    <AvatarFallback>{group.name.split(" ").map((n:string)=>n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="!text-lg">{group.name}</CardTitle>
                    <CardDescription>{group.members} members</CardDescription>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon"><Video /></Button>
                <Button variant="ghost" size="icon"><Phone /></Button>
            </div>
          </CardHeader>
        </Card>
        
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 bg-muted/20">
          {messages.map(message => (
            <div key={message.id} className={cn("flex items-end gap-2", message.senderId === 'currentUser' ? "justify-end" : "justify-start")}>
                {message.senderId !== 'currentUser' && (
                     <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://placehold.co/32x32.png`} data-ai-hint={message.avatarHint}/>
                        <AvatarFallback>{message.sender.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                    </Avatar>
                )}
              <div className={cn("max-w-xs md:max-w-md rounded-lg px-3 py-2", message.senderId === 'currentUser' ? "bg-primary text-primary-foreground rounded-br-none" : "bg-background rounded-bl-none shadow-sm")}>
                {message.senderId !== 'currentUser' && <p className="text-xs font-semibold pb-1">{message.sender}</p>}
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-right mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
           <div ref={messagesEndRef} />
        </CardContent>

        <form onSubmit={handleSendMessage}>
            <CardFooter className="p-2 border-t bg-background rounded-t-none">
                <div className="flex items-center w-full gap-2">
                    <Button variant="ghost" size="icon" type="button"><Paperclip /></Button>
                    <Input 
                      placeholder="Type a message..." 
                      value={newMessage} 
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button size="icon" type="submit"><Send/></Button>
                </div>
            </CardFooter>
        </form>
      </div>
    </AppLayout>
  );
}
