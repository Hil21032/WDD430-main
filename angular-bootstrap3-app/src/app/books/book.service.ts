import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';

const BOOKS_API_URL = 'http://localhost:3000/api/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(BOOKS_API_URL);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(BOOKS_API_URL, book);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${BOOKS_API_URL}/${id}`, book);
  }

  deleteBook(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${BOOKS_API_URL}/${id}`);
  }
}
