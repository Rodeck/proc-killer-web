import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { userLoggedIn, logOut, loadCallendar, callendarLoaded, addTodo, hideAddTodoWindow, reloadDay, dayReloaded, completeTodo, loadEvents, eventsLoaded } from '../actions/app.actions';
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
                    this.store.dispatch(reloadDay({ date: action.date }))
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
                this.store.dispatch(loadCallendar());
                this.store.dispatch(loadEvents());
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