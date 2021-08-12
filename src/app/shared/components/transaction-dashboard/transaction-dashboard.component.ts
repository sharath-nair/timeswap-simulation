import { Component, OnDestroy, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { transactionTypes } from '@app/core/config/app.config';
import { User } from '@app/core/models/user.model';
import { CommonService } from '@app/core/services/common.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html',
  styleUrls: ['./transaction-dashboard.component.scss']
})
export class TransactionDashboardComponent implements OnInit, OnDestroy {
  public transactionTypes = transactionTypes;
  public users: User[];
  public txList = [1, 2, 3];

  private destroy$ = new Subject<null>();

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.usersList.pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  addTransaction(): void {
    this.txList.push(1);
  }
}
