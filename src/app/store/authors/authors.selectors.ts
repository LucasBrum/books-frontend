import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthorsState } from './authors.reducer';

export const selectAuthorsState = createFeatureSelector<AuthorsState>('authors');

export const selectAllAuthors = createSelector(
  selectAuthorsState,
  (state: AuthorsState) => state.authors
);

export const selectAuthorsContent = createSelector(
  selectAllAuthors,
  (authors) => authors?.content || []
);

export const selectAllAuthorsForDropdown = createSelector(
  selectAuthorsState,
  (state: AuthorsState) => state.allAuthors
);

export const selectAuthorsLoading = createSelector(
  selectAuthorsState,
  (state: AuthorsState) => state.isLoading
);

export const selectAuthorsError = createSelector(
  selectAuthorsState,
  (state: AuthorsState) => state.error
);

export const selectAuthorsPagination = createSelector(
  selectAllAuthors,
  (authors) => authors ? {
    totalElements: authors.totalElements,
    totalPages: authors.totalPages,
    size: authors.size,
    number: authors.number,
    first: authors.first,
    last: authors.last
  } : null
);
