import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('authGuard déclenché');

  const role = localStorage.getItem('role');
  console.log('Rôle récupéré :', role);

  if (role === 'ADMIN' || role === 'USER') {
    console.log('Accès autorisé pour le rôle :', role);
    return true;
  } else {
    console.log('Accès refusé, redirection vers login');
    const router = new Router();
    router.navigate(['/']);
    return false;
  }
};
