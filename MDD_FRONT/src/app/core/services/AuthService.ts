import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private loginUrl = 'http://localhost:8080/auth/login';

  loginUser(data: { username: string; password: string }): Observable<{ role: string }> {
    console.log('Données envoyées au backend pour la connexion :', data);
    return this.http.post<{ role: string }>(this.loginUrl, data).pipe(
      map(response => {
        console.log('Rôle reçu depuis le backend :', response.role);
        localStorage.setItem('role', response.role);

        if (response.role === 'ADMIN') {
          this.router.navigate(['/dashboard/admin']);
        } else if (response.role === 'USER') {
          this.router.navigate(['/dashboard/user']);
        } else {
          console.error('Rôle inconnu reçu depuis le backend.');
        }

        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la connexion utilisateur :', error);
        return throwError(() => error);
      })
    );
  }
}
