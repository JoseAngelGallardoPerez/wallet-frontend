import { CustomActionInterface, staticImplementsDecorator } from '@interfaces/staticAction.interface';
import { Action } from '@ngrx/store';
import { buildReducer, checkToBeUniqueType } from '@helpers/redux-type-cashe';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ApiError } from '@models/api-error.model';
import { SiteTextModel } from '@models/siteText.model';

export interface State extends EntityState<SiteTextModel> {
  loading: boolean;
  errors: ApiError[];
}

export const siteTextAdapter: EntityAdapter<SiteTextModel> = createEntityAdapter<SiteTextModel>({
  selectId: (text: SiteTextModel) => text.key,
});

export const initialSiteTextState: State = siteTextAdapter.getInitialState({
  loading: false,
  errors: []
});

export enum SiteTextActionsTypes {
  LOAD_SITE_TEXT = '[SiteText] load site text',
  LOAD_SITE_TEXT_SUCCESS = '[SiteText/API] load site text success',
  UPDATE_SITE_TEXT = '[SiteText] update site text',
  UPDATE_SITE_TEXT_SUCCESS = '[SiteText/API] update site text success',
  REQUEST_FAILURE = '[SiteText /API] request Failure',
}

@staticImplementsDecorator<CustomActionInterface<LoadSiteText, State>>()
export class LoadSiteText implements Action {
  static type = checkToBeUniqueType(SiteTextActionsTypes.LOAD_SITE_TEXT);
  readonly type = SiteTextActionsTypes.LOAD_SITE_TEXT;

  constructor() {
  }

  static reduce(state: State, action: LoadSiteText): State {
    return {
      ...state,
      loading: true,
      errors: []
    };
  }
}

@staticImplementsDecorator<CustomActionInterface<LoadSiteTextSuccess, State>>()
export class LoadSiteTextSuccess implements Action {
  static type = checkToBeUniqueType(SiteTextActionsTypes.LOAD_SITE_TEXT_SUCCESS);
  readonly type = SiteTextActionsTypes.LOAD_SITE_TEXT_SUCCESS;

  constructor(public texts: SiteTextModel[]) {
  }

  static reduce(state: State, action: LoadSiteTextSuccess): State {
    return {
      ...siteTextAdapter.upsertMany(action.texts, state),
      loading: false
    };
  }
}

@staticImplementsDecorator<CustomActionInterface<RequestFailure, State>>()
export class RequestFailure implements Action {
  static type = checkToBeUniqueType(SiteTextActionsTypes.REQUEST_FAILURE);
  readonly type = SiteTextActionsTypes.REQUEST_FAILURE;

  constructor(public errors: ApiError[]) {
  }

  static reduce(state: State, action: RequestFailure): State {
    return {
      ...state,
      errors: action.errors,
    };
  }
}

@staticImplementsDecorator<CustomActionInterface<UpdateSiteText, State>>()
export class UpdateSiteText implements Action {
  static type = checkToBeUniqueType(SiteTextActionsTypes.UPDATE_SITE_TEXT);
  readonly type = SiteTextActionsTypes.UPDATE_SITE_TEXT;

  constructor(public texts: { [key: string]: string }) {
  }

  static reduce(state: State, action: UpdateSiteText): State {
    return {
      ...state,
      loading: true,
      errors: []
    };
  }
}

@staticImplementsDecorator<CustomActionInterface<UpdateSiteTextSuccess, State>>()
export class UpdateSiteTextSuccess implements Action {
  static type = checkToBeUniqueType(SiteTextActionsTypes.UPDATE_SITE_TEXT_SUCCESS);
  readonly type = SiteTextActionsTypes.UPDATE_SITE_TEXT_SUCCESS;

  constructor(public texts: SiteTextModel[]) {
  }

  static reduce(state: State, action: UpdateSiteTextSuccess): State {
    return {
      ...siteTextAdapter.upsertMany(action.texts, state),
      loading: false,
    };
  }
}

export const reducer = buildReducer(LoadSiteText,
  LoadSiteTextSuccess,
  RequestFailure,
  UpdateSiteText,
  UpdateSiteTextSuccess);
