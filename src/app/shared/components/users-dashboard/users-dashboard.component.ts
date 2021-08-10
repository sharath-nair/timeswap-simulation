import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { take } from 'rxjs/internal/operators/take';

import { User } from '@app/core/models/user.model';
import { CommonService } from '@app/core/services/common.service';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss']
})
export class UsersDashboardComponent implements OnInit {
  users: User[];
  usersDatasource: MatTableDataSource<User> = new MatTableDataSource([]);

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getUsers().pipe(take(1)).subscribe(users => {
      this.users = users;
      this.usersDatasource.data = this.users;
    });
  }

  userColumns = ['name', 'assets', 'collaterals', 'mint-action', 'info'];

  public addUser() {
    this.users.push({ name: 'New User', assetCount: 1234, collateralCount: 100 });
    this.usersDatasource.data = this.users;
  }
}
