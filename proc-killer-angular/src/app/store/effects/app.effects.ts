import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { userLoggedIn, logOut, loadCallendar, callendarLoaded, addTodo, hideAddTodoWindow, reloadDay, dayReloaded, completeTodo, loadEvents, eventsLoaded, loadUnfinished, unfinishedTodoLoaded, completeOverdueTodo, authenticate, loadState, stateLoaded, loadUsers, usersLoaded, loadFriends, friendsLoaded } from '../actions/app.actions';
import { mergeMap, tap, map, catchError, concatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, BaseState } from '../state/app.state';
import { EMPTY } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TodoService } from 'src/app/shared/services/todo.service';

@Injectable()
export class AppEffects {

    loadCallendar$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadCallendar),
            mergeMap((action) => this.todoService.loadCallendar().pipe(
                map(result => this.store.dispatch(callendarLoaded({ callendar: result }))),
                catchError(() => EMPTY)
            )
            )),
        { dispatch: false }
    );

    loadUnfinished$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadUnfinished),
            mergeMap((action) => this.todoService.loadUnfinished().pipe(
                map(result => this.store.dispatch(unfinishedTodoLoaded({ todos: result }))),
                catchError(() => EMPTY)
            )
            )),
        { dispatch: false }
    );
    
    reloadDay$ = createEffect(
        () => this.actions$.pipe(
            ofType(reloadDay),
            mergeMap((action) => this.todoService.loadDay(action.date).pipe(
                map(result => this.store.dispatch(dayReloaded({ day: result }))),
                catchError(() => EMPTY)
            )
            )),
        { dispatch: false }
    );

    addTodo$ = createEffect(
        () => this.actions$.pipe(
            ofType(addTodo),
            mergeMap((action) => this.todoService.addTodo(action.date, action.title, action.description).pipe(
                concatMap(result => [
                    this.store.dispatch(hideAddTodoWindow()),
                    this.store.dispatch(reloadDay({ date: action.date }))
                ]),
                catchError(() => EMPTY)
            )
            )),
        { dispatch: false }
    );

    completeTodo$ = createEffect(
        () => this.actions$.pipe(
            ofType(completeTodo),
            mergeMap((action) => this.todoService.completeTodo(action.id).pipe(
                concatMap(result => [
                    this.store.dispatch(reloadDay({ date: action.date })),
                    this.store.dispatch(loadEvents())
                ]),
                catchError(() => EMPTY)
            )
            )),
        { dispatch: false }
    );

    completeOverdueTodo$ = createEffect(
        () => this.actions$.pipe(
            ofType(completeOverdueTodo),
            mergeMap((action) => this.todoService.completeOverdueTodo(action.id).pipe(
                concatMap(result => [
                    this.store.dispatch(loadUnfinished())
                ]),
                catchError(() => EMPTY)
            )
            )),
        { dispatch: false }
    );

    authenticate$ = createEffect(
        () => this.actions$.pipe(
            ofType(authenticate),
            mergeMap((action) => this.authService.authenticate().pipe(
                concatMap(result => [
                    this.store.dispatch(loadState())
                ]),
                catchError(() => EMPTY)
            )
            )),
        { dispatch: false }
    );


    loadState$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadState),
            mergeMap((action) => this.authService.loadState().pipe(
                concatMap(result => [
                    this.store.dispatch(stateLoaded({ userState: result }))
                ]),
                catchError(() => EMPTY)
            )
            )),
        { dispatch: false }
    );

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadUsers),
            mergeMap((action) => this.authService.loadUsers().pipe(
                concatMap(result => [
                    this.store.dispatch(usersLoaded({ users: result }))
                ]),
                catchError(() => EMPTY)
            )
            )),
        { dispatch: false }
    );

    loadFriends$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadFriends),
            mergeMap((action) => this.authService.getFriends().pipe(
                concatMap(result => [
                    this.store.dispatch(friendsLoaded({ friends: result }))
                ]),
                catchError(() => EMPTY)
            )
            )),
        { dispatch: false }
    );

    userLogged$ = createEffect(
        () => this.actions$.pipe(
            ofType(userLoggedIn),
            tap(() => {
                this.store.dispatch(authenticate());
                this.store.dispatch(loadCallendar());
                this.store.dispatch(loadEvents());
                this.store.dispatch(loadUnfinished());
                this.store.dispatch(loadUsers());
                this.store.dispatch(loadFriends());
            })
        ),
        { dispatch: false }
    );


    logOut$ = createEffect(
        () => this.actions$.pipe(
            ofType(logOut),
            tap(() => {
                this.authService.SignOut();
            })
        ),
        { dispatch: false }
    );

    loadEvents$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadEvents),
            mergeMap((action) => this.todoService.loadEvents().pipe(
                map(result => this.store.dispatch(eventsLoaded({ events: result }))),
                catchError(() => EMPTY)
            )
            )),
        { dispatch: false }
    );
    
    constructor(
        private actions$: Actions,
        private store: Store<BaseState>,
        private authService: AuthService,
        private todoService: TodoService,
    ) { }
}