import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { BookService } from '../../core/services';
import * as BooksActions from './books.actions';

@Injectable()
export class BooksEffects {
  private actions$ = inject(Actions);
  private bookService = inject(BookService);

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.loadBooks),
      switchMap(action => {
        console.log('📚 BooksEffect: loadBooks called with:', action);
        return this.bookService.getBooks({
          page: action.page,
          size: action.size,
          title: action.title,
          authorId: action.authorId,
          genreId: action.genreId
        }).pipe(
          map(books => {
            console.log('📚 BooksEffect: loadBooksSuccess with:', books);
            return BooksActions.loadBooksSuccess({ books });
          }),
          catchError(error => {
            console.error('📚 BooksEffect: loadBooksFailure:', error);
            return of(BooksActions.loadBooksFailure({ error: error.message }));
          })
        );
      })
    )
  );

  loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.loadBook),
      switchMap(action =>
        this.bookService.getBook(action.id).pipe(
          map(book => BooksActions.loadBookSuccess({ book })),
          catchError(error => of(BooksActions.loadBookFailure({ error: error.message })))
        )
      )
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.createBook),
      exhaustMap(action =>
        this.bookService.createBook(action.book).pipe(
          map(book => BooksActions.createBookSuccess({ book })),
          catchError(error => of(BooksActions.createBookFailure({ error: error.message })))
        )
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.updateBook),
      exhaustMap(action =>
        this.bookService.updateBook(action.id, action.book).pipe(
          map(book => BooksActions.updateBookSuccess({ book })),
          catchError(error => of(BooksActions.updateBookFailure({ error: error.message })))
        )
      )
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.deleteBook),
      exhaustMap(action =>
        this.bookService.deleteBook(action.id).pipe(
          map(() => BooksActions.deleteBookSuccess({ id: action.id })),
          catchError(error => of(BooksActions.deleteBookFailure({ error: error.message })))
        )
      )
    )
  );
}
