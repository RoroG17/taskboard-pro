import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  
  private tasks = [
    { id: 1, title: 'Task 1'},
    { id: 2, title: 'Task 2'},
    { id: 3, title: 'Task 3'},
  ]

  private tasksSubject = new BehaviorSubject(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string) {
    const newTask = { id: Date.now(), title };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);  
  }

  getTasks() {
    return of(this.tasks).pipe(delay(2000));
  }
}
