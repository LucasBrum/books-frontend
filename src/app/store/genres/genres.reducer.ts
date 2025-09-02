import { createReducer, on } from '@ngrx/store';
import { Genre, PagedResponse } from '../../core/models';
import * as GenresActions from './genres.actions';

export interface GenresState {
  genres: PagedResponse<Genre> | null;
  allGenres: Genre[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: GenresState = {
  genres: null,
  allGenres: [],
  isLoading: false,
  error: null
};

export const genresReducer = createReducer(
  initialState,
  
  on(GenresActions.loadGenres, GenresActions.loadAllGenres, GenresActions.createGenre, 
     GenresActions.updateGenre, GenresActions.deleteGenre, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(GenresActions.loadGenresSuccess, (state, { genres }) => ({
    ...state,
    genres,
    isLoading: false,
    error: null
  })),
  
  on(GenresActions.loadAllGenresSuccess, (state, { genres }) => ({
    ...state,
    allGenres: genres,
    isLoading: false,
    error: null
  })),
  
  on(GenresActions.createGenreSuccess, (state, { genre }) => ({
    ...state,
    genres: state.genres ? {
      ...state.genres,
      content: [...state.genres.content, genre],
      totalElements: state.genres.totalElements + 1
    } : null,
    allGenres: [...state.allGenres, genre],
    isLoading: false,
    error: null
  })),
  
  on(GenresActions.updateGenreSuccess, (state, { genre }) => ({
    ...state,
    genres: state.genres ? {
      ...state.genres,
      content: state.genres.content.map(g => g.id === genre.id ? genre : g)
    } : null,
    allGenres: state.allGenres.map(g => g.id === genre.id ? genre : g),
    isLoading: false,
    error: null
  })),
  
  on(GenresActions.deleteGenreSuccess, (state, { id }) => ({
    ...state,
    genres: state.genres ? {
      ...state.genres,
      content: state.genres.content.filter(g => g.id !== id),
      totalElements: state.genres.totalElements - 1
    } : null,
    allGenres: state.allGenres.filter(g => g.id !== id),
    isLoading: false,
    error: null
  })),
  
  on(GenresActions.loadGenresFailure, GenresActions.createGenreFailure, 
     GenresActions.updateGenreFailure, GenresActions.deleteGenreFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  on(GenresActions.clearError, (state) => ({
    ...state,
    error: null
  }))
);
