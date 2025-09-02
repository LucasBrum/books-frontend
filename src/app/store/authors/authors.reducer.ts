import { createReducer, on } from '@ngrx/store';
import { Author, PagedResponse } from '../../core/models';
import * as AuthorsActions from './authors.actions';

export interface AuthorsState {
  authors: PagedResponse<Author> | null;
  allAuthors: Author[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: AuthorsState = {
  authors: null,
  allAuthors: [],
  isLoading: false,
  error: null
};

export const authorsReducer = createReducer(
  initialState,
  
  on(AuthorsActions.loadAuthors, AuthorsActions.loadAllAuthors, AuthorsActions.createAuthor, 
     AuthorsActions.updateAuthor, AuthorsActions.deleteAuthor, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(AuthorsActions.loadAuthorsSuccess, (state, { authors }) => ({
    ...state,
    authors,
    isLoading: false,
    error: null
  })),
  
  on(AuthorsActions.loadAllAuthorsSuccess, (state, { authors }) => ({
    ...state,
    allAuthors: authors,
    isLoading: false,
    error: null
  })),
  
  on(AuthorsActions.createAuthorSuccess, (state, { author }) => ({
    ...state,
    authors: state.authors ? {
      ...state.authors,
      content: [...state.authors.content, author],
      totalElements: state.authors.totalElements + 1
    } : null,
    allAuthors: [...state.allAuthors, author],
    isLoading: false,
    error: null
  })),
  
  on(AuthorsActions.updateAuthorSuccess, (state, { author }) => ({
    ...state,
    authors: state.authors ? {
      ...state.authors,
      content: state.authors.content.map(a => a.id === author.id ? author : a)
    } : null,
    allAuthors: state.allAuthors.map(a => a.id === author.id ? author : a),
    isLoading: false,
    error: null
  })),
  
  on(AuthorsActions.deleteAuthorSuccess, (state, { id }) => ({
    ...state,
    authors: state.authors ? {
      ...state.authors,
      content: state.authors.content.filter(a => a.id !== id),
      totalElements: state.authors.totalElements - 1
    } : null,
    allAuthors: state.allAuthors.filter(a => a.id !== id),
    isLoading: false,
    error: null
  })),
  
  on(AuthorsActions.loadAuthorsFailure, AuthorsActions.createAuthorFailure, 
     AuthorsActions.updateAuthorFailure, AuthorsActions.deleteAuthorFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  on(AuthorsActions.clearError, (state) => ({
    ...state,
    error: null
  }))
);
