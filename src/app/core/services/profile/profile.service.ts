import { Injectable } from '@angular/core';
import { ProfileFilter } from '@interfaces/profile-filter-interface';
import { Observable, Subject } from 'rxjs';
import { PaginationService } from '@services/pagination/pagination.service';
import { ProfileApiService } from '@services/profile/profile-api.service';
import { ProfileModel } from '@models/profile-model';
import { PaginationPageLimitInterface } from '@interfaces/pagination-page-limit.interface';
import { map, switchMap, take } from 'rxjs/operators';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import * as FileSaver from 'file-saver';
import { FileDownloadModel } from '@models/file-download.model';
import { QueryFieldInterface } from '@interfaces/sort-bar/queryField.interface';
import { DateToFromFieldInterface } from '@interfaces/sort-bar/dateToFromField.interface';
import { SortFieldInterface } from '@interfaces/sort-bar/sortField.interface';
import { PaginationFieldInterface } from '@interfaces/sort-bar/paginationField.interface';
import { queryParamsStringify } from '@helpers/queryParamsHelpers';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';

export type UserProfilesRequestFilter =
  QueryFieldInterface
  & DateToFromFieldInterface
  & SortFieldInterface
  & PaginationFieldInterface
  & {
  status: string,
  userGroupId: string,
  roleName: string;
};

export type AdminProfilesRequestFilter =
  QueryFieldInterface
  & DateToFromFieldInterface
  & SortFieldInterface
  & PaginationFieldInterface
  & {
  status: string, classId: string, roleName: string;
};

export type SortAndPaginationFilter = SortFieldInterface & PaginationFieldInterface;

@Injectable()
export class ProfileService {

  public loadUsersProfilesSubject$: Subject<UserProfilesRequestFilter> = new Subject<UserProfilesRequestFilter>();

  public onLoadUsersProfiles$: Observable<{ profiles: ProfileModel[], pagination: PaginationPageLimitInterface }> = this
    .loadUsersProfilesSubject$.asObservable()
    .pipe(map((query: UserProfilesRequestFilter) => ProfileService.transformUserRequestParams(query)),
      switchMap((params: { [key: string]: string }) => this.apiService.apiLoadUserProfiles(params)),
      map(({ data, error, links }: CallResponceInterface) => {
        if (error) {
          return { profiles: [], pagination: PaginationService.defaultPaginationPageLimit };
        }
        const profiles = (<{ items: any[] }>data).items.map((item) => new ProfileModel(item));

        const pagination = PaginationService.buildPaginationPageLimit(<any>data);
        return { profiles, pagination };
      }));

  public loadAdminsProfilesSubject$: Subject<AdminProfilesRequestFilter> = new Subject<AdminProfilesRequestFilter>();

  public onLoadAdminsProfiles$: Observable<{ profiles: ProfileModel[], pagination: PaginationPageLimitInterface }> = this
    .loadAdminsProfilesSubject$.asObservable()
    .pipe(map((query: AdminProfilesRequestFilter) => ProfileService.transformAdminRequestParams(query)),
      switchMap((params: { [key: string]: string }) => this.apiService.apiLoadAdminProfiles(params)),
      map(({ data, error }: CallResponceInterface) => {
        if (error) {
          return { profiles: [], pagination: PaginationService.defaultPaginationPageLimit };
        }
        const profiles = (<{ items: any[] }>data).items.map((item) => new ProfileModel(item));

        const pagination = PaginationService.buildPaginationPageLimit(<any>data);
        return { profiles, pagination };
      }));

  private onFilterChangeSubject$: Subject<ProfileFilter> = new Subject<ProfileFilter>();

  public onFilterChange$: Observable<ProfileFilter> = this.onFilterChangeSubject$.asObservable();

  public constructor(
    private apiService: ProfileApiService,
  ) {
  }

  public static transformToSortPaginationFilter(queryParams: SortAndPaginationFilter): ProfileFilter {
    return {
      sort: queryParams.sort, page: queryParams.page, limit: queryParams.size, filter: { isBlocked: true }
    };
  }

  private static transformUserRequestParams(queryParams: UserProfilesRequestFilter, forCsv = false): { [key: string]: string } {
    const params = {
      sort: queryParams.sort, filter: { roleName: queryParams.roleName }
    };

    if (!forCsv) {
      params['page'] = queryParams.page;
      params['limit'] = queryParams.size;
    }

    if (queryParams.query) {
      params.filter['query'] = queryParams.query;
    }
    if (queryParams.userGroupId) {
      params.filter['userGroupId'] = queryParams.userGroupId;
    }
    if (queryParams.dateTo) {
      params.filter['dateTo'] = moment(queryParams.dateTo).endOf('day').utc().format();
    }
    if (queryParams.dateFrom) {
      params.filter['dateFrom'] = moment(queryParams.dateFrom).startOf('day').utc().format();
    }

    if (queryParams.status) {
      params.filter['status'] = queryParams.status;
    }
    return queryParamsStringify(params);
  }

  private static transformAdminRequestParams(queryParams: AdminProfilesRequestFilter, forCsv = false): { [key: string]: string } {
    const params = {
      sort: queryParams.sort, filter: { roleName: ['admin', 'root'] }
    };

    if (!forCsv) {
      params['page'] = queryParams.page;
      params['limit'] = queryParams.size;
    }

    if (queryParams.query) {
      params.filter['query'] = queryParams.query;
    }

    if (queryParams.dateTo) {
      params.filter['dateTo'] = moment(queryParams.dateTo).endOf('day').utc().format();
    }

    if (queryParams.dateFrom) {
      params.filter['dateFrom'] = moment(queryParams.dateFrom).startOf('day').utc().format();
    }

    if (queryParams.status) {
      params.filter['status'] = queryParams.status;
    }

    if (queryParams.classId) {
      params.filter['classId'] = queryParams.classId;
    }

    return queryParamsStringify(params);
  }

  public loadUserProfile(id: string): Observable<ProfileModel> {
    return this.apiService.apiLoadProfile(id).pipe(
      map(
        ({ data }: {
          data: {}, error: boolean,
        }): ProfileModel => {
          return new ProfileModel(data);
        }));
  }

  public loadMyProfile(): Observable<ProfileModel> {
    return this.apiService.apiLoadMyProfile().pipe(
      map(
        ({ data }: {
          data: {}, error: boolean,
        }): ProfileModel => {
          return new ProfileModel(data);
        }));
  }

  public loadLimitedMyProfile(): Observable<ProfileModel> {
    return this.apiService.apiLoadLimitedMyProfile().pipe(
      map(
        ({ data }: {
          data: {}, error: boolean,
        }): ProfileModel => {
          return new ProfileModel(data);
        }));
  }

  public exportUserProfilesToCsv(query: UserProfilesRequestFilter) {
    this.apiService
      .apiExportUserProfilesToCsv(ProfileService.transformUserRequestParams(query, true))
      .pipe(take(1))
      .subscribe((data: FileDownloadModel) => {
        FileSaver.saveAs(data.blob, data.filename);
      });
  }

  public exportAdminProfilesToCsv(query: AdminProfilesRequestFilter) {
    this.apiService.apiExportAdminProfilesToCsv(ProfileService.transformAdminRequestParams(query))
      .pipe(take(1))
      .subscribe((data: FileDownloadModel) => {
        FileSaver.saveAs(data.blob, data.filename);
      });
  }
}
