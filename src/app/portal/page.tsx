'use client';

import React from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, ArrowRight, CheckCircle2, Lock, FileText, Download, Users, Camera, MessageSquare, Briefcase, FileSearch, Search, Image as ImageIcon, Send, Clock, BookOpen, AlertCircle, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GlobeViz from '@/components/GlobeViz';
import { OnboardingChecklist } from '@/components/OnboardingChecklist';
import { TEAM_DATA } from '@/lib/team-data';

export default function PortalPage() {
  const { user, userStatus, loading, signInWithGoogle, logout, updateUserStatus, isAdmin } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-[80vh] items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-soft">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Chapter Login</CardTitle>
            <CardDescription>Sign in with your chapter email to access the portal.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pt-4 pb-8">
            <Button size="lg" onClick={signInWithGoogle} className="w-full rounded-full">
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (userStatus === 'pending_step_1') {
    return (
      <div className="flex h-[80vh] items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-soft text-center">
          <CardHeader>
            <div className="mx-auto bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="font-headline text-2xl">Awaiting Approval</CardTitle>
            <CardDescription className="pt-2 text-base">
              Account created. Waiting for Head Admin approval to proceed.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button variant="ghost" onClick={logout}>Sign Out</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (userStatus === 'approved_step_1') {
    return (
      <div className="flex h-[80vh] items-center justify-center px-4">
        <Card className="w-full max-w-lg shadow-soft">
          <CardHeader>
             <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">IP Agreement Stage</CardTitle>
            <CardDescription className="pt-2">
              Please complete the Intellectual Property Agreement to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 text-sm text-muted-foreground">
              <p><strong>Instructions:</strong> Download and sign the IP agreement here:</p>
              <Button asChild variant="outline" className="w-full justify-between group">
                <a href="https://drive.google.com/file/d/1Waw0aD0X0b4s9vmHBwt0LU880SwHAzSt/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center"><Download className="mr-2 h-4 w-4" /> Download Agreement</span>
                  <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <p className="pt-2"><strong>Instructions:</strong> Email the signed copy to <span className="text-primary font-medium">xyz</span>.</p>
            </div>
            
            <Button onClick={() => updateUserStatus('ip_submitted')} className="w-full" size="lg">
              I have emailed the signed agreement
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="ghost" onClick={logout}>Sign Out</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (userStatus === 'ip_submitted') {
    return (
      <div className="flex h-[80vh] items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-soft text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Pending Final Approval</CardTitle>
            <CardDescription className="pt-2 text-base">
              IP Agreement received. Waiting for final Head Admin verification.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button variant="ghost" onClick={logout}>Sign Out</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (userStatus === 'fully_approved') {
    return (
      <div className="min-h-screen bg-transparent relative">
        <GlobeViz />
        {/* Portal Hero Section */}
        <div className="w-full pt-12 pb-8 bg-card/60 backdrop-blur-md border-b">
          <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              {/* Chapter Image Placeholder */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-muted border-4 border-background shadow-lg relative flex-shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Frisco High School Chapter"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold font-headline text-foreground">Frisco High School Chapter</h1>
                <p className="text-muted-foreground mt-2 text-lg">Welcome back, {user.displayName || 'President'}.</p>
              </div>
            </div>
            <div className="flex gap-2">
               {isAdmin && (
                 <Button onClick={() => router.push('/portal/admin')} variant="secondary">
                   Admin Dashboard
                 </Button>
               )}
               <Button variant="outline" onClick={logout}>Sign Out</Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
          
          <div className="space-y-12">
             {/* A. Onboarding Plan */}
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4 flex items-center"><CheckCircle2 className="mr-2 h-6 w-6 text-primary" /> Onboarding Plan</h2>
              <OnboardingChecklist />
            </section>

             {/* B. Impact Dashboard & Volunteer Tracking */}
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4 flex items-center"><Users className="mr-2 h-6 w-6 text-primary" /> Impact & Tracking</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                 <Card className="bg-secondary border-none">
                    <CardHeader className="p-4 pb-2">
                      <CardDescription>Global Chapters</CardDescription>
                      <CardTitle className="text-3xl font-headline">
                        {TEAM_DATA["2026-2027"]?.chapters?.length || 19}
                      </CardTitle>
                    </CardHeader>
                 </Card>
                 <Card className="bg-secondary border-none">
                    <CardHeader className="p-4 pb-2">
                      <CardDescription>Countries Reached</CardDescription>
                      <CardTitle className="text-3xl font-headline">5</CardTitle>
                    </CardHeader>
                 </Card>
              </div>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground p-3 bg-secondary/50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p>All volunteer hour tracking happens strictly through InnerView.</p>
                  </div>
                  <Button variant="outline" className="w-full justify-between group">
                     <span className="flex items-center"><BookOpen className="mr-2 h-4 w-4" /> Go to InnerView</span>
                     <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </section>

             {/* C. Branding & Marketing */}
             <section>
              <h2 className="text-2xl font-bold font-headline mb-4 flex items-center"><Camera className="mr-2 h-6 w-6 text-primary" /> Branding & Marketing</h2>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-between group h-auto py-3">
                  <a href="https://drive.google.com/drive/folders/1e7k-AWgNrO4XhFhxbGTJWzn12aoJJR4i" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center"><ImageIcon className="mr-2 h-4 w-4" /> Official Logos (Google Drive)</span>
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between group h-auto py-3">
                  <a href="https://docs.google.com/document/d/1q1p9Yuv2SaSS-dMbfDX5jXMAI5k4PwWzaGgJT_GFYuI/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center"><FileText className="mr-2 h-4 w-4" /> Branding Kit (Google Doc)</span>
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                 <Button asChild variant="outline" className="w-full justify-between group h-auto py-3">
                  <a href="https://sdgchamps.org" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center"><Search className="mr-2 h-4 w-4" /> Official Website</span>
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                
                <Accordion type="single" collapsible className="w-full mt-4">
                  <AccordionItem value="instagram">
                    <AccordionTrigger className="font-medium bg-secondary px-4 rounded-lg">Instagram Setup Guide</AccordionTrigger>
                    <AccordionContent className="pt-4 px-2 space-y-2 text-muted-foreground">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Name must include &quot;sdgchamps&quot; or &quot;sdgchampions&quot;.</li>
                        <li>Must follow official @sdgchamps.</li>
                        <li>Must link the official website in bio.</li>
                      </ul>
                      <div className="mt-4 p-3 bg-primary/10 text-primary-foreground text-sm rounded-md border border-primary/20">
                        <strong className="text-primary">Pro Tip:</strong> <span className="text-foreground">Mass follow people from your school.</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>
          </div>

          <div className="space-y-12">
            
             {/* D. Documents, Forms & Action Plans */}
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4 flex items-center"><Briefcase className="mr-2 h-6 w-6 text-primary" /> Action Plans & Forms</h2>
              <div className="space-y-3">
                <div className="p-4 bg-secondary rounded-lg mb-4">
                  <h3 className="font-semibold mb-3">Monthly Action Plans</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-between group" disabled>
                      <span className="flex items-center"><Download className="mr-2 h-4 w-4" /> August Plan (Coming Soon)</span>
                      <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between group" disabled>
                      <span className="flex items-center"><Download className="mr-2 h-4 w-4" /> September Plan (Coming Soon)</span>
                      <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-between group h-auto py-3">
                      <span className="flex items-center"><Users className="mr-2 h-4 w-4" /> Leadership Structure</span>
                      <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="font-headline text-2xl">Campus Chapters: Leadership Positions</DialogTitle>
                      <DialogDescription>
                        Optional structure you can follow. You don&apos;t need all the officers, you can remove or add if needed for flexibility.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto pr-4 mt-4 max-h-[60vh]">
                      <div className="space-y-6 text-sm text-foreground pb-4">
                        <div className="p-4 bg-primary/10 text-primary rounded-lg">
                          <p className="font-medium mb-2">Wondering how to recruit new chapter leaders?</p>
                          <p>A great way to sort through leadership applications is to create a google form that you send out to your entire chapter. The google form can have some basic questions regarding a member&apos;s interest in the positions and their qualifications.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-bold text-lg border-b pb-2">Position Descriptions</h3>
                          
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="president">
                              <AccordionTrigger className="text-left font-bold text-base hover:no-underline">Chapter President</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                  <li>Preside over all chapter meetings and official events.</li>
                                  <li>Primary spokesperson of chapter; representing the chapter on campus, in the local community, and within the national network.</li>
                                  <li>Ensure completion of all required reporting.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="vp-internal">
                              <AccordionTrigger className="text-left font-bold text-base hover:no-underline">Vice President of Internal Affairs</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                  <li>Oversee the Executive Board and its meetings.</li>
                                  <li>Schedule regular Executive Board and General Body meetings.</li>
                                  <li>Work with President and Director of Finance to create tentative annual calendar.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="vp-external">
                              <AccordionTrigger className="text-left font-bold text-base hover:no-underline">Vice President of External Affairs</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                  <li>Ensure a positive relationship with other organizations on campus, particularly those involved in nonprofit and community work.</li>
                                  <li>Establish and maintain communication with the national chapter and local community chapters.</li>
                                  <li>Ensure board members and committee members are actively involved in chapter/ event promotion.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="vp-ops">
                              <AccordionTrigger className="text-left font-bold text-base hover:no-underline">Vice President of Operations</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                  <li>Manage the day to day operations of the organization.</li>
                                  <li>Help manage the logistics and ensure smooth running of all events.</li>
                                  <li>Act as the secondary line of communication should the primary (president) be pre-occupied.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="dir-membership">
                              <AccordionTrigger className="text-left font-bold text-base hover:no-underline">Director of Membership</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                  <li>Responsible for recruiting new members into campus chapter.</li>
                                  <li>Provide membership information at ALL chapter events. Have a sign-in sheet so you can follow up with a membership ask.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="dir-alumni">
                              <AccordionTrigger className="text-left font-bold text-base hover:no-underline">Director of Alumni Relations</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                  <li>Maintain a relationship with campus chapter alumnae, updating them on chapter developments.</li>
                                  <li>Work with the Director of Advocacy to create a database of all fellowships and internships offered and assist members interested in these programs.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="dir-social">
                              <AccordionTrigger className="text-left font-bold text-base hover:no-underline">Director of Social Events</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                  <li>Organize and oversee chapter events, such as member socials, volunteer events, and UN Celebration Days.</li>
                                  <li>Set up a tentative event calendar under the guidance of the President and the Internal Vice President.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="dir-advocacy">
                              <AccordionTrigger className="text-left font-bold text-base hover:no-underline">Director of Advocacy</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                  <li>Lead the advocacy efforts of the organization both at campus and in the outlying community.</li>
                                  <li>Raise awareness of the Sustainable Development Goals.</li>
                                  <li>Work with other campus groups to advocate for a better relationship between the community and the organization.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="dir-service">
                              <AccordionTrigger className="text-left font-bold text-base hover:no-underline">Director of Service</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                  <li>Responsible for making chapter members aware of outside service projects and encouraging broader community engagement.</li>
                                  <li>Oversee the planning of at least one service event per semester.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="dir-comms">
                              <AccordionTrigger className="text-left font-bold text-base hover:no-underline">Director of Communications</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                  <li>Be responsible for maintaining the organization’s social media presence and website.</li>
                                  <li>Design marketing material for the organization’s events, including flyers and social media posts.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="secretary">
                              <AccordionTrigger className="text-left font-bold text-base hover:no-underline">Chapter Secretary</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                  <li>Record notes and attendance from each chapter meeting.</li>
                                  <li>Email meeting notes to chapter members.</li>
                                  <li>Assists with confirming room reservations for meetings and events.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="finance">
                              <AccordionTrigger className="text-left font-bold text-base hover:no-underline">Director of Finance</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                  <li>Handle all financial affairs and budgeting of the chapter.</li>
                                  <li>Create a database of all funding sources available through the University and be responsible for applying to appropriate sources.</li>
                                  <li>Be responsible for fundraising for the organization both on campus and off campus.</li>
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                 <Button asChild variant="outline" className="w-full justify-between group h-auto py-3">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLScxzOpojjjwvp4MwVyakbDlvvdQxGVm6LjUx8L0vLdnXTLrMg/viewform" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center"><FileSearch className="mr-2 h-4 w-4" /> SDG Champions Interest Form</span>
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </section>

             {/* E. Network & Communication */}
             <section>
              <h2 className="text-2xl font-bold font-headline mb-4 flex items-center"><MessageSquare className="mr-2 h-6 w-6 text-primary" /> Network</h2>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-between group h-auto py-3">
                  <a href="https://chat.whatsapp.com/FuPya5hGkC2GMZNrnz8NHB" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center"><MessageSquare className="mr-2 h-4 w-4 text-green-500" /> Presidents WhatsApp</span>
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                 <Button asChild variant="outline" className="w-full justify-between group h-auto py-3">
                  <a href="https://chat.whatsapp.com/EqOacSNdtPL1lz0lEEJdQw" target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center"><MessageSquare className="mr-2 h-4 w-4 text-green-500" /> Chapter Members WhatsApp</span>
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </section>

             {/* F. Support & Feedback */}
             <section>
              <h2 className="text-2xl font-bold font-headline mb-4 flex items-center"><Send className="mr-2 h-6 w-6 text-primary" /> Support & Feedback</h2>
               <Accordion type="single" collapsible className="w-full mb-6">
                  <AccordionItem value="faq">
                    <AccordionTrigger className="font-medium bg-secondary px-4 rounded-lg">FAQ</AccordionTrigger>
                    <AccordionContent className="pt-4 px-2 space-y-4 text-muted-foreground text-sm">
                      <div>
                        <strong>How do I register hours?</strong>
                        <p>All hours must be logged in InnerView.</p>
                      </div>
                      <div>
                        <strong>Can I create custom merch?</strong>
                        <p>Yes, as long as it adheres to the official branding guidelines.</p>
                      </div>
                      <div className="mt-4 p-3 bg-secondary rounded-md text-foreground">
                        <strong>Need more info? Ask in the Presidents WhatsApp group.</strong>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Feedback Box</CardTitle>
                    <CardDescription>Submit ideas for new resources or plans.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full justify-between group">
                       <a href="mailto:sdgchampionsinquiry@gmail.com?subject=Chapter%20Portal%20Feedback">
                         <span className="flex items-center"><Send className="mr-2 h-4 w-4" /> Submit Feedback</span>
                         <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                       </a>
                    </Button>
                  </CardContent>
                </Card>
            </section>
          </div>
        </div>
      </div>
      </div>
    );
  }

  return null;
}
