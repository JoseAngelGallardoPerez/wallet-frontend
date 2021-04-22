/**
 * Incoming Amount
 */

export interface IAmountDetails {
  amount: string;
  currencyCode: string;
  purpose: string;
}

export interface IIncomingAmount {
  incomingAmount: string;
  incomingCurrencyCode?: string;
  details?: IAmountDetails[];
}

/**
 * User transfer between accounts
 */
export interface ITbaRequestPreview {
  accountIdFrom: number;
  accountIdTo: number;
  outgoingAmount: string;
  description: string;
  tanValue?: string;
}

export interface ITbaRequest extends ITbaRequestPreview, IIncomingAmount {
}

/**
 * User transfer between users
 */
export interface ITbuRequestPreview {
  accountIdFrom: number;
  userName: string;
  accountNumberTo: string;
  outgoingAmount: string;
  description: string;
  tanValue?: string;
}

export interface ITbuRequest extends ITbuRequestPreview, IIncomingAmount {
}

/**
 * Admin transfer between accounts
 */
export interface IAdminTbaRequestPreview extends ITbaRequestPreview {
  userId: string;
}

export interface IAdminTbaRequest extends ITbaRequest {
  userId: string;
}

/**
 * Admin transfer between users
 */
export interface IAdminTbuRequestPreview {
  accountIdFrom: string;
  userName: string;
  accountNumberTo: string;
  outgoingAmount: string;
  description: string;
}

export interface IAdminTbuRequest extends IAdminTbuRequestPreview, IIncomingAmount {
}

/**
 * User card funding transfer
 */
export interface ICftRequestPreview {
  accountIdFrom: number;
  cardIdTo: string;
  outgoingAmount: string;
  description: string;
  tanValue?: string;
}

export interface ICftRequest extends ICftRequestPreview, IIncomingAmount {
}

/**
 * Outgoing wire transfer
 */

export interface ITotalOutgoingAmount {
  totalOutgoingAmount: string;
  details?: IAmountDetails[];
}

export interface IOwtRequestPreview {
  accountIdFrom: number;
  referenceCurrencyCode: number;
  outgoingAmount: string;
  tanValue?: string;
  feeId?: number;
}

export interface IOwtRequest extends IOwtRequestPreview {
  confirmTotalOutgoingAmount: string;
  description: string;
  refMessage: string;
  bankSwiftBic: string;
  bankName: string;
  bankAddress: string;
  bankLocation: string;
  bankCountryId: number;
  bankAbaRtn: string;
  customerName: string;
  customerAddress: string;
  customerAccIban: string;
  isIntermediaryBankRequired: boolean;
  intermediaryBankSwiftBic: string;
  intermediaryBankName: string;
  intermediaryBankAddress: string;
  intermediaryBankLocation: string;
  intermediaryBankCountryId: number;
  intermediaryBankAbaRtn: string;
  intermediaryBankAccIban: string;
  feeId?: number;
}

/**
 * Base transfer request preview
 */
export interface ISuccessfulTransfer {
  id: number;
  userId: string;
  status: string;
  subject: string;
  rate: string;
  description: string;
  createdAt: string;
}

export interface PreviewConvertParams {
  baseCurrencyCode: string;
  referenceCurrencyCode: string;
}

export interface DataResponceConvertParams {
  data: ResponceConvertParams;
  error?: boolean;
}

export interface ResponceConvertParams {
  rateValue: string;
  exchangeMargin: string;
  baseCurrencyCode: string;
  referenceCurrencyCode: string;
}

export type PreviewTransactionRequest = ITbaRequestPreview | ITbuRequestPreview | IAdminTbaRequestPreview | IAdminTbuRequestPreview
  | ICftRequestPreview | IOwtRequestPreview;

export type CreateTransactionRequest = ITbaRequest | ICftRequest | ITbuRequest | IAdminTbaRequest
  | IAdminTbuRequest | IOwtRequest;
