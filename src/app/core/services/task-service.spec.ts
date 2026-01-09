import { TestBed } from '@angular/core/testing';
import { TaskService, Task } from './task-service';
import { take } from 'rxjs/operators';

import "zone.js";

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial tasks', (done) => {
    service.tasks$.pipe(take(1)).subscribe(tasks => {
      expect(tasks.length).toBe(4);
      done();
    });
  });

  it('should add a new task', (done) => {
    service.addTask('Nouvelle tâche');
    service.tasks$.pipe(take(1)).subscribe(tasks => {
      const addedTask = tasks.find(t => t.title === 'Nouvelle tâche');
      expect(addedTask).toBeTruthy();
      expect(addedTask?.status).toBe('A_FAIRE');
      expect(tasks.length).toBe(5);
      done();
    });
  });

  it('should add a new task with custom status', (done) => {
    service.addTask('Tâche EN_COURS', 'EN_COURS');
    service.tasks$.pipe(take(1)).subscribe(tasks => {
      const task = tasks.find(t => t.title === 'Tâche EN_COURS');
      expect(task).toBeTruthy();
      expect(task?.status).toBe('EN_COURS');
      done();
    });
  });

  it('should update a task', (done) => {
    const taskToUpdate: Task = { id: 1, title: 'Roadmap modifiée', date: new Date(), status: 'EN_COURS' };
    service.updateTask(taskToUpdate);

    service.tasks$.pipe(take(1)).subscribe(tasks => {
      const updated = tasks.find(t => t.id === 1);
      expect(updated).toBeTruthy();
      expect(updated?.title).toBe('Roadmap modifiée');
      expect(updated?.status).toBe('EN_COURS');
      done();
    });
  });

  it('should delete a task', (done) => {
    service.deleteTask(2);

    service.tasks$.pipe(take(1)).subscribe(tasks => {
      const deleted = tasks.find(t => t.id === 2);
      expect(deleted).toBeUndefined();
      expect(tasks.length).toBe(3); // initial 4 - 1
      done();
    });
  });
});
