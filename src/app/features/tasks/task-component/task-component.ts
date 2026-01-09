import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { TaskService, Task } from '../../../core/services/task-service';
import { TaskHighlight } from '../task-highlight/task-highlight';

@Component({
  selector: 'app-task-component',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './task-component.html',
  styleUrl: './task-component.css',
})
export class TaskComponent {

  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;

  editingTask: Task | null = null;

  addTask(title: string) {
    if (title.trim()) {
      this.taskService.addTask(title);
    }
  }

  @ViewChild('highlightContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  highlight(task: Task) {
    this.container.clear();
    const ref = this.container.createComponent(TaskHighlight);
    ref.instance.title = task.title;
    ref.instance.date = task.date;
    ref.instance.status = task.status;
  }

  startEdit(task: Task) {
    this.editingTask = { ...task };
  }

  cancelEdit() {
    this.editingTask = null;
  }

  saveEdit() {
    if (!this.editingTask) return;
    const title = this.editingTask.title.trim();
    if (!title) return;

    this.taskService.updateTask(this.editingTask);
    this.editingTask = null;
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  }
}
