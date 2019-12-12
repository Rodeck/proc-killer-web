import { UserState } from './user-state.model';

export interface AppUser {
    uid: string;
    name: string;
    isFriend: boolean;
    points: number;
    level: number;
}

export interface AppUserDetails {
    uid: string;
    name: string;
    isFriend: boolean;
    state: UserState;
}