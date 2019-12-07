import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseState } from 'src/app/store/state/app.state';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/models/event-model.model';
import { selectEvents, selectTopEvents } from 'src/app/store/selectors/app.selectors';
import { DateService } from 'src/app/shared/services/date.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events$: Observable<EventModel[]> = this.store.select(selectTopEvents);

  constructor(
    private store: Store<BaseState>,
    private dateService: DateService)
  { }

  ngOnInit() {
  }

}
