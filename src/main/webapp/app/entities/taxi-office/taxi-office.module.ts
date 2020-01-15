import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UberTwoSharedModule } from 'app/shared/shared.module';
import { TaxiOfficeComponent } from './taxi-office.component';
import { TaxiOfficeDetailComponent } from './taxi-office-detail.component';
import { TaxiOfficeUpdateComponent } from './taxi-office-update.component';
import { TaxiOfficeDeleteDialogComponent } from './taxi-office-delete-dialog.component';
import { taxiOfficeRoute } from './taxi-office.route';

@NgModule({
  imports: [UberTwoSharedModule, RouterModule.forChild(taxiOfficeRoute)],
  declarations: [TaxiOfficeComponent, TaxiOfficeDetailComponent, TaxiOfficeUpdateComponent, TaxiOfficeDeleteDialogComponent],
  entryComponents: [TaxiOfficeDeleteDialogComponent]
})
export class UberTwoTaxiOfficeModule {}
