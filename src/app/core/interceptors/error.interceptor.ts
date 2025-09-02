import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro inesperado';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Erro: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 401:
            errorMessage = 'Não autorizado. Faça login novamente.';
            authService.logout();
            router.navigate(['/auth/login']);
            break;
          case 403:
            errorMessage = 'Acesso negado.';
            break;
          case 404:
            errorMessage = 'Recurso não encontrado.';
            break;
          case 409:
            errorMessage = error.error?.message || 'Conflito de dados.';
            break;
          case 500:
            errorMessage = 'Erro interno do servidor.';
            break;
          default:
            if (error.error?.message) {
              errorMessage = error.error.message;
            }
        }
      }

      console.error('HTTP Error:', error);
      return throwError(() => new Error(errorMessage));
    })
  );
};
