import { Component, OnInit } from '@angular/core';
import { BaseState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app-user.model';
import { selectUsers, selectFriends, selectInvitations, selectInvitationsCount, selectAppUserDetails } from 'src/app/store/selectors/app.selectors';
import { inviteFriend, acceptInvitation, rejectInvitation, showAppUserDetails, hideAppUserDetails } from 'src/app/store/actions/app.actions';
import { Invitation } from 'src/app/models/invitation.model';
import { DateService } from 'src/app/shared/services/date.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppUserProfileComponent } from '../app-user-profile/app-user-profile.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  users$: Observable<AppUser[]> = this.store.select(selectUsers);
  friends$: Observable<AppUser[]> = this.store.select(selectFriends);
  invitations$: Observable<Invitation[]> = this.store.select(selectInvitations);
  invitationsCount$: Observable<number> = this.store.select(selectInvitationsCount);
  friendsList: number;

  constructor(
    private store: Store<BaseState>,
    private dateService: DateService,
    private modalService: NgbModal) {
      this.friends$.subscribe(f => {
        this.friendsList = f.length;
      });
  }

  showUserDetails(userId: string) {
    console.log("showUserDetails");
    this.store.dispatch(showAppUserDetails({ userId: userId }));
  }

  inviteFriend(userId: string)
  {
    this.store.dispatch(inviteFriend({ invitedId: userId }));
  }

  acceptInvitation(invitationId: number, inviterId: string) {
    this.store.dispatch(acceptInvitation({ invitationId: invitationId, inviterId: inviterId }));
  }

  rejectInvitation(invitationId: number, inviterId: string) {
    this.store.dispatch(rejectInvitation({ invitationId: invitationId, inviterId: inviterId }));
  }

  ngOnInit() {
    this.store.select(selectAppUserDetails).subscribe(x => {
      if (x != null)
      {
        console.log("Open modal.");
        this.modalService.open(AppUserProfileComponent, {size: 'xl', beforeDismiss: () => {
          this.store.dispatch(hideAppUserDetails());
          return true;
        }});
      }
    });
  }

}
