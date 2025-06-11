export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export type NoteWithoutId = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export interface Category {
  id: string;
  name: string;
  color: string;
}