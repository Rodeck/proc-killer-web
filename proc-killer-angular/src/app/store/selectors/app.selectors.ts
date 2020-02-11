import { createSelector } from '@ngrx/store';
import { AppState, BaseState } from '../state/app.state';
import { MeetingPlace } from 'src/app/models/meeting-place.model';
import { Category } from 'src/app/models/category.model';
import { Day, Todo } from 'src/app/models/day.model';
import * as moment from 'moment';
import { EventModel } from 'src/app/models/event-model.model';
import { UserState } from 'src/app/models/user-state.model';
import { AppUser, AppUserDetails } from 'src/app/models/app-user.model';
import { Invitation } from 'src/app/models/invitation.model';
import { RankingPlace } from 'src/app/models/ranking-place.model';

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

export const isLoading = createSelector(
    selectState,
    (app: AppState): boolean => app.loadAmount ? app.loadAmount > 0 : false
);

export const selectSelectedDayDate = createSelector(
    selectState,
    (app: AppState): Date => app.selectedDay ? app.selectedDay.date : null
);

export const displayAddTodoWindow = createSelector(
    selectState,
    (app: AppState): boolean => app.showAddTodoWindow ? app.showAddTodoWindow : false
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
    (app: AppState): EventModel[] => app.events.sort((a, b) => { 
        return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
    }).slice(0, 10)
);

export const selectUnfinished = createSelector(
    selectState,
    (app: AppState): Todo[] => app.unfinishedTodos
);

export const selectUserState = createSelector(
    selectState,
    (app: AppState): UserState => app.userState
);

export const selectUsers = createSelector(
    selectState,
    (app: AppState): AppUser[] => app.users
);

export const selectFriends = createSelector(
    selectState,
    (app: AppState): AppUser[] => app.friends
);

export const selectInvitations = createSelector(
    selectState,
    (app: AppState): Invitation[] => app.invitations
);

export const selectInvitationsCount = createSelector(
    selectState,
    (app: AppState): number => app.invitations ? app.invitations.length : 0
);

export const selectAppUserDetails = createSelector(
    selectState,
    (app: AppState): AppUserDetails => app.userDetails
);

export const selectRanking = createSelector(
    selectState,
    (app: AppState): RankingPlace[] => app.ranking
);
