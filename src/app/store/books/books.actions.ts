import { createAction, props } from '@ngrx/store';
import { Book, BookCreateRequest, BookUpdateRequest, PagedResponse } from '../../core/models';

export const loadBooks = createAction(
  '[Books] Load Books',
  props<{ page?: number; size?: number; title?: string; authorId?: number; genreId?: number }>()
);

export const loadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ books: PagedResponse<Book> }>()
);

export const loadBooksFailure = createAction(
  '[Books] Load Books Failure',
  props<{ error: string }>()
);

export const loadBook = createAction(
  '[Books] Load Book',
  props<{ id: number }>()
);

export const loadBookSuccess = createAction(
  '[Books] Load Book Success',
  props<{ book: Book }>()
);

export const loadBookFailure = createAction(
  '[Books] Load Book Failure',
  props<{ error: string }>()
);

export const createBook = createAction(
  '[Books] Create Book',
  props<{ book: BookCreateRequest }>()
);

export const createBookSuccess = createAction(
  '[Books] Create Book Success',
  props<{ book: Book }>()
);

export const createBookFailure = createAction(
  '[Books] Create Book Failure',
  props<{ error: string }>()
);

export const updateBook = createAction(
  '[Books] Update Book',
  props<{ id: number; book: BookUpdateRequest }>()
);

export const updateBookSuccess = createAction(
  '[Books] Update Book Success',
  props<{ book: Book }>()
);

export const updateBookFailure = createAction(
  '[Books] Update Book Failure',
  props<{ error: string }>()
);

export const deleteBook = createAction(
  '[Books] Delete Book',
  props<{ id: number }>()
);

export const deleteBookSuccess = createAction(
  '[Books] Delete Book Success',
  props<{ id: number }>()
);

export const deleteBookFailure = createAction(
  '[Books] Delete Book Failure',
  props<{ error: string }>()
);

export const clearError = createAction('[Books] Clear Error');

export const setSelectedBook = createAction(
  '[Books] Set Selected Book',
  props<{ book: Book | null }>()
);
