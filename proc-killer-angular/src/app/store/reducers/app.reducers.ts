import { createReducer, on, Action, ActionReducerMap } from "@ngrx/store";
import { initialState, AppState, BaseState } from '../state/app.state';
import { userLoggedIn, logOut, callendarLoaded, selectDay, showAddTodoWindow, hideAddTodoWindow, dayReloaded, addTest, modifyTestData, eventsLoaded, unfinishedTodoLoaded, stateLoaded, usersLoaded, friendsLoaded } from '../actions/app.actions';
import * as moment from 'moment';
import { Day } from 'src/app/models/day.model';

const _appReducer = createReducer(initialState,
    on(userLoggedIn, (state: AppState, { user }) => 
    ({
        ...state,
        user: user
    })),
    on(logOut, (state: AppState, { }) => 
    ({
        ...state,
        user: null
    })),
    on(callendarLoaded, (state: AppState, { callendar }) => 
    ({
        ...state,
        callendar: callendar
    })),
    on(selectDay, (state: AppState, { date }) => 
    ({
        ...state,
        selectedDay: state.callendar ? state.callendar.find(d => moment(d.date).isSame(moment(date), 'day')) : null
    })),
    on(showAddTodoWindow, (state: AppState, { date }) => 
    ({
        ...state,
        addTodoDate: date
    })),
    on(hideAddTodoWindow, (state: AppState, { }) => 
    ({
        ...state,
        addTodoDate: null
    })),
    on(dayReloaded, (state: AppState, { day }) => 
    ({
        ...state,
        callendar: copyCallendar(state.callendar, day),
        lastAddTodoDate: new Date(),
        selectedDay: state.selectedDay !== null ? day.date === state.selectedDay.date ? day : state.selectedDay : null
    })),
    on(eventsLoaded, (state: AppState, { events }) => 
    ({
        ...state,
        events: events
    })),
    on(unfinishedTodoLoaded, (state: AppState, { todos }) => 
    ({
        ...state,
        unfinishedTodos: todos
    })),
    on(stateLoaded, (state: AppState, { userState }) => 
    ({
        ...state,
        userState: userState
    })),
    on(usersLoaded, (state: AppState, { users }) => 
    ({
        ...state,
        users: users
    })),
    on(friendsLoaded, (state: AppState, { friends }) => 
    ({
        ...state,
        friends: friends
    })),
);

function copyCallendar(callendar: Day[], replacement: Day): Day[] {
    let result: Day[] = [];
    callendar.forEach(element => {
        if (element.date === replacement.date)
            result.push(copyDay(replacement));
        else
            result.push(element);
    });

    return result;
}

function copyDay(from: Day): Day {
    return {
        allCompleted: from.allCompleted,
        date: from.date,
        todos: from.todos.map(x => {
            return {
                id: x.id,
                regdate: x.regdate,
                finishTime: x.finishTime, 
                targetDate: x.targetDate,
                completed: x.completed,
                name: x.name,
                description: x.description,
            }
         })
    }
} 

export function reducer(state: AppState | undefined, action: Action) {
    return _appReducer(state, action);
}

export const appReducers: ActionReducerMap<BaseState, any> = {
    appState: reducer,
}