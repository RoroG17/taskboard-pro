import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { TaskService, Task } from '../../../core/services/task-service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import "zone.js";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockTaskService: Partial<TaskService>;

  beforeEach(async () => {
    mockTaskService = {
      tasks$: of([
        { id: 1, title: 'Tâche 1', status: 'A_FAIRE', date: new Date() } as Task,
        { id: 2, title: 'Tâche 2', status: 'EN_COURS', date: new Date() } as Task,
        { id: 3, title: 'Tâche 3', status: 'TERMINE', date: new Date() } as Task
      ])
    };
  
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, CommonModule, FormsModule],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} }, params: of({}) } }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have tasks$ observable', (done) => {
    component.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(3);
      done();
    });
  });

  it('should return correct status labels', () => {
    expect(component.getStatusLabel('A_FAIRE')).toBe('À faire');
    expect(component.getStatusLabel('EN_COURS')).toBe('En cours');
    expect(component.getStatusLabel('TERMINE')).toBe('Terminé');
  });

  it('should return correct status classes', () => {
    expect(component.getStatusClass('A_FAIRE')).toBe('status-a-faire');
    expect(component.getStatusClass('EN_COURS')).toBe('status-en-cours');
    expect(component.getStatusClass('TERMINE')).toBe('status-termine');
  });

  it('should count tasks correctly', () => {
    const tasks: Task[] = [
      { id: 1, title: 'T1', status: 'A_FAIRE', date: new Date() } as Task,
      { id: 2, title: 'T2', status: 'EN_COURS', date: new Date() } as Task,
      { id: 3, title: 'T3', status: 'TERMINE', date: new Date() } as Task,
      { id: 4, title: 'T4', status: 'A_FAIRE', date: new Date() } as Task
    ];

    expect(component.countTasks(tasks, 'A_FAIRE')).toBe(2);
    expect(component.countTasks(tasks, 'EN_COURS')).toBe(1);
    expect(component.countTasks(tasks, 'TERMINE')).toBe(1);
  });

  it('should calculate completion percentage correctly', () => {
    const tasks: Task[] = [
      { id: 1, title: 'T1', status: 'A_FAIRE', date: new Date() } as Task,
      { id: 2, title: 'T2', status: 'EN_COURS', date: new Date() } as Task,
      { id: 3, title: 'T3', status: 'TERMINE', date: new Date() } as Task,
      { id: 4, title: 'T4', status: 'EN_COURS', date: new Date() } as Task
    ];

    // EN_COURS compté à moitié + TERMINE
    // (2 EN_COURS * 0.5 + 1 TERMINE) / 4 = (1 + 1) / 4 = 0.5 → 50%
    expect(component.getCompletionPercentage(tasks)).toBe(50);

    // 0 tasks → 0%
    expect(component.getCompletionPercentage([])).toBe(0);
  });

});
