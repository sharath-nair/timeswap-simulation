import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { defaultAsset, defaultCollateral } from '@app/core/config/app.config';
import { Pool } from '@app/core/models/pool.model';
import { CommonService } from '@app/core/services/common.service';

@Component({
  selector: 'app-pool-init',
  templateUrl: './pool-init.component.html',
  styleUrls: ['./pool-init.component.scss']
})
export class PoolInitComponent implements OnInit {
  @Output()
  poolInitEvent = new EventEmitter<any>();

  poolInitForm: FormGroup;
  poolData: Pool;

  constructor(private readonly formBuilder: FormBuilder, private readonly commonService: CommonService) { }

  ngOnInit() {
    this.poolInitForm = this.formBuilder.group({
      asset: [defaultAsset, Validators.required],
      collateral: [defaultCollateral, Validators.required],
      assetValue: [null, Validators.required],
      interestRate: [null],
      initDate: [null, Validators.required],
      maturityDate: [null, Validators.required],
      expCollateralFactor: [null],
      protocolFees: [null],
      transactionFees: [null],
      liquidityTokens: [null],
      insuranceTokens: [null],
      bondTokens: [null],
    });

    this.commonService.asset.next(defaultAsset);
    this.commonService.collateral.next(defaultCollateral);
  }

  onSubmit() {
    if (this.poolInitForm.valid) {
      this.poolData = this.poolInitForm.value;
      this.poolInitEvent.emit(this.poolData);
      this.commonService.asset.next(this.poolData.asset);
      this.commonService.collateral.next(this.poolData.collateral);
    }
  }

  onAssetInputBlur(asset: string) {
    this.commonService.asset.next(asset);
  }

  onCollateralInputBlur(collateral: string) {
    this.commonService.collateral.next(collateral);
  }
}
