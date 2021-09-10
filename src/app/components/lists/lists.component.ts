import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormInput } from '../form/form.component';
import { ITask } from '../tasks/tasks.component';
export interface IList {
  id: number;
  title: string;
  tasks: ITask[];
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  @Input() lists: IList[] = [];
  @Input() activeList: IList | null = null;
  @Output() selectList = new EventEmitter<IList>();
  @Output() deleteList = new EventEmitter<number>();
  @Output() addList = new EventEmitter<string>();

  formInput: IFormInput = {
    placeholder: 'type to add new list',
    btn: 'Add List',
  };

  constructor() {}
  onDelete(id: number): void {
    this.deleteList.emit(id);
  }
  onAddList(list: string): void {
    this.addList.emit(list);
  }
  onListSelect(list: IList): void {
    this.selectList.emit(list);
  }

  ngOnInit(): void {}
}
