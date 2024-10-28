import { Routes } from '@angular/router';
import { FavoritesPage } from './pages/favorites/favorites.page';
import { UsersPage } from './pages/users/users.page';
import { AllPropertiesPage } from './pages/all-properties/all-properties.page';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { PropertyViewPage } from './pages/property-view/property-view.page';
import { PropertyComparePage } from './pages/property-compare/property-compare.page';
import { AdminPanelPage } from './pages/admin-panel/admin-panel.page';
import {isAdminGuard} from './guards/is-admin.guard';
import {isValidUserGuard} from './guards/is-valid-user.guard';
import { RegisterPage } from './pages/register/register.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'favorites',
    component: FavoritesPage,
    canActivate: [isValidUserGuard],
  },
  {
    path: 'all-properties',
    component: AllPropertiesPage,
  },
  {
    path: 'property-view',
    component: PropertyViewPage,
  },
  {
    path: 'property-compare',
    component: PropertyComparePage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'admin-panel',
    component: AdminPanelPage,
    canActivate: [isAdminGuard],
    children: [
      {
        path: 'users',
        component: UsersPage,
      },
    ],
  },
];
