import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICarRide, CarRide } from 'app/shared/model/car-ride.model';
import { CarRideService } from './car-ride.service';
import { CarRideComponent } from './car-ride.component';
import { CarRideDetailComponent } from './car-ride-detail.component';
import { CarRideUpdateComponent } from './car-ride-update.component';

@Injectable({ providedIn: 'root' })
export class CarRideResolve implements Resolve<ICarRide> {
  constructor(private service: CarRideService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICarRide> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((carRide: HttpResponse<CarRide>) => {
          if (carRide.body) {
            return of(carRide.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CarRide());
  }
}

export const carRideRoute: Routes = [
  {
    path: '',
    component: CarRideComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uberTwoApp.carRide.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CarRideDetailComponent,
    resolve: {
      carRide: CarRideResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uberTwoApp.carRide.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CarRideUpdateComponent,
    resolve: {
      carRide: CarRideResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uberTwoApp.carRide.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CarRideUpdateComponent,
    resolve: {
      carRide: CarRideResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uberTwoApp.carRide.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
