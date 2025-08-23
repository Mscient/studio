
'use client';

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, MessageSquare, ThumbsUp, BrainCircuit, Share2, Plus } from 'lucide-react';
import { getMedicalResearchUpdates } from '@/lib/actions';
import type { MedicalResearchUpdate } from '@/ai/flows/medical-research-updates';

export default function CommunityPage() {
  const [updates, setUpdates] = useState<MedicalResearchUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);
      const result = await getMedicalResearchUpdates();
      if (result.success && result.data) {
        setUpdates(result.data);
      }
      setLoading(false);
    };
    fetchUpdates();
  }, []);

  return (
    <AppLayout userType="doctor">
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare />
              Medical Community Hub
            </CardTitle>
            <CardDescription>
              Connect with peers, discuss cases, and stay updated on the latest medical research.
            </CardDescription>
             <div className='pt-2'>
                <Button><Plus className='mr-2'/> Create Post</Button>
            </div>
          </CardHeader>
        </Card>
        
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold">Latest Research & News</h2>
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    updates.map((post) => (
                        <Card key={post.title} className="overflow-hidden">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="research institute logo"/>
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="!text-xl">{post.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            Posted by AI Research Bot
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{post.summary}</p>
                            </CardContent>
                            <CardFooter className="bg-muted/50 p-2 flex justify-around">
                                <Button variant="ghost" size="sm"><ThumbsUp className="mr-2"/> Like</Button>
                                <Button variant="ghost" size="sm"><BrainCircuit className="mr-2"/> Discuss</Button>
                                <Button variant="ghost" size="sm"><Share2 className="mr-2"/> Share</Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>My Groups</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">This feature is under construction.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Create a Poll</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">This feature is under construction.</p>
                    </CardContent>
                </Card>
            </div>
        </div>

      </div>
    </AppLayout>
  );
}
