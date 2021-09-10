import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IList } from '../components/lists/lists.component';
import { ITask } from '../components/tasks/tasks.component';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  url: string = 'http://localhost:3001/lists';
  activeListUrl: string = 'http://localhost:3001/activeList';
  options = { headers: { responseType: 'application/json' } };
  constructor(private http: HttpClient) {}
  getLists(): Observable<IList[]> {
    return this.http.get<IList[]>(this.url);
  }
  addList(list: any): Observable<IList> {
    return this.http.post<IList>(this.url, list, this.options);
  }
  updateList(list: IList, tasks: ITask[]): Observable<IList> {
    return this.http.patch<IList>(`${this.url}/${list.id}`, { tasks: tasks });
  }
  deleteList(id: number): Observable<IList> {
    return this.http.delete<IList>(`${this.url}/${id}`);
  }
}
