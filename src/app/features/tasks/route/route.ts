import { Routes } from '@angular/router';
import { TaskComponent } from '../task-component/task-component';
import { DashboardComponent } from '../dashboard/dashboard.component';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: TaskComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];