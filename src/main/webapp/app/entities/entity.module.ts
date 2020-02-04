import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'taxi-office',
        loadChildren: () => import('./taxi-office/taxi-office.module').then(m => m.UberTwoTaxiOfficeModule)
      },
      {
        path: 'driver',
        loadChildren: () => import('./driver/driver.module').then(m => m.UberTwoDriverModule)
      },
      {
        path: 'car',
        loadChildren: () => import('./car/car.module').then(m => m.UberTwoCarModule)
      },
      {
        path: 'car-ride',
        loadChildren: () => import('./car-ride/car-ride.module').then(m => m.UberTwoCarRideModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.UberTwoCustomerModule)
      },
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.UberTwoBookModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class UberTwoEntityModule {}
