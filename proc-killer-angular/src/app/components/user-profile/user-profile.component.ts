import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AppState, BaseState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/models/user-state.model';
import { selectUserState } from 'src/app/store/selectors/app.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  private user$: Observable<UserModel> = this.authService.GetUserData();
  private userState$: Observable<UserState> = this.store.select(selectUserState);
  private levelPercentage: number;
  
  constructor(public authService: AuthService, private store: Store<BaseState>) { }

  ngOnInit() {
    this.store.select(selectUserState).subscribe(state => {
        this.levelPercentage = state.level.currentExp / state.level.requiredExp > 1 ? 1 : state.level.currentExp / state.level.requiredExp;
      }
    );
  }

  getProgressBarStyle() {
    let styles = {
      width: this.levelPercentage * 100 + '%'
    }
    return styles;
  }
}
