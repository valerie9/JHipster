import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UberTwoSharedModule } from 'app/shared/shared.module';
import { CarRideComponent } from './car-ride.component';
import { CarRideDetailComponent } from './car-ride-detail.component';
import { CarRideUpdateComponent } from './car-ride-update.component';
import { CarRideDeleteDialogComponent } from './car-ride-delete-dialog.component';
import { carRideRoute } from './car-ride.route';

@NgModule({
  imports: [UberTwoSharedModule, RouterModule.forChild(carRideRoute)],
  declarations: [CarRideComponent, CarRideDetailComponent, CarRideUpdateComponent, CarRideDeleteDialogComponent],
  entryComponents: [CarRideDeleteDialogComponent]
})
export class UberTwoCarRideModule {}
