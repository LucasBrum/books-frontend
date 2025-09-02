import { createAction, props } from '@ngrx/store';
import { Author, AuthorCreateRequest, AuthorUpdateRequest, PagedResponse } from '../../core/models';

export const loadAuthors = createAction(
  '[Authors] Load Authors',
  props<{ page?: number; size?: number; name?: string }>()
);

export const loadAuthorsSuccess = createAction(
  '[Authors] Load Authors Success',
  props<{ authors: PagedResponse<Author> }>()
);

export const loadAuthorsFailure = createAction(
  '[Authors] Load Authors Failure',
  props<{ error: string }>()
);

export const loadAllAuthors = createAction('[Authors] Load All Authors');

export const loadAllAuthorsSuccess = createAction(
  '[Authors] Load All Authors Success',
  props<{ authors: Author[] }>()
);

export const createAuthor = createAction(
  '[Authors] Create Author',
  props<{ author: AuthorCreateRequest }>()
);

export const createAuthorSuccess = createAction(
  '[Authors] Create Author Success',
  props<{ author: Author }>()
);

export const createAuthorFailure = createAction(
  '[Authors] Create Author Failure',
  props<{ error: string }>()
);

export const updateAuthor = createAction(
  '[Authors] Update Author',
  props<{ id: number; author: AuthorUpdateRequest }>()
);

export const updateAuthorSuccess = createAction(
  '[Authors] Update Author Success',
  props<{ author: Author }>()
);

export const updateAuthorFailure = createAction(
  '[Authors] Update Author Failure',
  props<{ error: string }>()
);

export const deleteAuthor = createAction(
  '[Authors] Delete Author',
  props<{ id: number }>()
);

export const deleteAuthorSuccess = createAction(
  '[Authors] Delete Author Success',
  props<{ id: number }>()
);

export const deleteAuthorFailure = createAction(
  '[Authors] Delete Author Failure',
  props<{ error: string }>()
);

export const clearError = createAction('[Authors] Clear Error');
