import { Component } from '@angular/core';

import { Pool } from '@app/core/models/pool.model';
import { CommonService } from '@app/core/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timeswap-simulation';
  isPoolInitialized = false;
  poolDetails: Pool;

  constructor(private commonService: CommonService) {}

  onPoolInit(poolDetails: any) {
    this.poolDetails = poolDetails;
    this.isPoolInitialized = true;
    this.commonService.appState.poolInfo = this.poolDetails;
  }
}
