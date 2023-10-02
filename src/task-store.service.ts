import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable()
export class TaskStoreService {
  in_progress: Task[] = [];
  done: Task[] = [];

  constructor() {}

  addTask(task: Task) {
    this.in_progress.push(task);
  }

  editTask(index: number, new_task: Task) {
    this.in_progress[index] = new_task;
  }

  markAsDone(index: number) {
    if (this.in_progress.length <= index) return;

    this.done.push(this.in_progress.splice(index, 1)[0]);
  }

  delete(index: number) {
    this.in_progress.splice(index);
  }
}
