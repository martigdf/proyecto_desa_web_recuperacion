import { Routes } from '@angular/router';
import { FavoritesPage } from './pages/favorites/favorites.page';
import { UsersPage } from './pages/users/users.page';
import { AllPropertiesPage } from './pages/all-properties/all-properties.page';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { PropertyViewPage } from './pages/property-view/property-view.page';
import { PropertyComparePage } from './pages/property-compare/property-compare.page';
import { AdminPanelPage } from './pages/admin-panel/admin-panel.page';

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
    path: 'admin-panel',
    component: AdminPanelPage,
    children: [
      {
        path: 'users',
        component: UsersPage,
      },
    ],
  },
];
