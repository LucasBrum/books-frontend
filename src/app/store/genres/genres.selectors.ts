import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GenresState } from './genres.reducer';

export const selectGenresState = createFeatureSelector<GenresState>('genres');

export const selectAllGenres = createSelector(
  selectGenresState,
  (state: GenresState) => state.genres
);

export const selectGenresContent = createSelector(
  selectAllGenres,
  (genres) => genres?.content || []
);

export const selectAllGenresForDropdown = createSelector(
  selectGenresState,
  (state: GenresState) => state.allGenres
);

export const selectGenresLoading = createSelector(
  selectGenresState,
  (state: GenresState) => state.isLoading
);

export const selectGenresError = createSelector(
  selectGenresState,
  (state: GenresState) => state.error
);

export const selectGenresPagination = createSelector(
  selectAllGenres,
  (genres) => genres ? {
    totalElements: genres.totalElements,
    totalPages: genres.totalPages,
    size: genres.size,
    number: genres.number,
    first: genres.first,
    last: genres.last
  } : null
);
