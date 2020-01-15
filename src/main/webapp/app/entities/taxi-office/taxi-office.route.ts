import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITaxiOffice, TaxiOffice } from 'app/shared/model/taxi-office.model';
import { TaxiOfficeService } from './taxi-office.service';
import { TaxiOfficeComponent } from './taxi-office.component';
import { TaxiOfficeDetailComponent } from './taxi-office-detail.component';
import { TaxiOfficeUpdateComponent } from './taxi-office-update.component';

@Injectable({ providedIn: 'root' })
export class TaxiOfficeResolve implements Resolve<ITaxiOffice> {
  constructor(private service: TaxiOfficeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITaxiOffice> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((taxiOffice: HttpResponse<TaxiOffice>) => {
          if (taxiOffice.body) {
            return of(taxiOffice.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TaxiOffice());
  }
}

export const taxiOfficeRoute: Routes = [
  {
    path: '',
    component: TaxiOfficeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uberTwoApp.taxiOffice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TaxiOfficeDetailComponent,
    resolve: {
      taxiOffice: TaxiOfficeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uberTwoApp.taxiOffice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TaxiOfficeUpdateComponent,
    resolve: {
      taxiOffice: TaxiOfficeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uberTwoApp.taxiOffice.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TaxiOfficeUpdateComponent,
    resolve: {
      taxiOffice: TaxiOfficeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uberTwoApp.taxiOffice.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
