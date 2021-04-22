import { MessageCodes } from '@constants/textCodes';

export const TextDictionary: Map<string, string> = new Map<string, string>([
  [MessageCodes.transfers.successMessages.user.executed, 'Transfer has been executed successfully.'],
  [MessageCodes.transfers.successMessages.user.processed, 'Your transaction is being processed.'],
  [MessageCodes.transfers.successMessages.admin, 'Success! The transaction was executed.'],
]);
