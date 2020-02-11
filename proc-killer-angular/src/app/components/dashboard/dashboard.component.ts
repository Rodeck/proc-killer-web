import { Component, OnInit, NgZone } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { Observable } from 'rxjs';
import { BaseState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/store/actions/app.actions';
import { selectInvitationsCount, isLoading } from 'src/app/store/selectors/app.selectors';
import { slideInAnimation } from 'src/app/animations';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class DashboardComponent {

  public activeComponent: string = "profile";
  friendsCount$: Observable<number> = this.store.select(selectInvitationsCount);
  isLoading$: Observable<boolean> = this.store.select(isLoading);

  logOut() {
    this.store.dispatch(logOut());
  }

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public store: Store<BaseState>,
  ) { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
