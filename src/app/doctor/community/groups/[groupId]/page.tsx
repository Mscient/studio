
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArrowLeft, Paperclip, Phone, Send, Video } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';


// Mock data, in a real app this would come from an API
const getGroupDetails = (groupId: string) => {
    const groups: {[key: string]: any} = {
        '1': { name: "Cardiology Case Studies", members: 45, description: "Discussing complex cardiology cases.", avatarHint: "heartbeat logo" },
        '2': { name: "AI in Medicine Innovators", members: 120, description: "Exploring the frontier of AI in healthcare.", avatarHint: "brain circuit" },
        '3': { name: "Pediatric Peer Support", members: 78, description: "A group for pediatric specialists.", avatarHint: "teddy bear" },
    }
    return groups[groupId] || { name: "Unknown Group", members: 0, description: "" };
};

const messages = [
    { id: 1, sender: "Dr. Anya Sharma", content: "Has anyone seen the latest trial data on the new SGLT2 inhibitor for heart failure? The results look promising.", timestamp: "10:30 AM", isMe: false, avatarHint: "woman doctor" },
    { id: 2, sender: "You", content: "I read the abstract. It seems particularly effective for patients with preserved ejection fraction. I've attached the full paper.", timestamp: "10:32 AM", isMe: true, avatarHint: "man doctor" },
    { id: 3, sender: "Dr. Ben Carter", content: "Thanks for sharing! This could be a game-changer. I have a patient who might be a good candidate. I'm concerned about the risk of euglycemic DKA though.", timestamp: "10:35 AM", isMe: false, avatarHint: "man doctor" },
    { id: 4, sender: "Dr. Anya Sharma", content: "Good point, Ben. The risk is low but non-trivial. We need to be vigilant about patient education on this.", timestamp: "10:36 AM", isMe: false, avatarHint: "woman doctor" },
];


export default function GroupChatPage() {
  const params = useParams();
  const groupId = typeof params.groupId === 'string' ? params.groupId : '';
  const group = getGroupDetails(groupId);

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
            <div key={message.id} className={cn("flex items-end gap-2", message.isMe ? "justify-end" : "justify-start")}>
                {!message.isMe && (
                     <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://placehold.co/32x32.png`} data-ai-hint={message.avatarHint}/>
                        <AvatarFallback>{message.sender.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                    </Avatar>
                )}
              <div className={cn("max-w-xs md:max-w-md rounded-lg px-3 py-2", message.isMe ? "bg-primary text-primary-foreground rounded-br-none" : "bg-background rounded-bl-none shadow-sm")}>
                {!message.isMe && <p className="text-xs font-semibold pb-1">{message.sender}</p>}
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-right mt-1 opacity-70">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </CardContent>

        <CardFooter className="p-2 border-t bg-background rounded-t-none">
            <div className="flex items-center w-full gap-2">
                <Button variant="ghost" size="icon"><Paperclip /></Button>
                <Input placeholder="Type a message..."/>
                <Button size="icon"><Send/></Button>
            </div>
        </CardFooter>
      </div>
    </AppLayout>
  );
}
