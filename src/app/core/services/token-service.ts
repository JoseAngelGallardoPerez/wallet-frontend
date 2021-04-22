import { Injectable } from '@angular/core';
import { TokenInterface } from '@interfaces/token-interface';
import { StorageService } from '@services/storage.service';
import { TEMP_AUTH_HEADER_NAME } from '@constants/signUp';
import { TEMP_TOKEN_NAME, TOKEN_NAME } from '@constants/token-name';

@Injectable()
export class TokenService {

  constructor(
    private storage: StorageService,
  ) {
  }

  public saveTokenFromResponse(response: { data: { accessToken: string, refreshToken: string } }): void {
    if (!response.data || !response.data.accessToken || !response.data.refreshToken) {
      throw new Error('Access or refresh token is not found in the response');
    }
    const token: TokenInterface = {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken
    };
    this.saveToken(token);
  }

  public saveToken(token: { accessToken: string, refreshToken: string }): void {
    if (!token.accessToken || !token.refreshToken) {
      throw new Error('Access or refresh token is not found');
    }

    this.storage.setItem(TOKEN_NAME, JSON.stringify(token));
  }

  public saveTempAuthToken(token: string): void {
    if (!token) {
      throw new Error(TEMP_AUTH_HEADER_NAME + 'token is not found');
    }
    this.storage.setItem(TEMP_TOKEN_NAME, JSON.stringify(token));
  }

  public getTempAuthToken() {
    return this.isTempAuthTokenStored() ? JSON.parse(this.storage.getItem(TEMP_TOKEN_NAME)) : null;
  }

  public isTempAuthTokenStored(): boolean {
    const token = this.storage.getItem(TEMP_TOKEN_NAME);
    return !!(JSON.parse(token));
  }

  public removeToken(): void {
    this.storage.clear();
  }

  public getToken(): TokenInterface | null {
    return this.isTokenStored() ? JSON.parse(this.storage.getItem(TOKEN_NAME)) : null;
  }

  public isTokenStored(): boolean {
    const token = this.storage.getItem(TOKEN_NAME);
    return !!token &&
      JSON.parse(token)['accessToken'] &&
      JSON.parse(token)['refreshToken'];
  }
}
