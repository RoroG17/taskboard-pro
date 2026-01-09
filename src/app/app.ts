import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template : `
  <app-header />
  <router-outlet />
  `
})
export class App {
  protected readonly title = signal('taskboard-pro');
}
