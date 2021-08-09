import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { User } from './../../../core/models/user.model';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss']
})
export class UsersDashboardComponent {

  constructor() { }

  userColumns = ['name', 'email', 'last-active'];
  usersDatasource: MatTableDataSource<User> = new MatTableDataSource([]);

}
