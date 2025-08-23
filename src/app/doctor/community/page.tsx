
'use client';

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, MessageSquare, ThumbsUp, BrainCircuit, Share2, Plus, Calendar, CheckCircle, FlaskConical, Users, Vote, PlusCircle, TrendingUp, Rss } from 'lucide-react';
import { getMedicalResearchUpdates, getDailyHealthTrends } from '@/lib/actions';
import type { MedicalResearchUpdate } from '@/ai/flows/medical-research-updates';
import type { DailyHealthTrend } from '@/ai/flows/daily-trends';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const myGroups = [
  { id: 1, name: "Cardiology Case Studies", members: 45, description: "Discussing complex cardiology cases." },
  { id: 2, name: "AI in Medicine Innovators", members: 120, description: "Exploring the frontier of AI in healthcare." },
  { id: 3, name: "Pediatric Peer Support", members: 78, description: "A group for pediatric specialists." },
];

export default function CommunityPage() {
  const [updates, setUpdates] = useState<MedicalResearchUpdate[]>([]);
  const [trends, setTrends] = useState<DailyHealthTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTrends, setLoadingTrends] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoadingTrends(true);
      
      const researchPromise = getMedicalResearchUpdates();
      const trendsPromise = getDailyHealthTrends();

      const [researchResult, trendsResult] = await Promise.all([researchPromise, trendsPromise]);

      if (researchResult.success && researchResult.data) {
        setUpdates(researchResult.data);
      }
      setLoading(false);

      if (trendsResult.success && trendsResult.data) {
        setTrends(trendsResult.data);
      }
      setLoadingTrends(false);
    };
    fetchData();
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
              Connect with peers, discuss cases, and stay updated on the latest medical research and trends.
            </CardDescription>
             <div className='pt-2'>
                <Button><Plus className='mr-2'/> Create Post</Button>
            </div>
          </CardHeader>
        </Card>
        
        <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2"><Rss/> Latest Research & News</h2>
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    updates.map((post) => (
                        <Card key={post.title} className="overflow-hidden">
                            <CardHeader>
                                <div className="flex items-start gap-3">
                                    <Avatar>
                                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="research institute logo"/>
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                    <div className="w-full">
                                        <CardTitle className="!text-xl">{post.title}</CardTitle>
                                        <div className="flex justify-between w-full text-sm text-muted-foreground mt-1">
                                            <span>From: <strong>{post.source}</strong></span>
                                            <span className='flex items-center gap-1'><Calendar className='w-4 h-4'/> {post.publicationDate}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-muted-foreground">{post.summary}</p>
                                
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2 mb-2"><FlaskConical className='w-5 h-5 text-primary'/> Key Findings</h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                        {post.keyFindings.map((finding, index) => (
                                            <li key={index}>{finding}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold flex items-center gap-2 mb-2"><CheckCircle className='w-5 h-5 text-primary'/> Clinical Implications</h4>
                                    <p className="text-sm text-muted-foreground">{post.implications}</p>
                                </div>

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
                        <CardTitle className='flex items-center gap-2'><TrendingUp/> Daily Health Trends</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                       {loadingTrends ? (
                         <div className="flex justify-center items-center h-24">
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                       ) : (
                         trends.map(trend => (
                            <div key={trend.title} className="p-2 rounded-md hover:bg-accent/50">
                                <p className="font-semibold">{trend.title}</p>
                                <p className="text-xs text-muted-foreground">{trend.summary}</p>
                            </div>
                         ))
                       )}
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center justify-between'>
                            <span>My Groups</span>
                            <Button variant="ghost" size="icon"><PlusCircle className='w-5 h-5 text-muted-foreground'/></Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-1'>
                        {myGroups.map(group => (
                             <Link key={group.id} href={`/doctor/community/groups/${group.id}`} className="block">
                                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/50">
                                    <div className='p-2 bg-secondary rounded-md'>
                                        <Users className='w-5 h-5 text-secondary-foreground'/>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{group.name}</p>
                                        <p className="text-xs text-muted-foreground">{group.members} members</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'><Vote/> Create a Poll</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor="poll-question">Poll Question</Label>
                            <Input id="poll-question" placeholder="e.g., What's the best approach for...?"/>
                        </div>
                         <div className='space-y-2'>
                            <Label htmlFor="poll-option1">Option 1</Label>
                            <Input id="poll-option1" placeholder="Enter option 1"/>
                        </div>
                          <div className='space-y-2'>
                            <Label htmlFor="poll-option2">Option 2</Label>
                            <Input id="poll-option2" placeholder="Enter option 2"/>
                        </div>
                        <Button variant="outline" size="sm" className='w-full'><Plus className='mr-2'/> Add Option</Button>
                        <Button className='w-full'>Post Poll</Button>
                    </CardContent>
                </Card>
            </div>
        </div>

      </div>
    </AppLayout>
  );
}
