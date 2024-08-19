import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from "@angular/fire/compat/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['home']);

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full",
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: "full",
    ...canActivate(redirectLoggedInToItems)
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: "full",
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
