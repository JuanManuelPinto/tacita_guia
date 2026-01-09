import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'monument-detail/:id',
        loadComponent: () => import('./pages/monument-detail/monument-detail.page').then((m) => m.MonumentDetailPage),
    },
    {
        path: 'ajustes',
        loadComponent: () => import('./pages/ajustes/ajustes.page').then( m => m.AjustesPage)
    },

];
