import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/store/actions/app.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public activeComponent: string = "list";

  public actiavateComponent(component: string) {
    this.activeComponent = component;
  }

  logOut() {
    this.store.dispatch(logOut());
  }

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public store: Store<AppState>,
  ) { }

  ngOnInit() { }

}
