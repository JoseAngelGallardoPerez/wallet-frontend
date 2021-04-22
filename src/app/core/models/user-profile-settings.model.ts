import { mergeSnackKeysProperties } from '@helpers/stringHelpers';

export class UserProfileSettings {
  public uid: string;
  public internalNotificationWhenExecuted: string;
  public internalNotificationWhenReceivedTransfer: string;
  public emailNotificationWhenInternalMessage: string;
  public emailNotificationWhenLoginFails: string;
  public emailNotificationWhenFundsAdded: string;
  public emailNotificationWhenNewFileUploaded: string;
  public emailNotificationWhenRegistrationRequestCreated: string;
  public emailNotificationWhenTransferRequestCreated: string;
  public internalNotificationWhenProcessed: string;
  public internalNotificationWhenProcessedWasExecuted: string;
  public internalNotificationWhen_backToPending: string;
  public internalNotificationWhenCancelPending: string;
  public internalNotificationWhenCancelProcessed: string;
  public emailNotificationUnreadNewsAvailable: string;
  public emailNotificationWhenEasytransacTransactionFail: string;

  constructor(data: object) {
    mergeSnackKeysProperties(this, data);
  }
}
