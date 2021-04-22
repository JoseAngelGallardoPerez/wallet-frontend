import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private data = new BehaviorSubject<any>({});
  public dataObservable = this.data.asObservable();

  constructor() {
  }

  public publishData(data): void {
    this.data.next(data);
  }
}
