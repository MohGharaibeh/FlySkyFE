import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren: ()=> import('./admin/admin.module').then(a=>a.AdminModule)
  },
  {
    path: 'user',
    loadChildren: ()=> import('./homeuser/homeuser.module').then(u=>u.HomeuserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
