import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router : Router = inject(Router)
  const protectedRoutes : Array<String> = ["/home"]
  const id = sessionStorage.getItem("id")
  if (protectedRoutes.includes(state.url)) {
    return !id ? router.navigate(["/login"]) : true;
  } else {
    return id ? router.navigate(["/home"]) : true;
  }
};
