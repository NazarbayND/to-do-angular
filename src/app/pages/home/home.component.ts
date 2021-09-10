import { Component, OnInit } from '@angular/core';
import { IList } from 'src/app/components/lists/lists.component';
import { ITask } from 'src/app/components/tasks/tasks.component';
import { ListsService } from 'src/app/services/lists.service';
let id = 9;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  lists: IList[] = [];
  activeList: IList = {
    id: 0,
    title: '',
    tasks: [],
  };

  constructor(private service: ListsService) {}
  ngOnInit(): void {
    this.service.getLists().subscribe((lists) => {
      this.lists = lists;
      this.activeList = this.lists[0];
    });
  }
  handleListSelect(list: IList): void {
    this.activeList = list;
  }
  handleListAdd(list: string): void {
    const newList = {
      title: list,
      tasks: [],
    };
    this.service.addList(newList).subscribe((list) => this.lists.push(list));
  }
  handleListDelete(id: number): void {
    this.service.deleteList(id).subscribe((list) => {
      this.lists = this.lists.filter((t) => t.id !== id);
      if (this.activeList?.id === id) this.activeList = this.lists[0] || null;
    });
  }
  handleTaskAdd(task: string): void {
    const newTask: ITask = {
      id: ++id,
      title: task,
      isDone: false,
    };
    this.activeList.tasks.push(newTask);
    this.changeActiveListTasks(this.activeList.tasks);
  }
  handleTaskDelete(id: number): void {
    const newActiveListTasks = this.activeList.tasks.filter((t) => t.id !== id);
    this.changeActiveListTasks(newActiveListTasks);
  }

  handleTaskDone(id: number): void {
    const newActiveListTasks = this.activeList.tasks.map((t) =>
      t.id === id ? { ...t, isDone: !t.isDone } : t
    );
    this.changeActiveListTasks(newActiveListTasks);
  }

  changeActiveListTasks(tasks: ITask[]): void {
    this.service.updateList(this.activeList, tasks).subscribe((list) => {
      this.activeList = list;
    });
  }
}
