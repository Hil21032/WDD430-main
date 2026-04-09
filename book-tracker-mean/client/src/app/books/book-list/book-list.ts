import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../shared/models/book.model';
import { BookService } from '../../shared/services/book.service';
import { BookFormComponent } from '../book-form/book-form';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BookFormComponent],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  loading = false;
  searchTerm = '';
  statusFilter: 'all' | 'to-read' | 'reading' | 'hold' | 'completed' = 'all';
  genreFilter = 'all';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.books$.subscribe((books: Book[]) => {
      this.books = books;
    });

    this.bookService.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });

    this.bookService.loadBooks();
  }

  get genres(): string[] {
    const uniqueGenres = new Set(
      this.books
        .map((book) => (book.genre || '').trim())
        .filter((genre) => genre.length > 0)
    );

    return [...uniqueGenres].sort((a, b) => a.localeCompare(b));
  }

  get filteredBooks(): Book[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.books.filter((book) => {
      const matchesStatus =
        this.statusFilter === 'all' || book.status === this.statusFilter;
      const matchesGenre =
        this.genreFilter === 'all' ||
        (book.genre || '').toLowerCase() === this.genreFilter.toLowerCase();
      const matchesSearch =
        !term ||
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        (book.genre || '').toLowerCase().includes(term);

      return matchesStatus && matchesGenre && matchesSearch;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.genreFilter = 'all';
  }

  formatDate(dateValue: string): string {
    if (!dateValue) {
      return 'Not set';
    }

    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) {
      return 'Not set';
    }

    return parsed.toLocaleDateString();
  }

  onSave(book: Book): void {
    if (this.selectedBook?._id) {
      this.bookService.updateBook(this.selectedBook._id, book);
    } else {
      this.bookService.createBook(book);
    }

    this.selectedBook = null;
  }

  onEdit(book: Book): void {
    this.selectedBook = { ...book };
  }

  onDelete(book: Book): void {
    if (book._id) {
      this.bookService.deleteBook(book._id);
      if (this.selectedBook?._id === book._id) {
        this.selectedBook = null;
      }
    }
  }

  onCancel(): void {
    this.selectedBook = null;
  }
}
