import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

const API_URL = 'http://localhost:3000/api/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  readonly books$ = new BehaviorSubject<Book[]>([]);
  readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  loadBooks(): void {
    this.loading$.next(true);
    this.http.get<Book[]>(API_URL).subscribe({
      next: (books: Book[]) => {
        this.books$.next(Array.isArray(books) ? books : []);
        this.loading$.next(false);
      },
      error: (error: unknown) => {
        console.error('Failed to load books:', error);
        this.loading$.next(false);
      }
    });
  }

  createBook(book: Book): void {
    this.http.post<Book>(API_URL, book).subscribe({
      next: () => this.loadBooks(),
      error: (error: unknown) => console.error('Failed to create book:', error)
    });
  }

  updateBook(bookId: string, book: Book): void {
    this.http.put<Book>(`${API_URL}/${bookId}`, book).subscribe({
      next: () => this.loadBooks(),
      error: (error: unknown) => console.error('Failed to update book:', error)
    });
  }

  deleteBook(bookId: string): void {
    this.http.delete(`${API_URL}/${bookId}`).subscribe({
      next: () => this.loadBooks(),
      error: (error: unknown) => console.error('Failed to delete book:', error)
    });
  }
}
