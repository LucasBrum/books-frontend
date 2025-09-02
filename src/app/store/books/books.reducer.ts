import { createReducer, on } from '@ngrx/store';
import { Book, PagedResponse } from '../../core/models';
import * as BooksActions from './books.actions';

export interface BooksState {
  books: PagedResponse<Book> | null;
  selectedBook: Book | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: BooksState = {
  books: null,
  selectedBook: null,
  isLoading: false,
  error: null
};

export const booksReducer = createReducer(
  initialState,
  
  on(BooksActions.loadBooks, BooksActions.loadBook, BooksActions.createBook, 
     BooksActions.updateBook, BooksActions.deleteBook, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(BooksActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    isLoading: false,
    error: null
  })),
  
  on(BooksActions.loadBookSuccess, (state, { book }) => ({
    ...state,
    selectedBook: book,
    isLoading: false,
    error: null
  })),
  
  on(BooksActions.createBookSuccess, (state, { book }) => ({
    ...state,
    books: state.books ? {
      ...state.books,
      content: [...state.books.content, book],
      totalElements: state.books.totalElements + 1
    } : null,
    isLoading: false,
    error: null
  })),
  
  on(BooksActions.updateBookSuccess, (state, { book }) => ({
    ...state,
    books: state.books ? {
      ...state.books,
      content: state.books.content.map(b => b.id === book.id ? book : b)
    } : null,
    selectedBook: state.selectedBook?.id === book.id ? book : state.selectedBook,
    isLoading: false,
    error: null
  })),
  
  on(BooksActions.deleteBookSuccess, (state, { id }) => ({
    ...state,
    books: state.books ? {
      ...state.books,
      content: state.books.content.filter(b => b.id !== id),
      totalElements: state.books.totalElements - 1
    } : null,
    selectedBook: state.selectedBook?.id === id ? null : state.selectedBook,
    isLoading: false,
    error: null
  })),
  
  on(BooksActions.loadBooksFailure, BooksActions.loadBookFailure, 
     BooksActions.createBookFailure, BooksActions.updateBookFailure, 
     BooksActions.deleteBookFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  on(BooksActions.setSelectedBook, (state, { book }) => ({
    ...state,
    selectedBook: book
  })),
  
  on(BooksActions.clearError, (state) => ({
    ...state,
    error: null
  }))
);
