import { createAction, props } from '@ngrx/store';
import { MeetingPlace } from 'src/app/models/meeting-place.model';
import { UserModel } from 'src/app/models/user.model';
import { Category } from 'src/app/models/category.model';
import { ReverseGeocodingResult } from 'src/app/models/reverse-geocoding.model';
import { SerachPlaceModel } from 'src/app/models/search-place.model';
import { Day, Todo } from 'src/app/models/day.model';
import { EventModel } from 'src/app/models/event-model.model';
import { UserState } from 'src/app/models/user-state.model';
import { AppUser, AppUserDetails } from 'src/app/models/app-user.model';
import { Invitation } from 'src/app/models/invitation.model';

export const userLoggedIn = createAction('[User] Logged in', props<{ user: UserModel}>());
export const logOut = createAction('[User] Log out');
export const authenticate = createAction('[User] Authenticate');
export const authenticated = createAction('[User] Authenticated');

export const loadCallendar = createAction('[Callendar] Load');
export const callendarLoaded = createAction('[Callendar] Loaded', props<{ callendar: Day[]}>());

export const loadState = createAction('[User] Load state');
export const stateLoaded = createAction('[User] State loaded', props<{ userState: UserState}>());

export const selectDay = createAction('[Callendar] Select day', props<{ date: Date}>());
export const reloadDay = createAction('[Callendar] Reload day', props<{ date: Date}>());
export const dayReloaded = createAction('[Callendar] Day reloaded', props<{ day: Day}>());
export const showAddTodoWindow = createAction('[Todo] Show add window', props<{ date: Date}>());
export const hideAddTodoWindow = createAction('[Todo] Hide add window');

export const addTodo = createAction('[Todo] Add', props<{ date: Date, title: string, description: string}>());
export const completeTodo = createAction('[Todo] Complete', props<{ id: number, date: Date }>());
export const completeOverdueTodo = createAction('[Todo] Complete overdue', props<{ id: number }>());

export const addTest = createAction('[Todo] Complete');
export const modifyTestData = createAction('[Todo] Complete');

export const loadEvents = createAction('[Event] Load events');
export const eventsLoaded = createAction('[Event] Events loaded', props<{ events: EventModel[]}>());

export const loadUnfinished = createAction('[Todo] Load unfinished');
export const unfinishedTodoLoaded = createAction('[Todo] Unfinished todo loaded', props<{ todos: Todo[]}>());

export const loadUsers = createAction('[User] Load users');
export const usersLoaded = createAction('[User] Users loaded', props<{ users: AppUser[] }>());

export const loadFriends = createAction('[User] Load friends');
export const friendsLoaded = createAction('[User] Friends loaded', props<{ friends: AppUser[] }>());

export const loadInvitations = createAction('[User] Load invitations');
export const invitationsLoaded = createAction('[User] Invitations loaded', props<{ invitaions: Invitation[] }>());

export const inviteFriend = createAction('[User] Invite friend', props<{ invitedId: string }>());

export const acceptInvitation = createAction('[User] Accept invitation', props<{ invitationId: number, inviterId: string }>());
export const rejectInvitation = createAction('[User] Reject invitation', props<{ invitationId: number, inviterId: string }>());

export const showAppUserDetails = createAction('[User] Show user details', props<{ userId: string }>());
export const userDetailsLoaded = createAction('[User] User details loaded', props<{ user: AppUserDetails }>());
export const hideAppUserDetails = createAction('[User] Hide user details');

