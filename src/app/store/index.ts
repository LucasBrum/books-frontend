import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer, AuthEffects } from './auth';
import { BooksState, booksReducer, BooksEffects } from './books';
import { AuthorsState, authorsReducer, AuthorsEffects } from './authors';
import { GenresState, genresReducer, GenresEffects } from './genres';

export interface AppState {
  auth: AuthState;
  books: BooksState;
  authors: AuthorsState;
  genres: GenresState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  books: booksReducer,
  authors: authorsReducer,
  genres: genresReducer
};

// Export effects
export { AuthEffects, BooksEffects, AuthorsEffects, GenresEffects };

// Export auth module
export * from './auth/auth.selectors';
export * from './auth/auth.actions';

// Export books module  
export * from './books/books.selectors';
export {
  loadBooks,
  loadBooksSuccess,
  loadBooksFailure,
  createBook,
  createBookSuccess,
  createBookFailure,
  updateBook,
  updateBookSuccess,
  updateBookFailure,
  deleteBook,
  deleteBookSuccess,
  deleteBookFailure,
  setSelectedBook
} from './books/books.actions';

// Export authors module
export * from './authors/authors.selectors';
export {
  loadAuthors,
  loadAuthorsSuccess,
  loadAuthorsFailure,
  loadAllAuthors,
  loadAllAuthorsSuccess,
  createAuthor,
  createAuthorSuccess,
  createAuthorFailure,
  updateAuthor,
  updateAuthorSuccess,
  updateAuthorFailure,
  deleteAuthor,
  deleteAuthorSuccess,
  deleteAuthorFailure
} from './authors/authors.actions';

// Export genres module
export * from './genres/genres.selectors';
export {
  loadGenres,
  loadGenresSuccess,
  loadGenresFailure,
  loadAllGenres,
  loadAllGenresSuccess,
  createGenre,
  createGenreSuccess,
  createGenreFailure,
  updateGenre,
  updateGenreSuccess,
  updateGenreFailure,
  deleteGenre,
  deleteGenreSuccess,
  deleteGenreFailure
} from './genres/genres.actions';
