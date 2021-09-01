import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { transactionTypes, txTypesAfterMat, txTypesBeforeMat, TxType } from '@app/core/config/app.config';
import { Transaction } from '@app/core/models/transaction.model';
import { User } from '@app/core/models/user.model';

@Component({
  selector: 'app-transaction-row',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.scss']
})
export class TransactionRowComponent implements OnInit {
  @Input() users: User[];
  @Input() assetName: string;
  @Input() collateralName: string;
  @Input() txDetails: Transaction;

  @Output() removeTransaction = new EventEmitter<number>();
  @Output() executeTransaction = new EventEmitter();

  private maturityDate: Date | string;
  private iso = new Date().toISOString();

  public transactionTypes = transactionTypes;
  public txType = TxType;
  public minDate: Date | string = this.iso.substring(0, this.iso.length - 1);
  public transactionForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      date: [null, Validators.required],
      user: [null, Validators.required],
      txType: [null, Validators.required],
      assetVal: [null],
      collateralVal: [null],
      tokenPairPrice: [null],
    });
  }

  onDateBlur(e: Date) {
    console.log(e);
    this.maturityDate = new Date();
    this.txDetails.txDate = new Date(e);

    if (this.txDetails.txDate > this.maturityDate) {
      this.transactionTypes = txTypesAfterMat;
    } else {
      this.transactionTypes = txTypesBeforeMat;
    }
  }

  onTxTypeChange(event: MatSelectChange) {
    this.txDetails.txType = event.value;

    switch (this.txDetails.txType) {
      case TxType.Lend:
      case TxType.Repay:
      case TxType.AddLiquidity:
        this.transactionForm.get('assetVal').setValidators([Validators.required]);
        this.transactionForm.get('collateralVal').clearValidators();
        this.updateFormFields();
        break;
      case TxType.Borrow:
        this.transactionForm.get('assetVal').setValidators([Validators.required]);
        this.transactionForm.get('collateralVal').setValidators([Validators.required]);
        this.updateFormFields();
        break;
      case TxType.Withdraw:
      case TxType.RemoveLiquidity:
        this.transactionForm.get('assetVal').clearValidators();
        this.transactionForm.get('collateralVal').clearValidators();
        this.updateFormFields();
        break;
      }
  }

  onRemoveTxClick() {
    console.log(this.txDetails.id);

    this.removeTransaction.emit(this.txDetails.id);
  }

  onExecuteClick() {
    if (this.transactionForm.valid) {
      this.txDetails.hasBeenExecuted = true;
      this.executeTransaction.emit();
    }
  }

  private updateFormFields() {
    this.transactionForm.get('assetVal').updateValueAndValidity();
    this.transactionForm.get('collateralVal').updateValueAndValidity();
  }
}
