export type ReadingStatus = 'to-read' | 'reading' | 'hold' | 'completed';

export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  pageCount: number | null;
  status: ReadingStatus;
  rating: number;
  notes: string;
  startDate: string;
  finishDate: string;
  coverUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export const EMPTY_BOOK: Book = {
  title: '',
  author: '',
  genre: '',
  pageCount: null,
  status: 'to-read',
  rating: 0,
  notes: '',
  startDate: '',
  finishDate: '',
  coverUrl: ''
};
