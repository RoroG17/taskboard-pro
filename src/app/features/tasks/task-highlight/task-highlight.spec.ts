import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskHighlight } from './task-highlight';
import { CommonModule } from '@angular/common';

describe('TaskHighlight', () => {
  let component: TaskHighlight;
  let fixture: ComponentFixture<TaskHighlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskHighlight, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskHighlight);
    component = fixture.componentInstance;

    // Définir les inputs avant detectChanges
    component.title = 'Tâche test';
    component.date = new Date('2026-01-09T10:00:00');
    component.status = 'A_FAIRE';
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('getStatusLabel() devrait renvoyer le bon label', () => {
    expect(component.getStatusLabel()).toBe('À faire');
    component.status = 'EN_COURS';
    expect(component.getStatusLabel()).toBe('En cours');
    component.status = 'TERMINE';
    expect(component.getStatusLabel()).toBe('Terminé');
  });

  it('getStatusClass() devrait renvoyer la bonne classe CSS', () => {
    expect(component.getStatusClass()).toBe('status-a-faire');
    component.status = 'EN_COURS';
    expect(component.getStatusClass()).toBe('status-en-cours');
    component.status = 'TERMINE';
    expect(component.getStatusClass()).toBe('status-termine');
  });
});
