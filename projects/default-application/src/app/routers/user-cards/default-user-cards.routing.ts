import { UserAccountCardsComponent } from '@lib/modules/user-cards/components/user-account-cards/user-account-cards.component';
import { CardsForUserResolver } from '@shared-modules/cards/resolvers/cards-for-user.resolver';

export const DefaultUserCardsRouting = [

  {
    path: '',
    component: UserAccountCardsComponent,
    resolve: {
      cards: CardsForUserResolver
    }
  },
];
