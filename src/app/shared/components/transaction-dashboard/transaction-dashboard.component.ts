import { Component, OnDestroy, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { transactionTypes } from '@app/core/config/app.config';
import { User } from '@app/core/models/user.model';
import { CommonService } from '@app/core/services/common.service';
import { Transaction } from '@app/core/models/transaction.model';

@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html',
  styleUrls: ['./transaction-dashboard.component.scss']
})
export class TransactionDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<null>();

  public transactionTypes = transactionTypes;
  public users: User[];
  public txList: Transaction[] = [];
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
    let newTx: Transaction = {};

    if (this.txList.length) {
      const lastTx = this.txList[this.txList.length - 1];
      newTx.id = lastTx.id + 1;
      newTx.isExecutable = lastTx.hasBeenExecuted;
    } else {
      newTx = {id: 1, isExecutable: true};
    }

    this.txList.push(newTx);
  }

  removeTransaction(id: number): void {
    const index = this.txList.findIndex(tx => tx.id === id);

    if (index >= 0) {
      this.txList.splice(index, 1);
    }
  }

  onExecuteTransaction(index: number): void {
    if (this.txList[index].hasBeenExecuted && this.txList[index + 1]) {
      this.txList[index + 1].isExecutable = true;
      this.commonService.appState.transactions = this.txList.filter(tx => tx.hasBeenExecuted);
    }
  }
}
