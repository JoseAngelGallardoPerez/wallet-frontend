import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  CreateTransactionRequest,
  DataResponceConvertParams,
  IAdminTbaRequest,
  IAdminTbaRequestPreview,
  IAdminTbuRequest,
  IAdminTbuRequestPreview,
  ICftRequest,
  ICftRequestPreview,
  IIncomingAmount,
  IOwtRequest,
  IOwtRequestPreview,
  ISuccessfulTransfer,
  ITbaRequest,
  ITbaRequestPreview,
  ITbuRequest,
  ITbuRequestPreview,
  ITotalOutgoingAmount,
  PreviewConvertParams,
  PreviewTransactionRequest
} from '@interfaces/transfer-request-interface';
import { TransferApiService } from '@services/transfer/transfer-api.service';
import { SuccessfulTransferModel } from '@models/successful-transfer-model';
import { TransferRequest } from '@models/transfers/transfer-request';
import { PaginationService } from '@services/pagination/pagination.service';
import { TransferRequestData } from '@models/transfers/transfer-request-data';
import { TransferRequestDataBuilder } from '@services/transfer/request-data/transfer-request-data-builder';
import { ApiError } from '@models/api-error.model';
import { exhaustMap, map, shareReplay, switchMap } from 'rxjs/operators';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import * as FileSaver from 'file-saver';
import { FileDownloadModel } from '@models/file-download.model';
import { QueryFieldInterface } from '@interfaces/sort-bar/queryField.interface';
import { DateToFromFieldInterface } from '@interfaces/sort-bar/dateToFromField.interface';
import { SortFieldInterface } from '@interfaces/sort-bar/sortField.interface';
import { PaginationFieldInterface } from '@interfaces/sort-bar/paginationField.interface';
import { queryParamsStringify } from '@helpers/queryParamsHelpers';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';
import { Transaction } from '@models/transaction';
import { NgxSpinnerService } from 'ngx-spinner';

export enum TransferTypes {
  USER_TBA = 'userTBA',
  ADMIN_TBA = 'adminTBA',
  USER_TBU = 'userTBU',
  ADMIN_TBU = 'adminTBU',
  USER_CFT = 'userCFT',
  ADMIN_OWT = 'adminOWT',
  USER_OWT = 'userOWT',

}

export type TransferRequestFilter = QueryFieldInterface & DateToFromFieldInterface & SortFieldInterface & PaginationFieldInterface & {
  subject: string,
  baseCurrencyCode: string,
  status: string;
};

export class TransferRequestsData {
  constructor(
    public transferRequests: TransferRequest[],
    public totalRecords: number,
    public pageSize: number,
    public page: number
  ) {
  }
}

@Injectable()
export class TransferService {

  /**
   * @type {Subject<TransferRequestsData>}
   */
  public getRequestsSubject$: Subject<TransferRequestFilter> = new Subject<TransferRequestFilter>();

  /**
   * @type {Observable<TransferRequestsData>}
   */
  public onGetRequests$: Observable<TransferRequestsData | null> = this.getRequestsSubject$.asObservable()
    .pipe(map((query: TransferRequestFilter) => TransferService.transformParams(query)),
      switchMap((params: { [key: string]: string }) => this.transferApiService.apiGetRequests(params)),
      map(({ data, error, links }: { data: any[], error: boolean, links: any }) => {
        if (error) {
          return null;
        }
        const requests = data.map((item) => {
          return new TransferRequest(item);
        });

        const pagination = PaginationService.buildPaginationSizeNumber(links);
        return new TransferRequestsData(requests, pagination.totalRecords, pagination.limit, pagination.currentPage);
      }));

  /**
   * @type {Subject<IIncomingAmount>}
   */
  private onExecuteRequestSubject$: Subject<string> = new Subject<string>();

  /**
   * @type {Observable<IIncomingAmount>}
   */
  public onExecuteRequest$: Observable<boolean> = this.onExecuteRequestSubject$.asObservable()
    .pipe(exhaustMap((id: string) => this.transferApiService.apiExecuteRequest(id)),
      map(({ error }: { error: boolean }) => !error));

  /**
   * @type {Subject<any>}
   */
  private onImportTransfersSubject$: Subject<any> = new Subject<any>();

  /**
   * @type {Observable<any[]>}
   */
  public onImportTransfers$: Observable<any> = this.onImportTransfersSubject$.asObservable();

  /**
   * @type {Subject<any>}
   */
  private onUpdateTransfersSubject$: Subject<any> = new Subject<any>();

  /**
   * @type {Observable<any[]>}
   */
  public onUpdateTransfers$: Observable<any> = this.onUpdateTransfersSubject$.asObservable();

  public loadIncomingAmount: Subject<{ type: string, data: { body: PreviewTransactionRequest, userId?: string } }> =
    new Subject<{ type: string, data: { body: PreviewTransactionRequest, userId?: string } }>();

