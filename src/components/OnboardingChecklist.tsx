'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { useAuth } from '@/contexts/auth-context';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const ONBOARDING_TASKS = [
  { id: 'whatsapp', label: 'Join the WhatsApp Groups.' },
  { id: 'instagram', label: 'Complete Instagram Setup.' },
  { id: 'first_meeting', label: 'Host your first introductory meeting.' },
];

export function OnboardingChecklist() {
  const { user } = useAuth();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().onboarding) {
          setCompletedTasks(docSnap.data().onboarding);
        }
      };
      fetchTasks();
    }
  }, [user]);

  const handleToggle = async (taskId: string, checked: boolean) => {
    const newTasks = { ...completedTasks, [taskId]: checked };
    setCompletedTasks(newTasks);
    
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, { onboarding: newTasks }, { merge: true });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <ul className="space-y-4">
          {ONBOARDING_TASKS.map((task) => (
            <li key={task.id} className="flex items-start gap-3">
              <Checkbox 
                id={task.id} 
                checked={!!completedTasks[task.id]} 
                onCheckedChange={(checked) => handleToggle(task.id, checked === true)} 
                className="mt-1"
              />
              <label 
                htmlFor={task.id} 
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${completedTasks[task.id] ? 'line-through text-muted-foreground' : ''}`}
              >
                {task.label}
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
