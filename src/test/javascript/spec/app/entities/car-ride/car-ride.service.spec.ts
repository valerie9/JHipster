import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { CarRideService } from 'app/entities/car-ride/car-ride.service';
import { ICarRide, CarRide } from 'app/shared/model/car-ride.model';

describe('Service Tests', () => {
  describe('CarRide Service', () => {
    let injector: TestBed;
    let service: CarRideService;
    let httpMock: HttpTestingController;
    let elemDefault: ICarRide;
    let expectedResult: ICarRide | ICarRide[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CarRideService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new CarRide(0, currentDate, 0, 0, 'AAAAAAA', 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            startTime: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CarRide', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            startTime: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            startTime: currentDate
          },
          returnedFromService
        );
        service
          .create(new CarRide())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CarRide', () => {
        const returnedFromService = Object.assign(
          {
            startTime: currentDate.format(DATE_FORMAT),
            duration: 'BBBBBB',
            distance: 1,
            endPlace: 'BBBBBB',
            startPlace: 'BBBBBB',
            cost: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startTime: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CarRide', () => {
        const returnedFromService = Object.assign(
          {
            startTime: currentDate.format(DATE_FORMAT),
            duration: 'BBBBBB',
            distance: 1,
            endPlace: 'BBBBBB',
            startPlace: 'BBBBBB',
            cost: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            startTime: currentDate
          },
          returnedFromService
        );
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CarRide', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
