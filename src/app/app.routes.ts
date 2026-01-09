import { Routes } from '@angular/router';
import { Home } from './home/home'; 

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'tasks', loadChildren: () => import('./features/tasks/route/route').then(m => m.TASKS_ROUTES) },
    { path: 'about', loadChildren: () => import('./features/about/routes/about_route').then(m => m.ABOUT_ROUTES) },
];
