import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormInput } from '../form/form.component';
export interface ITask {
  id: number;
  title: string;
  isDone: boolean;
}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() tasks: ITask[] | null = [];
  @Output() deleteTask = new EventEmitter<number>();
  @Output() doneTask = new EventEmitter<number>();
  @Output() addTask = new EventEmitter<string>();

  formInput: IFormInput = {
    placeholder: 'write what to do',
    btn: 'Add Task',
  };

  constructor() {}
  taskDelete(id: number): void {
    this.deleteTask.emit(id);
  }
  onAddTask(task: string): void {
    this.addTask.emit(task);
  }
  handleIsDone(id: number): void {
    this.doneTask.emit(id);
  }

  ngOnInit(): void {}
}
