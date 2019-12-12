import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUserDetails } from 'src/app/models/app-user.model';
import { BaseState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { selectAppUserDetails } from 'src/app/store/selectors/app.selectors';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-app-user-profile',
  templateUrl: './app-user-profile.component.html',
  styleUrls: ['./app-user-profile.component.css']
})
export class AppUserProfileComponent implements OnInit {

  user$: Observable<AppUserDetails> = this.store.select(selectAppUserDetails);
  private levelPercentage: number;

  constructor(private store: Store<BaseState>,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.store.select(selectAppUserDetails).subscribe(user => {
        if (user)
          this.levelPercentage = user.state.level.currentExp / user.state.level.requiredExp > 1 ? 1 : user.state.level.currentExp / user.state.level.requiredExp;
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
