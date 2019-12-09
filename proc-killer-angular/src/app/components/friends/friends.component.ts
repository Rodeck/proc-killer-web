import { Component, OnInit } from '@angular/core';
import { BaseState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app-user.model';
import { selectUsers, selectFriends } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  users$: Observable<AppUser[]> = this.store.select(selectUsers);
  friends$: Observable<AppUser[]> = this.store.select(selectFriends);
  friendsList: number;

  constructor(private store: Store<BaseState>) {
    this.friends$.subscribe(f => {
      this.friendsList = f.length;
    });
  }

  ngOnInit() {
  }

}