  public onLoadIncomingAmount$: Observable<{ data: IIncomingAmount | ApiError[], error: boolean }> = this.loadIncomingAmount
    .asObservable()
    .pipe(exhaustMap(({ type, data }: { type: TransferTypes, data: { body: PreviewTransactionRequest, userId?: string } }) => {
      switch (type) {
        case TransferTypes.USER_TBA:
          return this.transferApiService.apiGetTbaRequestIncomingAmount(<ITbaRequestPreview>data.body);
        case TransferTypes.ADMIN_TBA:
          return this.transferApiService.apiGetTbaRequestIncomingAmountAsAdmin(data.userId, <IAdminTbaRequestPreview>data.body);
        case TransferTypes.USER_TBU:
          return this.transferApiService.apiGetTbuRequestIncomingAmount(<ITbuRequestPreview>data.body);
        case TransferTypes.ADMIN_TBU:
          return this.transferApiService
            .apiGetTbuRequestIncomingAmountAsAdmin(data.userId, <IAdminTbuRequestPreview>data.body);
        case TransferTypes.USER_CFT:
          return this.transferApiService.apiGetCftRequestIncomingAmount(<ICftRequestPreview>data.body);
      }
    }));

  public createTransaction: Subject<{ type: string, data: { body: CreateTransactionRequest, userId?: string } }> =
    new Subject<{ type: string, data: { body: CreateTransactionRequest, userId?: string } }>();

  public onCreateRequest$: Observable<{ data: ISuccessfulTransfer | ApiError[], error: boolean }> = this.createTransaction
    .asObservable()
    .pipe(exhaustMap(({ type, data }: { type: string, data: { body: CreateTransactionRequest, userId?: string } }) => {
        switch (type) {
          case TransferTypes.USER_TBA:
            return this.transferApiService.apiCreateTbaRequest(<ITbaRequest>data.body);
          case TransferTypes.ADMIN_TBA:
            return this.transferApiService.apiCreateTbaRequestAsAdmin(data.userId, <IAdminTbaRequest>data.body);
          case TransferTypes.USER_TBU:
            return this.transferApiService.apiCreateTbuRequest(<ITbuRequest>data.body);
          case TransferTypes.ADMIN_TBU:
            return this.transferApiService
              .apiCreateTbuRequestAsAdmin(data.userId, <IAdminTbuRequest>data.body);
          case TransferTypes.USER_CFT:
            return this.transferApiService.apiCreateCftRequest(<ICftRequest>data.body);
          case TransferTypes.USER_OWT:
            return this.transferApiService.apiCreateOwtRequest(<IOwtRequest>data.body);
          case TransferTypes.ADMIN_OWT:
            return this.transferApiService
              .apiCreateOwtRequestAsAdmin(data.userId, <IOwtRequest>data.body);
        }
      }),
      map(
        ({ data, error }: { data: any, error: boolean }) => {
          if (error) {
            return { data, error };
          }
          return { data: new SuccessfulTransferModel(data), error };
        }
      ));

  public updateRequestBodySubject$: Subject<{ id: string, body: ISuccessfulTransfer }> =
    new Subject<{ id: string, body: ISuccessfulTransfer }>();

  public onUpdateRequestBody$: Observable<SuccessfulTransferModel | null> = this.updateRequestBodySubject$.asObservable()
    .pipe(
      switchMap(({ id, body }: { id: string, body: ISuccessfulTransfer }) => this.transferApiService
        .apiUpdateRequestBodyByRequestId(id, body)),
      map(({ data, error }: CallResponceInterface): SuccessfulTransferModel | null => {
        if (error) {
          return null;
        }
        return new SuccessfulTransferModel(data);
      }));

  public LoadTotalAmountSubject$: Subject<{ type: string, data: { body: IOwtRequestPreview, userId?: string } }> =
    new Subject<{ type: string, data: { body: IOwtRequestPreview, userId?: string } }>();

  public onLoadTotalAmount$: Observable<{ data: ITotalOutgoingAmount | ApiError[], error: boolean }> =
    this.LoadTotalAmountSubject$.asObservable()
      .pipe(switchMap(({ type, data }: { type: string, data: { body: IOwtRequestPreview, userId?: string } }) => {
        switch (type) {
          case TransferTypes.USER_OWT:
            return this.transferApiService.apiGetOwtRequestTotalAmount(data.body);
          case TransferTypes.ADMIN_OWT:
            return this.transferApiService.apiGetOwtRequestTotalAmountAsAdmin(data.userId, data.body);
        }
      }));
  /**
   * @type {Subject<TransferRequestsData>}
   */
  public onGetRequestSubject$: BehaviorSubject<String> = new BehaviorSubject<String>(null);
  /**
   * @type {Observable<TransferRequestsData>}
   */
  public onGetRequest$: Observable<TransferRequestData> = this.onGetRequestSubject$.asObservable()
    .pipe(
      switchMap((id: string) => this.transferApiService.apiGetRequest(id)),
      map(({ data, error }: CallResponceInterface): TransferRequestData | null => {
        this.spinner.hide();
        return error ? null : new TransferRequestDataBuilder(data).call();
      }),
      shareReplay(1));

