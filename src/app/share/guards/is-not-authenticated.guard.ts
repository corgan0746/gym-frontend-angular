import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.getIsAuthenticated){
    router.navigateByUrl("/home");
  }

  return true;
};
