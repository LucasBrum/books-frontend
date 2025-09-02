import { createAction, props } from '@ngrx/store';
import { Genre, GenreCreateRequest, GenreUpdateRequest, PagedResponse } from '../../core/models';

export const loadGenres = createAction(
  '[Genres] Load Genres',
  props<{ page?: number; size?: number; name?: string }>()
);

export const loadGenresSuccess = createAction(
  '[Genres] Load Genres Success',
  props<{ genres: PagedResponse<Genre> }>()
);

export const loadGenresFailure = createAction(
  '[Genres] Load Genres Failure',
  props<{ error: string }>()
);

export const loadAllGenres = createAction('[Genres] Load All Genres');

export const loadAllGenresSuccess = createAction(
  '[Genres] Load All Genres Success',
  props<{ genres: Genre[] }>()
);

export const createGenre = createAction(
  '[Genres] Create Genre',
  props<{ genre: GenreCreateRequest }>()
);

export const createGenreSuccess = createAction(
  '[Genres] Create Genre Success',
  props<{ genre: Genre }>()
);

export const createGenreFailure = createAction(
  '[Genres] Create Genre Failure',
  props<{ error: string }>()
);

export const updateGenre = createAction(
  '[Genres] Update Genre',
  props<{ id: number; genre: GenreUpdateRequest }>()
);

export const updateGenreSuccess = createAction(
  '[Genres] Update Genre Success',
  props<{ genre: Genre }>()
);

export const updateGenreFailure = createAction(
  '[Genres] Update Genre Failure',
  props<{ error: string }>()
);

export const deleteGenre = createAction(
  '[Genres] Delete Genre',
  props<{ id: number }>()
);

export const deleteGenreSuccess = createAction(
  '[Genres] Delete Genre Success',
  props<{ id: number }>()
);

export const deleteGenreFailure = createAction(
  '[Genres] Delete Genre Failure',
  props<{ error: string }>()
);

export const clearError = createAction('[Genres] Clear Error');
