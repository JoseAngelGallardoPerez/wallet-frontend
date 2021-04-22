import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreOptionsModel } from '@models/option.model';
import { select, Store } from '@ngrx/store';
import * as FromProfiles from '@components/profiles/reducers';
import { filter, map } from 'rxjs/operators';
import * as OptionActions from '@components/profiles/actions/option.actions';
import { OptionsHelper } from '@helpers/options.helper';
import {
  OptionsPaths,
  OptionsPrefixes,
  optionsValuesNames,
  optionsValuesPaths,
  pathOptionsPrefixes,
  publicPaths,
  userOptionNames
} from '@app/core/constants/optionsPrefixes';
import * as FromApp from '@app/reducers/app.reducer';
import * as FromModule from '@app/reducers/app.reducer';
import { getUserPermissionForKey } from '@app/reducers/app.reducer';
import { UserPermissionsActions } from '@app/actions';
import { UserPermissions } from '@app/core/constants/userPermissions';
import { UserPermissionModel } from '@models/userPermission.model';
import { SiteTextKeys } from '@app/core/constants/siteTextKeys';
import { once } from '@helpers/once.operator';
import { SiteTextModel } from '@models/siteText.model';
import * as SiteTextActions from '@app/actions/siteText.actions';

const ENABLE_VALUE = 'enable';

@Injectable()
export class AppOptionsService {
  private static isLoadedPermissions: boolean;
  private optionsPipes: Map<OptionsPaths, Observable<{ [key: string]: boolean | string }>> = new Map();

  constructor(
    private store: Store<FromProfiles.OptionsState>,
    private permissionsStore: Store<FromApp.UserPermissionsState>,
  ) {
  }

  public clearOptions() {
    this.optionsPipes.clear();
  }

  public deleteOptions(path) {
    if (this.optionsPipes.has(path)) {
      this.optionsPipes.delete(path);
    }
  }

  public deleteOptionsValuePipe(valueName: optionsValuesNames) {
    this.deleteOptions(optionsValuesPaths.get(valueName));
  }

  public getOptions(path: OptionsPaths): Observable<{ [key: string]: boolean | string }> {
    if (!this.optionsPipes.has(path)) {
      this.optionsPipes.set(path, this.getFromStoreOrAPI(path));
    }
    return this.optionsPipes.get(path);
  }

  public getOptionsValuePipe(valueName: optionsValuesNames): Observable<boolean | string> {
    return this.getOptions(optionsValuesPaths.get(valueName)).pipe(
      map((data: { [key: string]: boolean | string }): string => <string>data[valueName]
      ));
  }

  public getUserOption(valueName: userOptionNames): Observable<boolean> {
    return this.getOptions(OptionsPaths.USER_OPTIONS).pipe(
      filter((data: { [key: string]: string }) => Object.keys(data).length !== 0),
      map((data: { [key: string]: string }): boolean => {
          if (valueName === userOptionNames.BENEFICIAL_OWNER) {
            return data[valueName] === ENABLE_VALUE;
          }
          const helper = new OptionsHelper(OptionsPrefixes.USER_OPTIONS_FIELD_USER);
          return <boolean>helper.parseValue(data[valueName]);
        }
      ));
  }

  public getUserPermissionForKey(key: UserPermissions): Observable<boolean> {
    if (!AppOptionsService.isLoadedPermissions) {
      this.loadPermissions();
    }
    return this.permissionsStore.pipe(select(getUserPermissionForKey(key)))
      .pipe(filter((permission: UserPermissionModel): boolean => !!permission),
        map((permission: UserPermissionModel): boolean => permission.isAllowed));
  }

  public getSiteTextForKey(key: SiteTextKeys): Observable<string> {
    return this.getSiteTextFromStoreOrAPI()
      .pipe(map((data: { [key: string]: string }): string => data[key]));
  }

  public loadOptionsFromApi(path: OptionsPaths): void {
    this.store.dispatch(new OptionActions.LoadOptions({ path, publicPath: publicPaths.includes(path) }));
  }

  private getFromStoreOrAPI(path: OptionsPaths): Observable<{ [key: string]: boolean | string }> {
    this.store.dispatch(new OptionActions.LoadOptions({ path, publicPath: publicPaths.includes(path) }));
    const optionsHelper = new OptionsHelper(pathOptionsPrefixes.get(path));
    return this.store.pipe(
      select(FromProfiles.getPathOptions(path)),
      map((options: StoreOptionsModel | null) => options || { options: [] }),
      map((options: StoreOptionsModel):
      { [key: string]: boolean | string } => optionsHelper.optionsArrayToPureObject(options.options))
    );
  }

  private loadPermissions() {
    this.permissionsStore.dispatch(new UserPermissionsActions.LoadUserPermissions());
    AppOptionsService.isLoadedPermissions = true;
  }

  private getSiteTextFromStoreOrAPI(): Observable<{ [key: string]: boolean | string }> {
    return this.store.pipe(
      select(FromModule.selectAllSiteTexts),
      once((data: SiteTextModel[]) => {
        if (!data.length) {
          this.store.dispatch(new SiteTextActions.LoadSiteText());
        }
      }),
      map((texts: SiteTextModel[]): { [key: string]: string } => {
        const data = {};
        texts.forEach((text: SiteTextModel) => data[text.key] = text.value);
        return data;
      })
    );
  }
}
