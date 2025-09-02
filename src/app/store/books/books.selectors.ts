import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './books.reducer';

export const selectBooksState = createFeatureSelector<BooksState>('books');

export const selectAllBooks = createSelector(
  selectBooksState,
  (state: BooksState) => state.books
);

export const selectBooksContent = createSelector(
  selectAllBooks,
  (books) => books?.content || []
);

export const selectSelectedBook = createSelector(
  selectBooksState,
  (state: BooksState) => state.selectedBook
);

export const selectBooksLoading = createSelector(
  selectBooksState,
  (state: BooksState) => state.isLoading
);

export const selectBooksError = createSelector(
  selectBooksState,
  (state: BooksState) => state.error
);

export const selectBooksPagination = createSelector(
  selectAllBooks,
  (books) => books ? {
    totalElements: books.totalElements,
    totalPages: books.totalPages,
    size: books.size,
    number: books.number,
    first: books.first,
    last: books.last
  } : null
);
