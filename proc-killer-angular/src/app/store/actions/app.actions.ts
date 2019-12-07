import { createAction, props } from '@ngrx/store';
import { MeetingPlace } from 'src/app/models/meeting-place.model';
import { UserModel } from 'src/app/models/user.model';
import { Category } from 'src/app/models/category.model';
import { ReverseGeocodingResult } from 'src/app/models/reverse-geocoding.model';
import { SerachPlaceModel } from 'src/app/models/search-place.model';
import { Day } from 'src/app/models/day.model';
import { EventModel } from 'src/app/models/event-model.model';

export const userLoggedIn = createAction('[User] Logged in', props<{ user: UserModel}>());
export const logOut = createAction('[User] Log out');

export const loadCallendar = createAction('[Callendar] Load');
export const callendarLoaded = createAction('[Callendar] Loaded', props<{ callendar: Day[]}>());

export const selectDay = createAction('[Callendar] Select day', props<{ date: Date}>());
export const reloadDay = createAction('[Callendar] Reload day', props<{ date: Date}>());
export const dayReloaded = createAction('[Callendar] Day reloaded', props<{ day: Day}>());
export const showAddTodoWindow = createAction('[Todo] Show add window', props<{ date: Date}>());
export const hideAddTodoWindow = createAction('[Todo] Hide add window');

export const addTodo = createAction('[Todo] Add', props<{ date: Date, title: string, description: string}>());
export const completeTodo = createAction('[Todo] Complete', props<{ id: number, date: Date }>());

export const addTest = createAction('[Todo] Complete');
export const modifyTestData = createAction('[Todo] Complete');

export const loadEvents = createAction('[Event] Load events');
export const eventsLoaded = createAction('[Event] Events loaded', props<{ events: EventModel[]}>());