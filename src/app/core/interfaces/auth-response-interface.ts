import { TokenInterface } from '@interfaces/token-interface';

export interface AuthResponseInterface {
  AuthenticationResult: TokenInterface;
  ChallengeName: any;
  ChallengeParameters: any;
  Session: any;
}
