import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Day } from 'src/app/models/day.model';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/models/event-model.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url: string = this.baseUrl + "Users/"

  constructor(
    private http: HttpClient, 
    @Inject("BASE_URL") private baseUrl: string
  ) { }

  loadCallendar(): Observable<Day[]> {
    return this.http.get<Day[]>(this.url + 'getCallendar');
  }

  loadDay(date: Date): Observable<Day> {
    return this.http.post<Day>(this.url + 'getDay', {
      date: date
    });
  }

  completeTodo(id: number) {
    return this.http.post(this.baseUrl + 'Todo/MarkCompleted?id=' + id, {
    });
  }

  addTodo(date: Date, title: string, description: string) {
    return this.http.post(this.baseUrl + 'Todo/AddTodo', {
      name: title,
      description: description,
      targetDate: date,
    });
  }

  loadEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.url + 'getEvents');
  }
}
