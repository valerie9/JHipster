import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UberTwoTestModule } from '../../../test.module';
import { CarRideComponent } from 'app/entities/car-ride/car-ride.component';
import { CarRideService } from 'app/entities/car-ride/car-ride.service';
import { CarRide } from 'app/shared/model/car-ride.model';

describe('Component Tests', () => {
  describe('CarRide Management Component', () => {
    let comp: CarRideComponent;
    let fixture: ComponentFixture<CarRideComponent>;
    let service: CarRideService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UberTwoTestModule],
        declarations: [CarRideComponent],
        providers: []
      })
        .overrideTemplate(CarRideComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CarRideComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CarRideService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CarRide(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.carRides && comp.carRides[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
