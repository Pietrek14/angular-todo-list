import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { TaskStoreService } from './task-store.service';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  providers: [TaskStoreService],
  template: `
  <h2>Zadania</h2>
  <app-task-list [tasks]="inProgressTasks()" />
  <h2>Ukończone</h2>
  <app-task-list [tasks]="doneTasks()" [in_progress]="false" />
  `,
})
export class App {
  name = 'Angular';

  constructor(private taskStore: TaskStoreService) {}

  inProgressTasks() {
    return this.taskStore.in_progress;
  }

  doneTasks() {
    return this.taskStore.done;
  }
}

bootstrapApplication(App);
