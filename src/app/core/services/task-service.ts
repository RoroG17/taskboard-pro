import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export type TaskStatus = 'A_FAIRE' | 'EN_COURS' | 'TERMINE';

export interface Task {
  id: number;
  title: string;
  date: Date;
  status: TaskStatus;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  
  private tasks: Task[] = [
    { id: 1, title: 'Préparer la roadmap', date: new Date(), status: 'A_FAIRE' },
    { id: 2, title: 'Implémenter TaskBoard Pro', date: new Date(), status: 'EN_COURS' },
    { id: 3, title: 'Relire le code', date: new Date("2004-04-17"), status: 'TERMINE' },
    { id: 4, title: 'Test', date: new Date(), status: 'A_FAIRE' },
  ];

  private tasksSubject = new BehaviorSubject(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string, status: TaskStatus = 'A_FAIRE') {
    const newTask: Task = {
      id: Date.now(),
      title,
      date: new Date(),
      status,
    };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }

  getTasks() {
    return of(this.tasks).pipe(delay(2000));
  }

  updateTask(updated: Task) {
    this.tasks = this.tasks.map((t) => (t.id === updated.id ? { ...updated } : t));
    this.tasksSubject.next(this.tasks);
  }

  /** Suppression d'une tâche */
  deleteTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.tasksSubject.next(this.tasks);
  }
}
