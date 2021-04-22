export interface SetPasswordInterface {
  proposedPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordInterface {
  newPassword: string;
  confirmPassword: string;
  uid: string;
}

export interface ChangePasswordInterface {
  previousPassword: string;
  proposedPassword: string;
  confirmPassword: string;
}

export interface SetSecurityQuestionsInterface {
  sqid: string;
  answer: string;
}
