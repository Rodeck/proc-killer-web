import { UserModel } from 'src/app/models/user.model';
import { MeetingPlace } from 'src/app/models/meeting-place.model';
import { Category } from 'src/app/models/category.model';
import { Day } from 'src/app/models/day.model';
import { EventModel } from 'src/app/models/event-model.model';

export interface AppState {
    user: UserModel;
    callendar: Day[];
    selectedDay?: Day;
    addTodoDate?: Date;
    lastAddTodoDate: Date;
    events?: EventModel[];
};

export const initialState: AppState = retrieveState() !== null ? retrieveState() : 
{
    user: null,
    callendar: null,
    lastAddTodoDate: new Date(),
};

export const initalBaseState: BaseState = {
    appState: initialState,
}

function retrieveState(): AppState {
    return JSON.parse(localStorage.getItem('state'));
}

export interface BaseState {
    appState: AppState;
};