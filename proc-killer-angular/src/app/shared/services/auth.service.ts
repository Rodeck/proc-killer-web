import { Injectable, NgZone, Inject } from '@angular/core';
import { User } from "../services/user";
import { auth, storage } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { map, take } from "rxjs/operators";
import { AppState, BaseState } from 'src/app/store/state/app.state';
import { Store, select, State } from '@ngrx/store';
import { userLoggedIn } from 'src/app/store/actions/app.actions';
import { selectAppState } from 'src/app/store/selectors/app.selectors';
import { UserRegistration } from 'src/app/models/user-registration.model';
import { UserState } from 'src/app/models/user-state.model';
import { AppUser, AppUserDetails } from 'src/app/models/app-user.model';
import { Invitation } from 'src/app/models/invitation.model';
import { RankingPlace } from 'src/app/models/ranking-place.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: firebase.User; // Save logged in user data
  url: string = this.baseUrl + "Users"

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning,
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string,
    private store: Store<BaseState>
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState
    .pipe(take(1))
    .subscribe(user => {
      if (user) {
        this.userData = user;
        user.getIdToken().then(x => this.saveUserInLocalStorage(user, x));
        JSON.parse(localStorage.getItem('user'));
        this.redirect(user);
      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('token', null)
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  getUid(): string {
    return this.userData.uid;
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.redirect(result.user);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  redirect(user) {
    this.SetUserData(user);
    this.GetUserData()
    .pipe(take(1))
    .subscribe(x => {
      this.store.dispatch(userLoggedIn({ user: x }));
      this.store.subscribe(() => {
        localStorage.setItem('state', JSON.stringify(this.getState()))
      });
      // this.router.navigate(['dashboard']);
      this.router.navigate(['/dashboard', { outlets: { appContent: ['tasks'] } }]);
    });
  }


  getState(): AppState {
    let state: AppState;

    this.store.pipe(select(selectAppState), take(1)).subscribe(
        s => state = s
    );

    return state;
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.SaveUser(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  SaveUser(user: firebase.User) : Observable<UserRegistration> {
    return this.http.post<UserRegistration>(this.url + '/Register', {
      username: user.displayName,
      email: user.email,
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then(result => {
        this.SetUserData(result.user);
        result.user.getIdToken().then(x => {
          this.saveUserInLocalStorage(result.user, x);
          if (result.additionalUserInfo.isNewUser)
            this.SaveUser(result.user).subscribe(
              x => this.ngZone.run(() => this.redirect(result.user)),
              x => alert(JSON.stringify(x)),
            );
          else
            this.ngZone.run(() => this.redirect(result.user))
        });
    })
    .catch((error) => window.alert(JSON.stringify(error)))
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  GetUserId(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.uid;
  } 

  GetUserData(): Observable<UserModel> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.GetUserId()}`);
    return userRef.get().pipe(
      map(doc => {
        let user: UserModel = {
          uid: this.GetUserId(),
          firstName: doc.get('displayName'),
          lastName: "Doe",
          imageUrl: doc.get('photoURL') || 'https://images.freeimages.com/images/large-previews/20c/my-puppy-maggie-1362787.jpg',
          email: doc.get("email"),
        };
        return user;
      }));
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['sign-in']);
    })
  }

  GetToken() {
    return localStorage.getItem('token');
  }

  saveUserInLocalStorage(user: firebase.User, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  authenticate(): Observable<object> {
    return this.http.post(this.url + '/authenticate', {});
  }

  loadState(): Observable<UserState> {
    return this.http.get<UserState>(this.url + '/getState');
  }

  loadUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(this.url + '/getUsers');
  }

  getFriends(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(this.url + '/getFriends');
  }

  inviteUser(invitedId: string): Observable<number> {
    return this.http.post<number>(this.url + '/addInvitation', {
      invitedId: invitedId
    });
  }

  getInvitations(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(this.url + '/getInvitations');
  }

  acceptInvitation(invitationId: number, inviterId: string): Observable<number> {
    return this.http.post<number>(this.url + '/acceptInvitation', {
      inviterId: inviterId,
      invitationId: invitationId
    });
  }

  rejectInvitation(invitationId: number, inviterId: string): Observable<number> {
    return this.http.post<number>(this.url + '/rejectInvitation', {
      inviterId: inviterId,
      invitationId: invitationId
    });
  }

  getUserDetails(userId: string): Observable<AppUserDetails> {
    return this.http.get<AppUserDetails>(this.url + '/getUserDetails/'+ userId);
  }

  getRanking(): Observable<RankingPlace[]> {
    return this.http.get<RankingPlace[]>(this.baseUrl + 'Statistics/');
  }
}