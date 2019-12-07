import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AppState, BaseState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { selectAddTodoDate } from 'src/app/store/selectors/app.selectors';
import { DateService } from 'src/app/shared/services/date.service';
import { addTodo } from 'src/app/store/actions/app.actions';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  date$: Observable<Date> = this.store.select(selectAddTodoDate);
  title: string = '';
  description: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<BaseState>,
    private dateService: DateService,
  ) { }

  ngOnInit() {
  }

  addTodo(date: Date) {
      this.store.dispatch(addTodo({ 
      date: date, 
      title: this.title,
      description: this.description
    }));
  }

}
