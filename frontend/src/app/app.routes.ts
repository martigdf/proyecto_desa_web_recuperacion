import { Routes } from '@angular/router';
import { FavoritesPage } from './favorites/favorites.page';
import { UsersPage } from './users/users.page';
import { AllPropertiesPage } from './all-properties/all-properties.page';

export const routes: Routes = [
    {
        path: 'favorites',
        component: FavoritesPage,
    },
    {
        path: 'users',
        component: UsersPage,  
    },
    {
        path: 'all-properties',
        component: AllPropertiesPage,  
    },
];
