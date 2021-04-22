export enum SmsProvidersKeys {
    PLIVO = 'plivo',
    TWILIO = 'twilio',
}

export const SMS_PROVIDERS_OPTIONS = [
    {
        key: SmsProvidersKeys.PLIVO,
        value: 'Plivo'
    },
    {
        key: SmsProvidersKeys.TWILIO,
        value: 'Twilio'
    }
];
