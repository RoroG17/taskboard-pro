import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TaskService, Task, TaskStatus } from '../../../core/services/task-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;

  statuses: TaskStatus[] = ['A_FAIRE', 'EN_COURS', 'TERMINE'];

  getStatusLabel(status: TaskStatus) {
    switch (status) {
      case 'A_FAIRE': return 'À faire';
      case 'EN_COURS': return 'En cours';
      case 'TERMINE': return 'Terminé';
    }
  }

  getStatusClass(status: TaskStatus) {
    switch (status) {
      case 'A_FAIRE': return 'status-a-faire';
      case 'EN_COURS': return 'status-en-cours';
      case 'TERMINE': return 'status-termine';
    }
  }

  countTasks(tasks: Task[], status: TaskStatus) {
    return tasks.filter(task => task.status === status).length;
  }

  getCompletionPercentage(tasks: Task[]): number {
    if (tasks.length === 0) return 0;
  
    const workingTasks = tasks.filter(task => task.status === 'EN_COURS').length / 2;
    const doneTasks = tasks.filter(task => task.status === 'TERMINE').length;
    return Math.round(((doneTasks + workingTasks) / tasks.length) * 100);
  }
  
}
