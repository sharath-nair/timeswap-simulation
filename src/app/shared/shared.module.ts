import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedMatModule } from './shared-mat.module';

import { PoolInitComponent } from './components/pool-init/pool-init.component';
import { UsersDashboardComponent } from './components/users-dashboard/users-dashboard.component';

const SHARED_MODULES: any[] = [
  // FormsModule,
  // ReactiveFormsModule,
  CommonModule,
  SharedMatModule,
  OverlayModule,
  DragDropModule,
  RouterModule,
];

const SHARED_COMPONENTS: any[] = [
  PoolInitComponent,
  UsersDashboardComponent
];

/**
 * The shared module is used to hold all reusable components across the app's
 * different modules. It imports and exports reusable modules to make them
 * readily available to other feature modules just by importing the shared
 * module, avoiding repetition. Since the shared module is meant to be imported
 * by all feature-modules, it shouldn't provide any service.
 */
@NgModule({
  declarations: [...SHARED_COMPONENTS],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS],
  imports: SHARED_MODULES,
  entryComponents: [],
  /** Do not provide services here, do it in core.module */
})
export class SharedModule {}
