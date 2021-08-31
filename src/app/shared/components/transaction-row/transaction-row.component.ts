import { Component, Input } from '@angular/core';

import { transactionTypes, txTypesAfterMat, txTypesBeforeMat } from '@app/core/config/app.config';
import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-transaction-row',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.scss']
})
export class TransactionRowComponent {
  @Input() users: User[];
  @Input() assetName: string;
  @Input() collateralName: string;

  private maturityDate: Date | string;
  private iso = new Date().toISOString();

  public transactionTypes = transactionTypes;
  public minDate: Date | string = this.iso.substring(0, this.iso.length - 1);

  constructor() { }

  onDateBlur(e: Date) {
    console.log(e);
    this.maturityDate = new Date();

    if (new Date(e) > this.maturityDate) {
      this.transactionTypes = txTypesAfterMat;
    } else {
      this.transactionTypes = txTypesBeforeMat;
    }
  }
}
