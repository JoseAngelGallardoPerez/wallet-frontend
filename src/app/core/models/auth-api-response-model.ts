export class AuthApiResponseModel {
  public status: number;
  public data: {
    accessToken: string;
    refreshToken: string;
  };
}