  /**
   * @type {Subject<TransferRequestsData>}
   */
  public onGetTransactionSubject$: BehaviorSubject<String> = new BehaviorSubject<String>(null);
  /**
   * @type {Observable<TransferRequestsData>}
   */
  public onGetTransaction$: Observable<Transaction> = this.onGetTransactionSubject$.asObservable()
    .pipe(
      switchMap((id: string) => this.transferApiService.apiGetTransaction(id)),
      map(({ data, error }: CallResponceInterface): Transaction | null => {
        this.spinner.hide();
        return error ? null : new Transaction(data);
      }),
      shareReplay(1));

  /**
   * @type {Subject<IIncomingAmount>}
   */
  public onCancelRequestSubject$: Subject<{ id: string, reason: string }> =
    new Subject<{ id: string, reason: string }>();
  /**
   * @type {Observable<IIncomingAmount>}
   */
  public onCancelRequest$: Observable<{ data: ApiError[], error: boolean }> = this.onCancelRequestSubject$
    .asObservable().pipe(
      switchMap(({ id, reason }: { id: string, reason: string }) => this.transferApiService.apiCancelRequest(id, reason)),
    );

  /**  RatesForMainCurrency  */

  public onRatesForMainCurrencySubject$: Subject<PreviewConvertParams> = new Subject<PreviewConvertParams>();

  public onRatesForMainCurrency$: Observable<DataResponceConvertParams> = this.onRatesForMainCurrencySubject$.asObservable()
    .pipe(switchMap((params: PreviewConvertParams): Observable<DataResponceConvertParams> => {
      return this.transferApiService.apiRatesForMainCurrency(params);
    }));

  private static transformParams(queryParams: TransferRequestFilter): { [key: string]: string } {
    const params = {
      page: { number: queryParams.page, size: queryParams.size },
      include: ['user', 'balanceSnapshots', 'balanceSnapshots.balanceType', 'balanceDifference']
    };
    const filter = {};
    if (queryParams.sort) {
      params['sort'] = queryParams.sort;
    }
    if (queryParams.query) {
      filter['id'] = queryParams.query;
    }
    if (queryParams.subject) {
      filter['subject'] = queryParams.subject;
    }
    if (queryParams.dateTo) {
      filter['statusChangedAt:lte'] = moment(queryParams.dateTo).endOf('day').utc().format();
    }
    if (queryParams.dateFrom) {
      filter['statusChangedAt:gte'] = moment(queryParams.dateFrom).startOf('day').utc().format();
    }
    if (queryParams.subject) {
      filter['subject'] = queryParams.subject;
    }
    if (queryParams.baseCurrencyCode) {
      filter['baseCurrencyCode'] = queryParams.baseCurrencyCode;
    }
    if (queryParams.status) {
      filter['status'] = queryParams.status;
    }
    if (Object.keys(filter).length) {
      params['filter'] = filter;
    }
    return queryParamsStringify(params, false);
  }

  constructor(
    private transferApiService: TransferApiService,
    private spinner: NgxSpinnerService,
  ) {
  }

  /**
   * Execute request by id
   * @param {string} id
   */
  public executeRequest(id: string): void {
    this.onExecuteRequestSubject$.next(id);
  }

  /**
   * @returns {Observable<any>}
   */
  public updateTransfersFromCsv(csv: FormData): Observable<any> {
    this.transferApiService.apiUpdateTransfersFromCsv(csv).subscribe(
      ({ data, error }: { data: any, error: boolean }) => {
        this.onUpdateTransfersSubject$.next(data);
      }
    );

    return this.onUpdateTransfers$;
  }

  /**
   * @returns {Observable<any>}
   */
  public importTransfersFromCsv(csv: FormData): Observable<any> {
    this.transferApiService.apiImportTransfersFromCsv(csv).subscribe(
      ({ data, error }: { data: any, error: boolean }) => {
        if (error) {
          this.onImportTransfersSubject$.next(false);
        } else {
          this.onImportTransfersSubject$.next(true);
        }
      }
    );

    return this.onImportTransfers$;
  }

  /**
   * @param {{}} params
   */
  public exportTransfersToCsv(params: TransferRequestFilter) {
    const transformedParams = TransferService.transformParams(params);
    delete transformedParams['include'];
    this.transferApiService.apiExportTransfersToCsv(transformedParams)
      .subscribe((data: FileDownloadModel) => {
        FileSaver.saveAs(data.blob, data.filename);
      });
  }
}
