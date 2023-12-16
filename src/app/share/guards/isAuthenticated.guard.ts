import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.getIsAuthenticated){
    router.navigateByUrl("/auth/login");
  }

  return true;
};
