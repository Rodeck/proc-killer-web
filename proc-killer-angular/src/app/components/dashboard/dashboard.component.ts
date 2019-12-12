import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { BaseState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/store/actions/app.actions';
import { selectInvitationsCount } from 'src/app/store/selectors/app.selectors';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public activeComponent: string = "profile";
  friendsCount$: Observable<number> = this.store.select(selectInvitationsCount);

  public actiavateComponent(component: string) {
    this.activeComponent = component;
  }

  logOut() {
    this.store.dispatch(logOut());
  }

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public store: Store<BaseState>,
  ) { }

  ngOnInit() { }

}
