import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required components for which route services to be activated
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';

// Import canActivate guard services
import { AuthGuard } from "../../shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "../../shared/guard/secure-inner-pages.guard";
import { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { FriendsComponent } from 'src/app/components/friends/friends.component';
import { RankingComponent } from 'src/app/components/ranking/ranking.component';

// Include route guard in routes array
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent},
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: 'profile', component: UserProfileComponent, outlet: 'appContent', canActivate: [AuthGuard], data: {animation: 'Profile'} },
    { path: 'tasks', component: ListComponent, outlet: 'appContent', canActivate: [AuthGuard], data: {animation: 'Tasks'} },
    { path: 'friends', component: FriendsComponent, outlet: 'appContent', canActivate: [AuthGuard], data: {animation: 'Friends'} },
    { path: 'ranking', component: RankingComponent, outlet: 'appContent', canActivate: [AuthGuard], data: {animation: 'Ranking'} },
  ]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }