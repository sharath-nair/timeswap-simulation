import { CommonService } from '@app/core/services/common.service';
import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/internal/operators/take';

import { transactionTypes } from '@app/core/config/app.config';
import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html',
  styleUrls: ['./transaction-dashboard.component.scss']
})
export class TransactionDashboardComponent implements OnInit {
  public transactionTypes = transactionTypes;
  public users: User[];

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getUsers().pipe(take(1)).subscribe(users => {
      this.users = users;
    });
  }
}
