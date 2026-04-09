import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book, EMPTY_BOOK, ReadingStatus } from '../../shared/models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookFormComponent {
  @Input() set book(value: Book | null) {
    this.editingId = value?._id ?? null;
    this.formBook = value
      ? {
          _id: value._id,
          title: value.title,
          author: value.author,
          genre: value.genre ?? '',
          pageCount: value.pageCount ?? null,
          status: value.status,
          rating: value.rating,
          notes: value.notes ?? '',
          startDate: value.startDate ? value.startDate.slice(0, 10) : '',
          finishDate: value.finishDate ? value.finishDate.slice(0, 10) : '',
          coverUrl: value.coverUrl ?? ''
        }
      : { ...EMPTY_BOOK };
  }

  @Output() save = new EventEmitter<Book>();
  @Output() cancel = new EventEmitter<void>();

  formBook: Book = { ...EMPTY_BOOK };
  editingId: string | null = null;
  readonly statuses: ReadingStatus[] = ['to-read', 'reading', 'hold', 'completed'];

  submit(): void {
    if (!this.formBook.title.trim() || !this.formBook.author.trim()) {
      return;
    }

    this.save.emit({
      ...this.formBook,
      title: this.formBook.title.trim(),
      author: this.formBook.author.trim(),
      genre: this.formBook.genre.trim(),
      pageCount: this.formBook.pageCount ? Number(this.formBook.pageCount) : null,
      notes: this.formBook.notes.trim(),
      startDate: this.formBook.startDate || '',
      finishDate: this.formBook.finishDate || '',
      coverUrl: this.formBook.coverUrl.trim()
    });
  }

  reset(): void {
    this.book = null;
    this.cancel.emit();
  }
}
