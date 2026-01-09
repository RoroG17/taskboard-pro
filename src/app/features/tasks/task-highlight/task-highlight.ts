import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskStatus } from '../../../core/services/task-service';

@Component({
  selector: 'app-task-highlight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-highlight.html',
  styleUrls: ['./task-highlight.css'],
})
export class TaskHighlight {
  @Input() title: string = '';
  @Input() date: string | Date = new Date();
  @Input() status: TaskStatus = 'A_FAIRE';

  getStatusLabel() {
    switch (this.status) {
      case 'A_FAIRE': return 'À faire';
      case 'EN_COURS': return 'En cours';
      case 'TERMINE': return 'Terminé';
      default: return '';
    }
  }

  getStatusClass() {
    switch (this.status) {
      case 'A_FAIRE': return 'status-a-faire';
      case 'EN_COURS': return 'status-en-cours';
      case 'TERMINE': return 'status-termine';
      default: return '';
    }
  }
}
