import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders as Headers, HttpResponse } from '@angular/common/http';
import { ApiCallerService } from '@services/api-caller.service';
import { ConfigService } from '@app/config.service';
import {
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
} from '@interfaces/transfer-request-interface';
import { Observable } from 'rxjs';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';
import { map } from 'rxjs/operators';
import { FileDownloadModel } from '@models/file-download.model';

@Injectable()
export class TransferApiService {

  constructor(
    private http: HttpClient,
    private apiCallerService: ApiCallerService,
    private configService: ConfigService
  ) {
  }

  /**
   * Get incoming amount for transfer between accounts
   * @param {ITbaRequestPreview} body
   * @returns {Observable<IIncomingAmount>}
   */
  public apiGetTbaRequestIncomingAmount(body: ITbaRequestPreview) {
    const requestData: ITbaRequestPreview = Object.assign({}, body);
    requestData.outgoingAmount = requestData.outgoingAmount.toString();
    return this.apiCallerService.call(() => (
      this.http.post(this.configService.config.api.account.tbaRequestPreview, requestData)
    ), 'apiGetTbaRequestIncomingAmount');
  }

  /**
   * Create  transfer between accounts request
   * @param {ITbaRequest} body
   * @returns {Observable<ISuccessfulTransfer>}
   */
  public apiCreateTbaRequest(body: ITbaRequest) {
    const headers = {};

    if (body.tanValue) {
      headers['X-TAN'] = body.tanValue;
    }
    const requestData: ITbaRequest = Object.assign({}, body);
    requestData.outgoingAmount = requestData.outgoingAmount.toString();

    return this.apiCallerService.call(() => (

      this.http.post(this.configService.config.api.account.tbaRequest, requestData, { headers })

    ), 'apiCreateTbaRequest');
  }

  /**
   * Get incoming amount for transfer between users
   * @param {ITbuRequestPreview} body
   * @returns {Observable<IIncomingAmount>}
   */
  public apiGetTbuRequestIncomingAmount(body: ITbuRequestPreview) {
    const requestData: ITbuRequestPreview = Object.assign({}, body);
    requestData.outgoingAmount = requestData.outgoingAmount.toString();
    return this.apiCallerService.call(() => (
      this.http.post(this.configService.config.api.account.tbuRequestPreview, requestData)
    ), 'apiGetTbuRequestIncomingAmount');
  }

  /**
   * Create transfer between users request
   * @param {ITbuRequest} body
   * @returns {Observable<ISuccessfulTransfer>}
   */
  public apiCreateTbuRequest(body: ITbuRequest) {
    const headers = {};
    if (body.tanValue) {
      headers['X-TAN'] = body.tanValue;
    }
    const requestData: ITbuRequestPreview = Object.assign({}, body);
    requestData.outgoingAmount = requestData.outgoingAmount.toString();
    return this.apiCallerService.call(() => (
      this.http.post(this.configService.config.api.account.tbuRequest, requestData, { headers })
    ), 'apiCreateTbuRequest');
  }

  /**
   * Get incoming amount for transfer between accounts as admin
   * @param userId
   * @param {IAdminTbaRequestPreview} body
   * @returns {Observable<IIncomingAmount>}
   */
  public apiGetTbaRequestIncomingAmountAsAdmin(userId: string, body: IAdminTbaRequestPreview) {
    const requestData: IAdminTbaRequestPreview = Object.assign({}, body);
    requestData.outgoingAmount = requestData.outgoingAmount.toString();
    return this.apiCallerService.call(() => (
      this.http.post(this.configService.config.api.account.tbaRequestPreviewAsAdmin(userId), requestData)
    ), 'apiGetTbaRequestIncomingAmountAsAdmin');
  }

  /**
   * Create  transfer between accounts request as admin
   * @param userId
   * @param {IAdminTbaRequest} body
   * @returns {Observable<ISuccessfulTransfer>}
   */
  public apiCreateTbaRequestAsAdmin(userId: string, body: IAdminTbaRequest) {
    const requestData: IAdminTbaRequestPreview = Object.assign({}, body);
    requestData.outgoingAmount = requestData.outgoingAmount.toString();
    return this.apiCallerService.call(() => (

      this.http.post(this.configService.config.api.account.tbaRequestAsAdmin(userId), requestData)

    ), 'apiCreateTbaRequestAsAdmin');
  }

