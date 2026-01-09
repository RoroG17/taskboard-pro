import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../core/services/task-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private taskService = inject(TaskService);
  tasks$ = this.taskService.getTasks();

  intervalId: any;
  ngOnInit() {
    console.log('Home initialisé');
  }

  ngOnDestroy() {
    console.log('Home détruit');
    clearInterval(this.intervalId);
  }

  addTask(title: string) {
    if (title.trim()) {
      this.taskService.addTask(title);
    }
  }
}