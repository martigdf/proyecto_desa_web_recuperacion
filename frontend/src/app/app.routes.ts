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
import {EditUserPage} from './pages/edit-user/edit-user.page';
import {isAdminOrSelfGuard} from './guards/is-admin-or-self.guard';
import { isAdminOrUserGuard } from './guards/is-admin-or-user.guard';
import { PropertiesPage } from './pages/properties/properties.page';

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
  },
  {
    path: 'all-properties',
    component: AllPropertiesPage,
  },
  {
    path: 'property-view/:id',
    component: PropertyViewPage,
  },
  {
    path: 'property-compare',
    component: PropertyComparePage,
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [isAdminOrUserGuard],
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'admin-panel',
    component: AdminPanelPage,
    canActivate: [isAdminGuard],
  },
  {
    path: 'admin-panel/users',
    component: UsersPage,
    canActivate: [isAdminGuard],
  },
  {
    path: 'admin-panel/properties',
    component: PropertiesPage,
    canActivate: [isAdminGuard],
  },
  {
    path: 'edit-user/:userId',
    component: EditUserPage,
    canActivate: [isAdminOrSelfGuard],
  }
];
