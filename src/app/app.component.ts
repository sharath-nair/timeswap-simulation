import { Component } from '@angular/core';

import { Pool } from './core/models/pool.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timeswap-simulation';
  isPoolInitialized = false;
  poolDetails: Pool;

  onPoolInit(poolDetails: any) {
    this.poolDetails = poolDetails;
    this.isPoolInitialized = true;
  }
}