  /**
   * Get incoming amount for transfer between users as admin
   * @param userId
   * @param {IAdminTbuRequestPreview} body
   * @returns {Observable<IIncomingAmount>}
   */
  public apiGetTbuRequestIncomingAmountAsAdmin(userId: string, body: IAdminTbuRequestPreview) {
    const requestData: IAdminTbuRequestPreview = Object.assign({}, body);
    requestData.outgoingAmount = requestData.outgoingAmount.toString();
    return this.apiCallerService.call(() => (
      this.http.post(this.configService.config.api.account.tbuRequestPreviewAsAdmin(userId), requestData)
    ), 'apiGetTbuRequestIncomingAmountAsAdmin');
  }

  /**
   * Create transfer between users request as admin
   * @param userId
   * @param {IAdminTbuRequest} body
   * @returns {Observable<ISuccessfulTransfer>}
   */
  public apiCreateTbuRequestAsAdmin(userId: string, body: IAdminTbuRequest) {
    const requestData: IAdminTbuRequest = Object.assign({}, body);
    requestData.outgoingAmount = requestData.outgoingAmount.toString();
    return this.apiCallerService.call(() => (
      this.http.post(this.configService.config.api.account.tbuRequestAsAdmin(userId), requestData)
    ), 'apiCreateTbuRequestAsAdmin');
  }

  /**
   * Get outgoing wire transfer total amount
   * @returns {Observable<any>}
   * @param body
   */
  public apiGetOwtRequestTotalAmount(body: IOwtRequestPreview) {
    const requestData: IOwtRequestPreview = {
      accountIdFrom: body.accountIdFrom,
      referenceCurrencyCode: body.referenceCurrencyCode,
      outgoingAmount: body.outgoingAmount.toString()
    };

    if (body.tanValue) {
      requestData.tanValue = body.tanValue;
    }
    if (body.feeId) {
      requestData.feeId = body.feeId;
    }
    return this.apiCallerService.call(() => (

      this.http.post(this.configService.config.api.account.owtRequestPreview, requestData)

    ), 'apiGetOwtRequestTotalAmount');
  }

  /**
   * Create outgoing wire transfer request
   * @param {IOwtRequest} body
   * @returns {Observable<any>}
   */
  public apiCreateOwtRequest(body: IOwtRequest) {
    const headers = {};

    if (body.tanValue) {
      headers['X-TAN'] = body.tanValue;
    }
    if (body.outgoingAmount) {
      body.outgoingAmount = body.outgoingAmount.toString();
    }

    return this.apiCallerService.call(() => (

      this.http.post(this.configService.config.api.account.owtRequest, body, { headers })

    ), 'apiCreateOwtRequest');
  }

  /**
   * Get outgoing wire transfer total amount as admin
   * @param {string} userId
   * @param {IOwtRequestPreview} body
   * @returns {Observable<any>}
   */
  public apiGetOwtRequestTotalAmountAsAdmin(userId: string, body: IOwtRequestPreview) {
    if (body.outgoingAmount) {
      body.outgoingAmount = body.outgoingAmount.toString();
    }

    return this.apiCallerService.call(() => (

      this.http.post(this.configService.config.api.account.owtRequestPreviewAsAdmin(userId), body)

    ), 'apiGetOwtRequestTotalAmountAsAdmin');
  }

  /**
   * Create outgoing wire transfer request as admin
   * @param {string} userId
   * @param {IOwtRequest} body
   * @returns {Observable<any>}
   */
  public apiCreateOwtRequestAsAdmin(userId: string, body: IOwtRequest) {
    if (body.outgoingAmount) {
      body.outgoingAmount = body.outgoingAmount.toString();
    }

    return this.apiCallerService.call(() => (

      this.http.post(this.configService.config.api.account.owtRequestAsAdmin(userId), body)

    ), 'apiCreateOwtRequestAsAdmin');
  }

  /**
   * Update request body by passed request id and request body
   * @param {string} id
   * @param {ISuccessfulTransfer} body
   * @returns {Observable<ISuccessfulTransfer>}
   */
  public apiUpdateRequestBodyByRequestId(id: string, body: ISuccessfulTransfer) {
    return this.apiCallerService.call(() => (
      this.http.patch(this.configService.config.api.account.updateRequestById(id), body)
    ), 'apiUpdateRequestBodyByRequestId');
  }

  /**
   * Update request status by passed request id and new status
   * @param {string} id
   * @param {string} status
   * @returns {Observable<ISuccessfulTransfer>}
   */
  public apiUpdateRequestStatusByRequestId(id: string, status: string) {
    const body = { status };

    return this.apiCallerService.call(() => (

      this.http.patch(this.configService.config.api.account.updateRequestById(id), body)

    ), 'apiUpdateRequestStatusByRequestId');
  }

