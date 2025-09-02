import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { AuthorService } from '../../core/services';
import * as AuthorsActions from './authors.actions';

@Injectable()
export class AuthorsEffects {
  private actions$ = inject(Actions);
  private authorService = inject(AuthorService);

  loadAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.loadAuthors),
      switchMap(action =>
        this.authorService.getAuthors({ page: action.page, size: action.size, name: action.name }).pipe(
          map(authors => AuthorsActions.loadAuthorsSuccess({ authors })),
          catchError(error => of(AuthorsActions.loadAuthorsFailure({ error: error.message })))
        )
      )
    )
  );

  loadAllAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.loadAllAuthors),
      switchMap(() =>
        this.authorService.getAllAuthors().pipe(
          map(response => AuthorsActions.loadAllAuthorsSuccess({ authors: response.content })),
          catchError(error => of(AuthorsActions.loadAuthorsFailure({ error: error.message })))
        )
      )
    )
  );

  createAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.createAuthor),
      exhaustMap(action =>
        this.authorService.createAuthor(action.author).pipe(
          map(author => AuthorsActions.createAuthorSuccess({ author })),
          catchError(error => of(AuthorsActions.createAuthorFailure({ error: error.message })))
        )
      )
    )
  );

  updateAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.updateAuthor),
      exhaustMap(action =>
        this.authorService.updateAuthor(action.id, action.author).pipe(
          map(author => AuthorsActions.updateAuthorSuccess({ author })),
          catchError(error => of(AuthorsActions.updateAuthorFailure({ error: error.message })))
        )
      )
    )
  );

  deleteAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.deleteAuthor),
      exhaustMap(action =>
        this.authorService.deleteAuthor(action.id).pipe(
          map(() => AuthorsActions.deleteAuthorSuccess({ id: action.id })),
          catchError(error => of(AuthorsActions.deleteAuthorFailure({ error: error.message })))
        )
      )
    )
  );
}
