import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { GenreService } from '../../core/services';
import * as GenresActions from './genres.actions';

@Injectable()
export class GenresEffects {
  private actions$ = inject(Actions);
  private genreService = inject(GenreService);

  loadGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenresActions.loadGenres),
      switchMap(action =>
        this.genreService.getGenres({ page: action.page, size: action.size, name: action.name }).pipe(
          map(genres => GenresActions.loadGenresSuccess({ genres })),
          catchError(error => of(GenresActions.loadGenresFailure({ error: error.message })))
        )
      )
    )
  );

  loadAllGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenresActions.loadAllGenres),
      switchMap(() =>
        this.genreService.getAllGenres().pipe(
          map(response => GenresActions.loadAllGenresSuccess({ genres: response.content })),
          catchError(error => of(GenresActions.loadGenresFailure({ error: error.message })))
        )
      )
    )
  );

  createGenre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenresActions.createGenre),
      exhaustMap(action =>
        this.genreService.createGenre(action.genre).pipe(
          map(genre => GenresActions.createGenreSuccess({ genre })),
          catchError(error => of(GenresActions.createGenreFailure({ error: error.message })))
        )
      )
    )
  );

  updateGenre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenresActions.updateGenre),
      exhaustMap(action =>
        this.genreService.updateGenre(action.id, action.genre).pipe(
          map(genre => GenresActions.updateGenreSuccess({ genre })),
          catchError(error => of(GenresActions.updateGenreFailure({ error: error.message })))
        )
      )
    )
  );

  deleteGenre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenresActions.deleteGenre),
      exhaustMap(action =>
        this.genreService.deleteGenre(action.id).pipe(
          map(() => GenresActions.deleteGenreSuccess({ id: action.id })),
          catchError(error => of(GenresActions.deleteGenreFailure({ error: error.message })))
        )
      )
    )
  );
}
