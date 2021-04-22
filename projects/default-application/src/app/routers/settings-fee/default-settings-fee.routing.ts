import { CurrenciesFilter, CurrenciesResolver } from '@resolvers/currency/currencies.resolver';
import { FeeListResolver } from '@app/modules/settings-fee/resolvers/fee-list.resolver';
import { FeeResolver } from '@app/modules/settings-fee/resolvers/fee.resolver';
import { FeeParametersResolver } from '@app/modules/settings-fee/resolvers/feeParameters.resolver';
import { CreateFeeResolver } from '@app/modules/settings-fee/resolvers/createFee.resolver';
import { CftGuard } from '@app/modules/settings-fee/guards/cft.guard';
import { FeeRequestSubjects } from '@models/fee.model';
import { CreateNewFeeComponent } from '@lib/modules/settings-fee/components/create-new-fee/create-new-fee.component';
import { TbaFeeComponent } from '@lib/modules/settings-fee/components/tba-fee/tba-fee.component';
import { FeeComponent } from '@lib/modules/settings-fee/components/fee.component';

export const DefaultSettingsFeeRouting = [

  {
    path: '',
    component: FeeComponent,
    data: {
      crumbs: 'Fees Settings',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: FeeRequestSubjects.TBA,
      },
      {
        path: ':requestSubject',
        component: TbaFeeComponent,
        canActivate: [CftGuard],
        data: {
          showTabs: true,
          showTopTabs: true
        },
        resolve: {
          fees: FeeListResolver
        }
      },
      {
        path: ':requestSubject/new',
        component: CreateNewFeeComponent,
        resolve: {
          currencies: CurrenciesResolver,
          fees: CreateFeeResolver
        },
        data: {
          currenciesFilters: CurrenciesFilter.Active,
          crumbs: `Create New Fee`,
        },
      },
      {
        path: ':requestSubject/:id',
        component: CreateNewFeeComponent,
        resolve: {
          fee: FeeResolver,
          parameters: FeeParametersResolver,
          currencies: CurrenciesResolver
        },
        data: {
          currenciesFilters: CurrenciesFilter.Active,
          crumbs: 'Edit Fee',
        },
      }
    ]
  }
];
