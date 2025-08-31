import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authTokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('authToken');

  if (!token) {
    router.navigate(['/auth']);
    return false;
  }

  // Decodificar el token y validar expiración
  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decodifica la parte del payload del JWT
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

    if (tokenPayload.exp && tokenPayload.exp < currentTime) {
      sessionStorage.removeItem('authToken'); // Eliminar token si expiró
      router.navigate(['/auth']);
      return false;
    }

    return true;
  } catch (error) {
    sessionStorage.removeItem('authToken'); // Si falla la decodificación, elimina el token
    router.navigate(['/auth']);
    return false;
  }
};
