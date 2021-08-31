import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { takeUntil } from 'rxjs/operators';

import { User } from '@app/core/models/user.model';
import { CommonService } from '@app/core/services/common.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss']
})
export class UsersDashboardComponent implements OnInit, OnDestroy {
  users: User[];
  usersDatasource: MatTableDataSource<User> = new MatTableDataSource([]);
  assetName: string;
  collateralName: string;

  private destroy$ = new Subject();

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.usersList.pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.users = users;
      this.usersDatasource.data = this.users;
    });

    this.commonService.asset.pipe(takeUntil(this.destroy$)).subscribe(asset => {
      this.assetName = asset;
    });

    this.commonService.collateral.pipe(takeUntil(this.destroy$)).subscribe(collateral => {
      this.collateralName = collateral;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe;
  }

  userColumns = ['name', 'assets', 'collaterals', 'mint-input', 'mint-action'];

  public addUser() {
    this.users.push({ name: `User ${this.users.length + 1}`, assetCount: 1234, collateralCount: 100 });
    this.commonService.usersList.next(this.users);
  }
}
