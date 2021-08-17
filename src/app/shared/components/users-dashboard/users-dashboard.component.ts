import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { takeUntil } from 'rxjs/internal/operators/takeUntil';

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

  private destroy$ = new Subject();

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.usersList.pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.users = users;
      this.usersDatasource.data = this.users;
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
