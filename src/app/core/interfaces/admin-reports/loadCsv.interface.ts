import { Observable } from 'rxjs';

export interface LoadCsvInterface<T> {
  apiLoadCSV(filter: T): Observable<Blob>;
}
