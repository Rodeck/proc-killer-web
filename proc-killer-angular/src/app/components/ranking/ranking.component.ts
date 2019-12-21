import { Component, OnInit } from '@angular/core';
import { RankingPlace } from 'src/app/models/ranking-place.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { BaseState } from 'src/app/store/state/app.state';
import { selectRanking } from 'src/app/store/selectors/app.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppUserProfileComponent } from '../app-user-profile/app-user-profile.component';
import { hideAppUserDetails, showAppUserDetails } from 'src/app/store/actions/app.actions';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

  ranking$: Observable<RankingPlace[]> = this.store.select(selectRanking);

  constructor(private store: Store<BaseState>,
    private modalService: NgbModal,
    private authService: AuthService) {  
  }

  showUserDetails(userId: string) {
    console.log("showUserDetails");
    this.modalService.open(AppUserProfileComponent, {size: 'xl', beforeDismiss: () => {
      this.store.dispatch(hideAppUserDetails());
      return true;
    }});
    this.store.dispatch(showAppUserDetails({ userId: userId }));
  }

}
