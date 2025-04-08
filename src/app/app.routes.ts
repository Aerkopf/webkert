import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'buses',
        loadComponent: () => import('./pages/buses/buses.component').then(m => m.BusesComponent),
        children: [
            {
                path: 'bus/:id', 
                loadComponent: () => import('./pages/buses/bus/bus.component').then(m => m.BusComponent)
            }
        ]
    },
    {
        path: 'trams',
        loadComponent: () => import('./pages/trams/trams.component').then(m => m.TramsComponent),
        children: [
            {
                path: 'tram/:id', 
                loadComponent: () => import('./pages/trams/tram/tram.component').then(m => m.TramComponent)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
    }
];
