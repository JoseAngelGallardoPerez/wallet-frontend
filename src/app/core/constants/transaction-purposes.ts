export const FEE_PURPOSE = 'fee_default_transfer';
export const FEE_EXCHANGE_MARGIN = 'fee_exchange_margin';
export const REVENUE_EXCHANGE_MARGIN = 'revenue_exchange_margin';
export const REVENUE_TBA_TRANSFER = 'revenue_tba_transfer';
export const REVENUE_CFT_TRANSFER = 'revenue_cft_transfer';
export const REVENUE_OWT_TRANSFER = 'revenue_owt_transfer';

export const TBA_OUTGOING_PURPOSE = 'tba_outgoing';
export const TBA_INCOMING_PURPOSE = 'tba_incoming';

export const TBU_OUTGOING_PURPOSE = 'tbu_outgoing';
export const TBU_INCOMING_PURPOSE = 'tbu_incoming';

export const OWT_OUTGOING_PURPOSE = 'owt_outgoing';

export const CFT_OUTGOING_PURPOSE = 'cft_outgoing';
export const CFT_INCOMING_PURPOSE = 'cft_incoming';

export const CA_PURPOSE = 'credit_account';
export const DA_PURPOSE = 'debit_account';
export const CR_PURPOSE = 'credit_revenue';
export const DR_PURPOSE = 'debit_revenue';

export const REVENUE_PURPOSES = [
  REVENUE_EXCHANGE_MARGIN,
  REVENUE_TBA_TRANSFER,
  DR_PURPOSE, CR_PURPOSE,
  REVENUE_CFT_TRANSFER,
  REVENUE_OWT_TRANSFER
];

export const TRANSACTIONS_PURPOSES = {
  OWT_OUTGOING: OWT_OUTGOING_PURPOSE,
  TBA_OUTGOING: TBA_OUTGOING_PURPOSE,
  TBA_INCOMING: TBA_INCOMING_PURPOSE,
  TBU_OUTGOING: TBU_OUTGOING_PURPOSE,
  TBU_INCOMING: TBU_INCOMING_PURPOSE,
  CFT_OUTGOING: CFT_OUTGOING_PURPOSE,
  CFT_INCOMING: CFT_INCOMING_PURPOSE,
  CA: CA_PURPOSE,
  DA: DA_PURPOSE,
  CR: CR_PURPOSE,
  DR: DR_PURPOSE,
};
