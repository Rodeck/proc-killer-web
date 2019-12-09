import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Day, Todo } from 'src/app/models/day.model';
import { AppState, BaseState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { selectCallendar, selectSelectedDay, selectAddTodoDate, selectCurrentWeek, lastAddTodoDate, selectCurrentDayTodos, selectUnfinished } from 'src/app/store/selectors/app.selectors';
import { map, defaultIfEmpty } from 'rxjs/operators';
import { selectDay, showAddTodoWindow, hideAddTodoWindow, completeTodo, addTest, modifyTestData, completeOverdueTodo } from 'src/app/store/actions/app.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { DateService } from 'src/app/shared/services/date.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  callendar$: Observable<Day[]> = this.store.select(selectCurrentWeek);
  selectedDay$: Observable<Day> = this.store.select(selectSelectedDay);
  selectedDayTodos$: Observable<Todo[]> = this.store.select(selectCurrentDayTodos);
  date$: Observable<Date> = this.store.select(lastAddTodoDate);
  unfinished$: Observable<Todo[]> = this.store.select(selectUnfinished);
  anyUnfinished$ =  this.unfinished$.pipe(
    map(todos => todos.length > 0),
    defaultIfEmpty(false)
  );

  selectDay(date: Date) {
    this.store.dispatch(hideAddTodoWindow());
    this.store.dispatch(selectDay({ date: date }));
  }

  constructor(
    private store: Store<BaseState>,
    private modalService: NgbModal,
    private dateService: DateService,
  ) { }

  ngOnInit() {
    this.store.dispatch(selectDay({ date: new Date() }))

    this.store.select(selectAddTodoDate).subscribe(x => {
      if (x !== null)
      {
        this.modalService.open(AddTodoComponent, {size: 'xl', beforeDismiss: () => {
          this.store.dispatch(hideAddTodoWindow());
          return true;
        }}); 
      }
    })

    this.selectedDayTodos$.subscribe(x => {
      console.log(x);
    });
  }

  addTodo(date: Date) {
    this.store.dispatch(showAddTodoWindow({date: date}));
  }

  toggleTodo(todo: Todo) {
    if (!todo.completed)
      this.store.dispatch(completeTodo({ id: todo.id, date: todo.targetDate }));
  }

  finishOverdue(todoId: number) {
    this.store.dispatch(completeOverdueTodo({ id: todoId }));
  }

  countCompleted(todos: Todo[]) {
    return todos.filter(x => x.completed).length;
  }
}
