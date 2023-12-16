import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from './share/share.module';
import { ErrorComponent } from './share/pages/error/error.component';
import { isAuthenticatedGuard } from './share/guards/isAuthenticated.guard';
import { isNotAuthenticatedGuard } from './share/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path:'auth',
    canActivate:[ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'adm',
    loadChildren: () => import("./adm/adm.module").then(m => m.AdmModule)
  },
  {
    path:'account',
    canActivate: [isAuthenticatedGuard] ,
    loadChildren: () => import("./account/account.module").then(m => m.AccountModule)
  },
  {
    path:'error',
    component: ErrorComponent
  },
  {
    path:'',
    loadChildren: () => import('./gym/gym.module').then(m => m.GymModule)
  },
  {
  path:'**',
  redirectTo:''
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
