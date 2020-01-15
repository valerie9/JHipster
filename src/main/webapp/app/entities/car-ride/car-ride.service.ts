import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICarRide } from 'app/shared/model/car-ride.model';

type EntityResponseType = HttpResponse<ICarRide>;
type EntityArrayResponseType = HttpResponse<ICarRide[]>;

@Injectable({ providedIn: 'root' })
export class CarRideService {
  public resourceUrl = SERVER_API_URL + 'api/car-rides';

  constructor(protected http: HttpClient) {}

  create(carRide: ICarRide): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(carRide);
    return this.http
      .post<ICarRide>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(carRide: ICarRide): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(carRide);
    return this.http
      .put<ICarRide>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICarRide>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICarRide[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(carRide: ICarRide): ICarRide {
    const copy: ICarRide = Object.assign({}, carRide, {
      startTime: carRide.startTime && carRide.startTime.isValid() ? carRide.startTime.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startTime = res.body.startTime ? moment(res.body.startTime) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((carRide: ICarRide) => {
        carRide.startTime = carRide.startTime ? moment(carRide.startTime) : undefined;
      });
    }
    return res;
  }
}
