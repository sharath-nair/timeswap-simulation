import { Component, OnDestroy, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

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
  private destroy$ = new Subject<null>();

  public transactionTypes = transactionTypes;
  public users: User[];
  public txList = [1, 2, 3];
  public assetName: string;
  public collateralName: string;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.usersList.pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.users = users;
    });

    this.commonService.asset.pipe(takeUntil(this.destroy$)).subscribe(asset => {
      this.assetName = asset;
    });

    this.commonService.collateral.pipe(takeUntil(this.destroy$)).subscribe(collateral => {
      this.collateralName = collateral;
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
