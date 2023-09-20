import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ManageHomeService } from './service/manage-home.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const rout :Router = new Router;
  //const ser :ManageHomeService = inject(ManageHomeService); to inject service in any place
  const token = localStorage.getItem('token')
  if (token){
    if (state.url.indexOf('admin')){
      let user:any = localStorage.getItem('user');
      user = JSON.parse(user);
      if (user.role == '1'){
        return true;
      }
      else{
        rout.navigate(['auth/login'])
        return false;
      }
    }
    else if (state.url.indexOf('user')){
      let user:any = localStorage.getItem('user');
      user = JSON.parse(user);
      if(user.role == '1' || user.role == '2'){
        return true;
      }
      else{
        rout.navigate(['auth/login'])
        return false;
      }
    }
    return true;
  }
  else{
    rout.navigate(['auth/login'])
    return false;
  }
  //return true;
};
