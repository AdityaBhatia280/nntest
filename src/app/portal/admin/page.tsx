'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useAuth, UserStatus } from '@/contexts/auth-context';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { TEAM_DATA } from '@/lib/team-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Loader2, 
  ShieldCheck, 
  CheckCircle, 
  Trash2, 
  Building2, 
  Search, 
  UserX, 
  Edit3, 
  Users, 
  Clock, 
  CheckCircle2, 
  ShieldAlert,
  XCircle,
  Plus
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface UserDoc {
  id: string;
  email: string;
  name: string;
  status: UserStatus | 'revoked';
  chapter?: string;
}

export default function AdminDashboardPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [fetching, setFetching] = useState(true);
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [chapterFilter, setChapterFilter] = useState<string>('all');

  // Modal states for chapter editing
  const [selectedUserForChapter, setSelectedUserForChapter] = useState<UserDoc | null>(null);
  const [selectedChapterValue, setSelectedChapterValue] = useState<string>('');
  const [customChapterValue, setCustomChapterValue] = useState<string>('');
  const [isCustomChapter, setIsCustomChapter] = useState(false);

  // Modal states for deletion confirmation
  const [userToDelete, setUserToDelete] = useState<UserDoc | null>(null);

  // Loading indicator for row operations
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Extract master list of standard chapters
  const standardChapters = useMemo(() => {
    const list = TEAM_DATA['2026-2027']?.chapters?.map(c => c.name) || [];
    return Array.from(new Set(list)).sort();
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/portal');
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as UserDoc[];
        setUsers(usersData);
        setFetching(false);
      }, (error) => {
        console.error("Error fetching users: ", error);
        setFetching(false);
      });
      return () => unsubscribe();
    }
  }, [isAdmin]);

  // Handler functions
  const handleApproveStep1 = async (userId: string) => {
    setActionLoadingId(userId);
    try {
      await updateDoc(doc(db, 'users', userId), { status: 'approved_step_1' });
    } catch (err) {
      console.error("Error approving step 1:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleApproveFinal = async (userId: string) => {
    setActionLoadingId(userId);
    try {
      await updateDoc(doc(db, 'users', userId), { status: 'fully_approved' });
    } catch (err) {
      console.error("Error approving final:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    setActionLoadingId(userId);
    try {
      await updateDoc(doc(db, 'users', userId), { status: newStatus });
    } catch (err) {
      console.error("Error updating user status:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const openChapterModal = (u: UserDoc) => {
    setSelectedUserForChapter(u);
    const currentChapter = u.chapter || '';
    if (currentChapter && !standardChapters.includes(currentChapter)) {
      setIsCustomChapter(true);
      setCustomChapterValue(currentChapter);
      setSelectedChapterValue('custom');
    } else {
      setIsCustomChapter(false);
      setCustomChapterValue('');
      setSelectedChapterValue(currentChapter || 'none');
    }
  };

  const handleSaveChapter = async () => {
    if (!selectedUserForChapter) return;
    setActionLoadingId(selectedUserForChapter.id);
    
    let finalChapter = '';
    if (selectedChapterValue === 'custom') {
      finalChapter = customChapterValue.trim();
    } else if (selectedChapterValue !== 'none') {
      finalChapter = selectedChapterValue;
    }

    try {
      await updateDoc(doc(db, 'users', selectedUserForChapter.id), { chapter: finalChapter });
      setSelectedUserForChapter(null);
    } catch (err) {
      console.error("Error saving chapter:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    setActionLoadingId(userToDelete.id);
    try {
      await deleteDoc(doc(db, 'users', userToDelete.id));
      setUserToDelete(null);
    } catch (err) {
      console.error("Error deleting user:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filtered users list
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.chapter && u.chapter.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
      const matchesChapter = 
        chapterFilter === 'all' ? true :
        chapterFilter === 'unassigned' ? !u.chapter :
        u.chapter === chapterFilter;

      return matchesSearch && matchesStatus && matchesChapter;
    });
  }, [users, searchQuery, statusFilter, chapterFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = users.length;
    const fullyApproved = users.filter(u => u.status === 'fully_approved').length;
    const pending = users.filter(u => u.status === 'pending_step_1' || u.status === 'ip_submitted').length;
    const assignedChapters = new Set(users.map(u => u.chapter).filter(Boolean)).size;
    return { total, fullyApproved, pending, assignedChapters };
  }, [users]);

  if (loading || fetching || !isAdmin) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-headline">Head Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage chapter assignments, approve leader access, and remove user accounts.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <h3 className="text-3xl font-bold font-headline mt-1">{stats.total}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fully Approved</p>
              <h3 className="text-3xl font-bold font-headline mt-1 text-green-600">{stats.fullyApproved}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
              <h3 className="text-3xl font-bold font-headline mt-1 text-amber-600">{stats.pending}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Clock className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Chapters</p>
              <h3 className="text-3xl font-bold font-headline mt-1 text-blue-600">{stats.assignedChapters}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
              <Building2 className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>User Directory & Chapter Management</CardTitle>
              <CardDescription>Overview of all registered users and chapter leaders.</CardDescription>
            </div>
          </div>

          {/* Search & Filters Toolbar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search name, email, or chapter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending_step_1">Pending Step 1</SelectItem>
                <SelectItem value="approved_step_1">Step 1 Approved</SelectItem>
                <SelectItem value="ip_submitted">IP Submitted</SelectItem>
                <SelectItem value="fully_approved">Fully Approved</SelectItem>
                <SelectItem value="revoked">Access Revoked</SelectItem>
              </SelectContent>
            </Select>

            <Select value={chapterFilter} onValueChange={setChapterFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by chapter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chapters</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {standardChapters.map(chap => (
                  <SelectItem key={chap} value={chap}>{chap}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Assigned Chapter</TableHead>
                  <TableHead>Approval Status</TableHead>
                  <TableHead className="text-right">Actions & Access</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => {
                  const isLoadingThis = actionLoadingId === u.id;
                  return (
                    <TableRow key={u.id} className="hover:bg-muted/50 transition-colors">
                      {/* Name */}
                      <TableCell className="font-semibold text-foreground">
                        {u.name || 'Unnamed User'}
                      </TableCell>

                      {/* Email */}
                      <TableCell className="text-muted-foreground">
                        {u.email}
                      </TableCell>

                      {/* Chapter */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {u.chapter ? (
                            <Badge variant="secondary" className="font-medium bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200">
                              <Building2 className="mr-1 h-3 w-3" />
                              {u.chapter}
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">Unassigned</span>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                            title="Change Chapter"
                            onClick={() => openChapterModal(u)}
                            disabled={isLoadingThis}
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            <span className="sr-only">Change Chapter</span>
                          </Button>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Select
                            value={u.status}
                            onValueChange={(val) => handleUpdateStatus(u.id, val)}
                            disabled={isLoadingThis}
                          >
                            <SelectTrigger className="h-8 text-xs w-[160px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending_step_1">PENDING STEP 1</SelectItem>
                              <SelectItem value="approved_step_1">STEP 1 APPROVED</SelectItem>
                              <SelectItem value="ip_submitted">IP SUBMITTED</SelectItem>
                              <SelectItem value="fully_approved">FULLY APPROVED</SelectItem>
                              <SelectItem value="revoked">ACCESS REVOKED</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Quick Approval Actions */}
                          {u.status === 'pending_step_1' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApproveStep1(u.id)}
                              disabled={isLoadingThis}
                            >
                              {isLoadingThis ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Approve Step 1'}
                            </Button>
                          )}

                          {u.status === 'ip_submitted' && (
                            <Button
                              size="sm"
                              variant="default"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleApproveFinal(u.id)}
                              disabled={isLoadingThis}
                            >
                              {isLoadingThis ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <CheckCircle className="mr-1.5 h-4 w-4" /> Approve Final
                                </>
                              )}
                            </Button>
                          )}

                          {/* Quick Revoke or Delete */}
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 px-2.5"
                            onClick={() => setUserToDelete(u)}
                            disabled={isLoadingThis}
                            title="Delete User / Remove Access"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <UserX className="h-8 w-8 text-muted-foreground/60" />
                        <p className="font-medium">No users found matching your search or filters.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Chapter Assignment Modal */}
      {selectedUserForChapter && (
        <Dialog open={!!selectedUserForChapter} onOpenChange={(open) => !open && setSelectedUserForChapter(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Assign Chapter to User
              </DialogTitle>
              <DialogDescription>
                Select or enter the chapter that <strong>{selectedUserForChapter.name}</strong> ({selectedUserForChapter.email}) belongs to.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Chapter</label>
                <Select
                  value={selectedChapterValue}
                  onValueChange={(val) => {
                    setSelectedChapterValue(val);
                    setIsCustomChapter(val === 'custom');
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a chapter..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="none">-- No Chapter (Unassigned) --</SelectItem>
                    {standardChapters.map(chap => (
                      <SelectItem key={chap} value={chap}>{chap}</SelectItem>
                    ))}
                    <SelectItem value="custom">+ Add Custom Chapter Name...</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isCustomChapter && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <label className="text-sm font-medium">Custom Chapter Name</label>
                  <Input
                    placeholder="e.g. Oakridge High School"
                    value={customChapterValue}
                    onChange={(e) => setCustomChapterValue(e.target.value)}
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedUserForChapter(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveChapter} disabled={actionLoadingId === selectedUserForChapter.id}>
                {actionLoadingId === selectedUserForChapter.id ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Save Chapter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* User Deletion Confirmation Alert */}
      {userToDelete && (
        <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                <ShieldAlert className="h-5 w-5" />
                Delete User Account & Remove Access
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to permanently delete <strong>{userToDelete.name}</strong> ({userToDelete.email})? 
                This action will remove their account record and immediately revoke all chapter portal access.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setUserToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteUser}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
