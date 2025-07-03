import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'premium';
  joinDate: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}

export interface ScheduleItem {
  id: string;
  title: string;
  subject: string;
  location: string;
  startTime: Date;
  endTime: Date;
  type: 'class' | 'study' | 'exam' | 'assignment';
  isCompleted: boolean;
}

export interface StudySession {
  id: string;
  duration: number;
  subject: string;
  date: Date;
  type: 'pomodoro' | 'focus' | 'break';
}

export interface BookmarkedItem {
  id: string;
  type: 'material' | 'ai-tool';
  title: string;
  category: string;
  addedAt: Date;
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Notes
  notes: Note[];
  
  // Schedule
  scheduleItems: ScheduleItem[];
  
  // Study sessions
  studySessions: StudySession[];
  
  // Bookmarks
  bookmarks: BookmarkedItem[];
  
  // Timer state
  timerSettings: {
    workDuration: number;
    shortBreak: number;
    longBreak: number;
    autoStart: boolean;
  };
  
  // Actions
  setUser: (user: User | null) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  toggleNoteFavorite: (id: string) => void;
  addScheduleItem: (item: Omit<ScheduleItem, 'id'>) => void;
  updateScheduleItem: (id: string, updates: Partial<ScheduleItem>) => void;
  deleteScheduleItem: (id: string) => void;
  addStudySession: (session: Omit<StudySession, 'id'>) => void;
  addBookmark: (item: Omit<BookmarkedItem, 'id' | 'addedAt'>) => void;
  removeBookmark: (id: string) => void;
  updateTimerSettings: (settings: Partial<AppState['timerSettings']>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      notes: [],
      scheduleItems: [],
      studySessions: [],
      bookmarks: [],
      timerSettings: {
        workDuration: 25,
        shortBreak: 5,
        longBreak: 15,
        autoStart: false,
      },
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      addNote: (noteData) => {
        const note: Note = {
          ...noteData,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ notes: [note, ...state.notes] }));
      },
      
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
          ),
        }));
      },
      
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },
      
      toggleNoteFavorite: (id) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
          ),
        }));
      },
      
      addScheduleItem: (itemData) => {
        const item: ScheduleItem = {
          ...itemData,
          id: Date.now().toString(),
        };
        set((state) => ({ scheduleItems: [...state.scheduleItems, item] }));
      },
      
      updateScheduleItem: (id, updates) => {
        set((state) => ({
          scheduleItems: state.scheduleItems.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },
      
      deleteScheduleItem: (id) => {
        set((state) => ({
          scheduleItems: state.scheduleItems.filter((item) => item.id !== id),
        }));
      },
      
      addStudySession: (sessionData) => {
        const session: StudySession = {
          ...sessionData,
          id: Date.now().toString(),
        };
        set((state) => ({ studySessions: [...state.studySessions, session] }));
      },
      
      addBookmark: (itemData) => {
        const bookmark: BookmarkedItem = {
          ...itemData,
          id: Date.now().toString(),
          addedAt: new Date(),
        };
        set((state) => ({ bookmarks: [...state.bookmarks, bookmark] }));
      },
      
      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
        }));
      },
      
      updateTimerSettings: (settings) => {
        set((state) => ({
          timerSettings: { ...state.timerSettings, ...settings },
        }));
      },
    }),
    {
      name: 'studyvn-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        notes: state.notes,
        scheduleItems: state.scheduleItems,
        studySessions: state.studySessions,
        bookmarks: state.bookmarks,
        timerSettings: state.timerSettings,
      }),
    }
  )
);