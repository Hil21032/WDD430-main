export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number | null;
  createdAt?: string;
  updatedAt?: string;
}
