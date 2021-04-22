export const VERIFICATION_STATUSES = [
  { key: 'personal_id', value: 'Personal Id File' },
  { key: 'personal_photo', value: 'Personal Photo' },
  { key: 'credit_rating', value: 'Credit Rating Document' },
];

export enum Verification {
  ID_PERSONAL = 'personal_id',
  PHOTO_PERSONAL = 'personal_photo',
  CREDIT_RATING = 'credit_rating'
}
