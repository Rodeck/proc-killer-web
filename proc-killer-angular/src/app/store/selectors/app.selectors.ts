import { createSelector } from '@ngrx/store';
import { AppState, BaseState } from '../state/app.state';
import { MeetingPlace } from 'src/app/models/meeting-place.model';
import { Category } from 'src/app/models/category.model';
import { Day, Todo } from 'src/app/models/day.model';
import * as moment from 'moment';
import { EventModel } from 'src/app/models/event-model.model';

export const selectState = (state: BaseState): AppState => state.appState;

export const selectAppState = createSelector(
    selectState,
    (app: AppState): AppState => app
);

export const selectCallendar = createSelector(
    selectState,
    (app: AppState): Day[] => app.callendar
);

export const selectCurrentDayTodos = createSelector(
    selectState,
    (app: AppState): Todo[] => app.selectedDay ? app.selectedDay.todos : []
);

export const selectCurrentWeek = createSelector(
    selectState,
    (app: AppState): Day[] => app.callendar ? app.callendar.filter(d => {
        let today = moment();
        let date = moment(d.date);
        let diff = date.diff(today, 'days');
        return today.isSame(date, 'day') ||
          (diff >= 0 && diff < 7);
      }) : []
);

export const selectSelectedDay = createSelector(
    selectState,
    (app: AppState): Day => app.selectedDay
);

export const selectAddTodoDate = createSelector(
    selectState,
    (app: AppState): Date => app.addTodoDate
);

export const lastAddTodoDate = createSelector(
    selectState,
    (app: AppState): Date => app.lastAddTodoDate
);

export const selectEvents = createSelector(
    selectState,
    (app: AppState): EventModel[] => app.events
);

export const selectTopEvents = createSelector(
    selectState,
    (app: AppState): EventModel[] => app.events.slice(0, 10)
);
