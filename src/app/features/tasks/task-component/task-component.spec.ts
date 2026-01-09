import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task-component';
import { TaskService, Task, TaskStatus } from '../../../core/services/task-service';
import { of } from 'rxjs';
import { ViewContainerRef, ComponentRef } from '@angular/core';
import { TaskHighlight } from '../task-highlight/task-highlight';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let mockTaskService: Partial<TaskService>;

  beforeEach(async () => {
    mockTaskService = {
      tasks$: of([
        { id: 1, title: 'Tâche 1', date: new Date(), status: 'A_FAIRE' } as Task,
        { id: 2, title: 'Tâche 2', date: new Date(), status: 'EN_COURS' } as Task
      ]),
      addTask: jasmine.createSpy('addTask'),
      updateTask: jasmine.createSpy('updateTask'),
      deleteTask: jasmine.createSpy('deleteTask')
    };

    await TestBed.configureTestingModule({
      imports: [TaskComponent, CommonModule, DatePipe],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} }, params: of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;

    // Mock du ViewContainerRef pour highlight()
    const mockContainer = {
      clear: jasmine.createSpy('clear'),
      createComponent: jasmine.createSpy('createComponent').and.returnValue({
        instance: { title: '', date: new Date(), status: 'A_FAIRE' }
      } as ComponentRef<TaskHighlight>)
    } as unknown as ViewContainerRef;

    component['container'] = mockContainer;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a task', () => {
    component.addTask('Nouvelle tâche');
    expect(mockTaskService.addTask).toHaveBeenCalledWith('Nouvelle tâche');
  });

  it('should not add a task with empty title', () => {
    component.addTask('   ');
    expect(mockTaskService.addTask).not.toHaveBeenCalled();
  });

  it('should start edit', () => {
    const task: Task = { id: 1, title: 'T1', date: new Date(), status: 'A_FAIRE' };
    component.startEdit(task);
    expect(component.editingTask).toEqual(task);
  });

  it('should cancel edit', () => {
    component.editingTask = { id: 1, title: 'T1', date: new Date(), status: 'A_FAIRE' };
    component.cancelEdit();
    expect(component.editingTask).toBeNull();
  });

  it('should save edit and call updateTask', () => {
    const task: Task = { id: 1, title: 'T1', date: new Date(), status: 'A_FAIRE' };
    component.editingTask = { ...task, title: 'T1 modifiée' };
  
    component.saveEdit();
  
    expect(mockTaskService.updateTask).toHaveBeenCalledWith(jasmine.objectContaining({
      id: 1,
      title: 'T1 modifiée',
      status: 'A_FAIRE'
    }));
    expect(component.editingTask).toBeNull();
  });

  it('should not save edit if title is empty', () => {
    component.editingTask = { id: 1, title: '   ', date: new Date(), status: 'A_FAIRE' };
    component.saveEdit();
    expect(mockTaskService.updateTask).not.toHaveBeenCalled();
    expect(component.editingTask).not.toBeNull();
  });

  it('should delete a task', () => {
    const task: Task = { id: 1, title: 'T1', date: new Date(), status: 'A_FAIRE' };
    component.deleteTask(task);
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith(task.id);
  });
});
