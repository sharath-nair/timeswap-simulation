import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { User } from '@app/core/models/user.model';

@Injectable({ providedIn: 'root' })
export class CommonService {
  displayErrorMsg = new Subject<string>();

  getUsers(): Observable<User[]> {
    const mockUserData: User[] = [
      { name: 'User 1', assetCount: 121, collateralCount: 11},
      { name: 'User 2', assetCount: 122, collateralCount: 12},
      { name: 'User 3', assetCount: 123, collateralCount: 13},
      { name: 'User 4', assetCount: 124, collateralCount: 14},
      { name: 'User 5', assetCount: 125, collateralCount: 15},
    ];

    return of(mockUserData);
  }
}
