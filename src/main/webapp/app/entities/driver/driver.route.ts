import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDriver, Driver } from 'app/shared/model/driver.model';
import { DriverService } from './driver.service';
import { DriverComponent } from './driver.component';
import { DriverDetailComponent } from './driver-detail.component';
import { DriverUpdateComponent } from './driver-update.component';

@Injectable({ providedIn: 'root' })
export class DriverResolve implements Resolve<IDriver> {
  constructor(private service: DriverService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDriver> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((driver: HttpResponse<Driver>) => {
          if (driver.body) {
            return of(driver.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Driver());
  }
}

export const driverRoute: Routes = [
  {
    path: '',
    component: DriverComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uberTwoApp.driver.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DriverDetailComponent,
    resolve: {
      driver: DriverResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uberTwoApp.driver.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DriverUpdateComponent,
    resolve: {
      driver: DriverResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uberTwoApp.driver.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DriverUpdateComponent,
    resolve: {
      driver: DriverResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uberTwoApp.driver.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
