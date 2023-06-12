import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomRemoteCongif } from './utils/config';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  overloadRoutes$ = new BehaviorSubject<{ [key: string]: CustomRemoteCongif }>(
    {}
  );
  constructor() {}
}
