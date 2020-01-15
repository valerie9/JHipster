import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UberTwoTestModule } from '../../../test.module';
import { CarRideDetailComponent } from 'app/entities/car-ride/car-ride-detail.component';
import { CarRide } from 'app/shared/model/car-ride.model';

describe('Component Tests', () => {
  describe('CarRide Management Detail Component', () => {
    let comp: CarRideDetailComponent;
    let fixture: ComponentFixture<CarRideDetailComponent>;
    const route = ({ data: of({ carRide: new CarRide(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UberTwoTestModule],
        declarations: [CarRideDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CarRideDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CarRideDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load carRide on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.carRide).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
