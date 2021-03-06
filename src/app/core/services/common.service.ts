import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

import { AppState } from '@app/core/models/app-state.model';
import { User } from '@app/core/models/user.model';

const mockUserData: User[] = [
  { name: 'User 1', assetCount: 121, collateralCount: 11},
  { name: 'User 2', assetCount: 122, collateralCount: 12},
  { name: 'User 3', assetCount: 123, collateralCount: 13},
  { name: 'User 4', assetCount: 124, collateralCount: 14},
  { name: 'User 5', assetCount: 125, collateralCount: 15},
];

@Injectable({ providedIn: 'root' })
export class CommonService {
  displayErrorMsg = new Subject<string>();
  usersList = new BehaviorSubject<User[]>(mockUserData);
  asset = new BehaviorSubject<string>(null);
  collateral = new BehaviorSubject<string>(null);
  appState: AppState = {};
}
