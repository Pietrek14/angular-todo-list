import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskStoreService } from '../task-store.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
})
export class TaskListComponent implements OnInit {
  @Input()
  tasks: Task[] = [];
  @Input()
  in_progress = true;

  currently_edited: number | null = null;

  edit_name = new FormControl('');
  edit_date = new FormControl(new Date());

  constructor(private task_store: TaskStoreService) {}

  ngOnInit() {}

  markAsDone(taskIndex: number) {
    this.task_store.markAsDone(taskIndex);
  }

  delete(taskIndex: number) {
    this.task_store.delete(taskIndex);
  }

  edit(index: number) {
    this.currently_edited = index;

    this.edit_name.setValue(this.tasks[index].name);
    this.edit_date.setValue(this.tasks[index].date);
  }

  finish_edit() {
    const edited = this.currently_edited || 0;
    this.currently_edited = null;

    this.tasks[edited].name = this.edit_name.value || '';
    this.tasks[edited].date = this.edit_date.value || new Date();

    this.task_store.editTask(edited, this.tasks[edited]);
  }

  add() {
    const name = 'nowe zadanie';
    const date = new Date();

    this.task_store.addTask(new Task(name, date));

    this.currently_edited = this.tasks.length - 1;

    console.log(this.currently_edited);

    this.edit_name.setValue(name);
    this.edit_date.setValue(date);
  }
}
