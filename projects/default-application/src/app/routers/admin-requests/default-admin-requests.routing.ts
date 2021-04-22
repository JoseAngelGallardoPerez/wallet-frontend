import { RequestsComponent } from '@app/modules/admin-requests/components/requests.component';
import { TransferRequestsComponent } from '@app/modules/admin-requests/components/transfer-requests/transfer-requests.component';
import { AdminViewRequestComponent } from '@app/modules/admin-requests/components/admin-view-request/admin-view-request.component';
import { RegistrationRequestsComponent } from '@app/modules/admin-requests/components/registration-requests/registration-requests.component';
import { ViewRegistrationRequestComponent } from '@app/modules/admin-requests/components/view-registration-request/view-registration-request.component';
import { RegistrationRequestResolver } from '@app/modules/admin-requests/resolvers/registration-request.resolver';
import { TransferRequestResolver } from '@shared-modules/request-components/resolvers/transfer-request.resolver';
import { UserCurrenciesResolver } from '@shared-modules/currency/resolvers/user-currencies.resolver';
import { CurrenciesFilter } from '@resolvers/currency/currencies.resolver';
import { KycRequestsComponent } from '@lib/modules/admin-requests/components/kyc-requests/kyc-requests.component';

export const DefaultAdminRequestsRouting = [

  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'transfer-requests',
      },
      {
        path: 'transfer-requests',
        component: TransferRequestsComponent,
        data: {
          crumbs: 'Transfer Requests',
          showTabs: true,
          currenciesFilters: CurrenciesFilter.Active,
        },
        resolve: {
          currencies: UserCurrenciesResolver,
        },
      },
      {
        path: 'transfer-requests/:id',
        component: AdminViewRequestComponent,
        resolve: {
          requestData: TransferRequestResolver,
        },
        data: {
          crumbs: 'Transfer Request Details',
        }
      },
      {
        path: 'kyc-requests',
        component: KycRequestsComponent,
        data: {
          crumbs: 'KYC Requests',
          showTabs: true,
        },
      },
      {
        path: 'registration-requests',
        component: RegistrationRequestsComponent,
        data: {
          crumbs: 'Requests',
          showTabs: true,
        },
      },
      {
        path: 'view-registration-request/:id',
        component: ViewRegistrationRequestComponent,
        resolve: {
          request: RegistrationRequestResolver
        }
      }
    ]
  }
];
