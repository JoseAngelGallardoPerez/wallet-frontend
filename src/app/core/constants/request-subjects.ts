import { SelectItemInterface } from '@interfaces/selectItemInterface';

export const SUBJECT_TBA = 'TBA';
export const SUBJECT_TBU = 'TBU';
export const SUBJECT_OWT = 'OWT';
export const SUBJECT_CFT = 'CFT';
export const SUBJECT_CA = 'CA';
export const SUBJECT_DA = 'DA';

export const SUBJECT_TEXTS = {
  [SUBJECT_TBA]: 'Transfer Between Accounts',
  [SUBJECT_TBU]: 'Transfer Between Users',
  [SUBJECT_OWT]: 'Outgoing Wire Transfer',
  [SUBJECT_CFT]: 'Card Funding Transfer',
  [SUBJECT_CA]: 'Credit account',
  [SUBJECT_DA]: 'Debit account',
};
// SUBJECT_CA, SUBJECT_DA is not in the list, as it was specified by PM
export const REQUEST_TYPES: SelectItemInterface[] = [
    { key: '', value: 'All types' },
    { key: SUBJECT_TBA, value: SUBJECT_TEXTS[SUBJECT_TBA] },
    { key: SUBJECT_TBU, value: SUBJECT_TEXTS[SUBJECT_TBU] },
    { key: SUBJECT_OWT, value: SUBJECT_TEXTS[SUBJECT_OWT] },
    // { key: SUBJECT_CFT, value: SUBJECT_TEXTS[SUBJECT_CFT] },
  ];
