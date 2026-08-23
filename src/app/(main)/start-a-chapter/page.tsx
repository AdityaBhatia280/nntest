'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  Rocket, 
  Users, 
  Target, 
  Award, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { FAQS, CHAPTER_APPLICATION_URL } from '@/lib/constants';
import { AnimateOnScroll } from '@/components/animate-on-scroll';

export default function StartChapterPage() {
  const applicationFormUrl = CHAPTER_APPLICATION_URL;

  const benefits = [
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Leadership Experience",
      description: "Gain hands-on experience in community organizing, project management, and public speaking."
    },
    {
      icon: <Rocket className="h-6 w-6 text-primary" />,
      title: "Resource Kits",
      description: "Access our branding kits, project guides, and administrative tools to run your chapter smoothly."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Global Network",
      description: "Connect with thousands of student leaders worldwide and collaborate on international initiatives."
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-secondary pt-28 pb-20 md:pt-36 md:pb-32">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <AnimateOnScroll>
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6">Start Your Own Chapter</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Empower your school or community to explore neuroscience education, research fellowships, and student leadership. Launch your own localized Neuro Nation Chapter today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="rounded-full"
              >
                <a href={applicationFormUrl} target="_blank" rel="noopener noreferrer">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Why Start Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-headline">Why Lead a Chapter?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <AnimateOnScroll key={index} delay={`${index * 100}ms`}>
                <Card className="h-full border-none bg-secondary shadow-none hover:shadow-soft transition-all">
                  <CardHeader>
                    <div className="bg-background w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      {benefit.icon}
                    </div>
                    <CardTitle className="font-headline text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold font-headline text-center mb-16">How to Get Started</h2>
          <div className="space-y-12">
            {[
              { step: "01", title: "Form Your Team", desc: "Gather a group of at least 3-5 dedicated students to be your founding officers." },
              { step: "02", title: "Find an Advisor", desc: "Connect with a teacher or community leader who can support your chapter's activities." },
              { step: "03", title: "Apply Online", desc: "Fill out the application form with your team details and initial project ideas." },
              { step: "04", title: "Launch & Lead", desc: "Once approved, receive your onboarding kit and start making an impact!" }
            ].map((item, index) => (
              <AnimateOnScroll key={index} className="flex gap-6 items-start">
                <div className="text-4xl font-bold text-primary/20 font-headline pt-1">{item.step}</div>
                <div>
                  <h3 className="text-2xl font-bold font-headline mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold font-headline text-center mb-16">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-headline text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-6">Ready to lead?</h2>
          <p className="text-lg mb-10 opacity-90">
            Submit your application today and our regional leads will get in touch to help you launch your chapter.
          </p>
          <Button 
            asChild
            size="lg" 
            variant="secondary" 
            className="rounded-full"
          >
            <a href={applicationFormUrl} target="_blank" rel="noopener noreferrer">
              Submit Application
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
