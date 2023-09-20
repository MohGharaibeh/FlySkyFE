import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizationGuard } from './authorization.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=>import('./home/home.module').then(x=>x.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: ()=>import('./authentication/authentication.module').then(a=>a.AuthenticationModule)
  },
  {
    path: 'admin',
    loadChildren: ()=> import('./admin/admin.module').then(a=>a.AdminModule)//, canActivate:[authorizationGuard]
  },
  {
    path: 'user',
    loadChildren: ()=> import('./homeuser/homeuser.module').then(u=>u.HomeuserModule)//,canActivate:[authorizationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