  /**
   * Get list of requests by passed query params
   * @param {{}} params
   */
  public apiGetRequests(params: { [key: string]: string }) {
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.account.requests,
        {
          params
        }
      )
    ), 'apiGetTransferRequests');
  }

  /**
   * Get request by id
   * @param {number} id
   */
  public apiGetRequest(id: string) {
    return this.apiCallerService.call(() => (
      this.http.get(this.configService.config.api.account.getRequest(id))
    ), 'apiGetTransferRequest');
  }

  /**
   * Execute request by id
   * @param {number} id
   */
  public apiExecuteRequest(id: string) {
    return this.apiCallerService.call(() => (
      this.http.post(this.configService.config.api.account.executeRequest(id), {})
    ), 'apiExecuteTransferRequest');
  }

  /**
   * Cancel request by id with reason
   * @param {string} id
   * @param {string} reason
   */
  public apiCancelRequest(id: string, reason: string) {
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.account.cancelRequest(id),
        { reason },
      )
    ), 'apiCancelTransferRequest');
  }

  /**
   * Get incoming amount for card funding transfer
   * @param {ICftRequestPreview} body
   * @returns {Observable<IIncomingAmount>}
   */
  public apiGetCftRequestIncomingAmount(body: ICftRequestPreview) {
    const requestData: ICftRequestPreview = Object.assign({}, body);
    requestData.outgoingAmount = requestData.outgoingAmount.toString();
    return this.apiCallerService.call(() => (
      this.http.post(this.configService.config.api.account.cftRequestPreview, requestData)
    ), 'apiGetCftRequestIncomingAmount');
  }

  /**
   * Create  card funding request
   * @param {ICftRequest} body
   * @returns {Observable<ISuccessfulTransfer>}
   */
  public apiCreateCftRequest(body: ICftRequest) {
    const headers = {};

    if (body.tanValue) {
      headers['X-TAN'] = body.tanValue;
    }
    const requestData: ICftRequestPreview = Object.assign({}, body);
    requestData.outgoingAmount = requestData.outgoingAmount.toString();
    return this.apiCallerService.call(() => (

      this.http.post(this.configService.config.api.account.cftRequest, requestData, { headers })

    ), 'apiCreateCftRequest');
  }

  /**
   * @returns {Observable<any>}
   */
  public apiImportTransfersFromCsv(csv: FormData) {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.account.importTransfersFromCsv,
        csv,
        { headers }
      )
    ), 'apiImportTransfersFromCsv');
  }

  /**
   * @returns {Observable<any>}
   */
  public apiUpdateTransfersFromCsv(csv: FormData) {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.account.updateTransfersFromCsv,
        csv,
        { headers }
      )
    ), 'apiUpdateTransfersFromCsv');
  }

  /**  Returns rates for current main currency   */
  public apiRatesForMainCurrency(params: {}): Observable<DataResponceConvertParams> {
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.rate.forMainCurrency,
        { params }
      )
    ), 'apiRatesForMainCurrency');
  }

  /**
   * Get request by id
   * @param {number} id
   */
  public apiGetTransaction(id: string) {
    return this.apiCallerService.call(() => (
      this.http.get(this.configService.config.api.account.transactions.transactionById(id))
    ), 'apiGetTransaction');
  }

  /**
   * @returns {Observable<any>}
   */
  public apiExportTransfersToCsv(params: { [key: string]: string }) {
    const requestParams: { [key: string]: string } = Object.assign({}, params);
    if (requestParams['filter[createdAtFrom]']) {
      requestParams['filter[createdAtFrom]'] = moment((requestParams['filter[createdAtFrom]'])).startOf('day').utc().format();
    }
    if (requestParams['filter[createdAtTo]']) {
      requestParams['filter[createdAtTo]'] = moment((requestParams['filter[createdAtTo]'])).endOf('day').utc().format();
    }

    return this.http.get(
      this.configService.config.api.account.exportTransferRequestsToCsv,
      {
        params: requestParams,
        responseType: 'arraybuffer',
        observe: 'response'
      }
    ).pipe(
      map((res: HttpResponse<ArrayBuffer>): FileDownloadModel => {
          return new FileDownloadModel(
            new Blob([res.body], { type: 'text/csv' }),
            res.headers.get('Content-Disposition').split(';')[1].trim().split('=')[1]
          );
        }
      )
    );
  }
}
