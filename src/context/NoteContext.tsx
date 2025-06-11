import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Note, NoteWithoutId, Category } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';

interface NoteContextType {
  notes: Note[];
  categories: Category[];
  addNote: (note: NoteWithoutId) => void;
  updateNote: (id: string, note: Partial<NoteWithoutId>) => void;
  deleteNote: (id: string) => void;
  addCategory: (name: string, color: string) => void;
  deleteCategory: (id: string) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

const defaultCategories: Category[] = [
  { id: '1', name: 'Personal', color: '#3b82f6' },
  { id: '2', name: 'Work', color: '#ef4444' },
  { id: '3', name: 'Ideas', color: '#10b981' },
];

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', defaultCategories);

  const addNote = (note: NoteWithoutId) => {
    const newNote: Note = {
      id: Date.now().toString(),
      ...note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, updatedNote: Partial<NoteWithoutId>) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...updatedNote,
            updatedAt: new Date().toISOString(),
          };
        }
        return note;
      })
    );
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const addCategory = (name: string, color: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      color,
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        categories,
        addNote,
        updateNote,
        deleteNote,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};