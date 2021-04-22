import { CustomActionInterface, staticImplementsDecorator } from '@interfaces/staticAction.interface';
import { Action } from '@ngrx/store';
import { buildReducer, checkToBeUniqueType } from '@helpers/redux-type-cashe';

export interface State {
  isLoggedIn: boolean;
  isAutoLogout: boolean;
}

export const initialAutoLogoutState: State = {
  isLoggedIn: false,
  isAutoLogout: false
};

export enum AutoLogoutActionsTypes {
  LOG_IN = '[AutoLogout] set path',
  LOG_OUT = '[AutoLogout] log out',
  EXTEND_LOGOUT_TIMER = '[AutoLogout] Extend the logout timer.',
  CLEAR_LOGOUT_TIMER = '[AutoLogout] Clear the logout timer.',
}

@staticImplementsDecorator<CustomActionInterface<LogIn, State>>()
export class LogIn implements Action {
  static type = checkToBeUniqueType(AutoLogoutActionsTypes.LOG_IN);
  readonly type = AutoLogoutActionsTypes.LOG_IN;

  static reduce(state: State, action: LogIn): State {
    return {
      isLoggedIn: true,
      isAutoLogout: false
    };
  }

  constructor() {
  }
}

@staticImplementsDecorator<CustomActionInterface<LogOut, State>>()
export class LogOut implements Action {
  static type = checkToBeUniqueType(AutoLogoutActionsTypes.LOG_OUT);
  readonly type = AutoLogoutActionsTypes.LOG_OUT;

  static reduce(state: State, action: LogOut): State {
    return {
      isLoggedIn: false,
      isAutoLogout: action.isAutoLogout
    };
  }

  constructor(public isAutoLogout: boolean) {
  }
}

@staticImplementsDecorator<CustomActionInterface<ExtendLogoutTimer, State>>()
export class ExtendLogoutTimer implements Action {
  static type = checkToBeUniqueType(AutoLogoutActionsTypes.EXTEND_LOGOUT_TIMER);
  readonly type = AutoLogoutActionsTypes.EXTEND_LOGOUT_TIMER;

  static reduce(state: State, action: ExtendLogoutTimer): State {
    return {
      ...state
    };
  }

  constructor() {
  }
}

@staticImplementsDecorator<CustomActionInterface<ClearLogoutTimer, State>>()
export class ClearLogoutTimer implements Action {
  static type = checkToBeUniqueType(AutoLogoutActionsTypes.CLEAR_LOGOUT_TIMER);
  readonly type = AutoLogoutActionsTypes.CLEAR_LOGOUT_TIMER;

  static reduce(state: State, action: ClearLogoutTimer): State {
    return { ...state };
  }

  constructor() {}
}

export const reducer = buildReducer(LogIn, LogOut, ExtendLogoutTimer, ClearLogoutTimer);
