import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from './book.service';
import { Book } from './book.model';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css'
})
export class BooksPageComponent implements OnInit {
  books: Book[] = [];
  isSaving = false;
  errorMessage = '';
  editingBookId: string | null = null;

  formData: Book = {
    title: '',
    author: '',
    genre: '',
    publishedYear: null
  };

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: () => {
        this.errorMessage = 'Could not load books. Is the Node API running?';
      }
    });
  }

  saveBook(): void {
    this.errorMessage = '';
    this.isSaving = true;

    const payload: Book = {
      ...this.formData,
      title: this.formData.title.trim(),
      author: this.formData.author.trim(),
      genre: this.formData.genre?.trim() || '',
      publishedYear: this.formData.publishedYear
    };

    if (this.editingBookId) {
      this.bookService.updateBook(this.editingBookId, payload).subscribe({
        next: () => {
          this.afterSave();
        },
        error: () => {
          this.isSaving = false;
          this.errorMessage = 'Update failed. Please try again.';
        }
      });
      return;
    }

    this.bookService.createBook(payload).subscribe({
      next: () => {
        this.afterSave();
      },
      error: () => {
        this.isSaving = false;
        this.errorMessage = 'Create failed. Please try again.';
      }
    });
  }

  startEdit(book: Book): void {
    this.editingBookId = book._id || null;
    this.formData = {
      title: book.title,
      author: book.author,
      genre: book.genre,
      publishedYear: book.publishedYear
    };
  }

  cancelEdit(): void {
    this.resetForm();
  }

  deleteBook(book: Book): void {
    if (!book._id) {
      return;
    }

    this.bookService.deleteBook(book._id).subscribe({
      next: () => {
        this.loadBooks();
      },
      error: () => {
        this.errorMessage = 'Delete failed. Please try again.';
      }
    });
  }

  private afterSave(): void {
    this.isSaving = false;
    this.resetForm();
    this.loadBooks();
  }

  private resetForm(): void {
    this.editingBookId = null;
    this.formData = {
      title: '',
      author: '',
      genre: '',
      publishedYear: null
    };
  }
}
