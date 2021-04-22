import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultUserCardsRouting } from '@default-routers/user-cards/default-user-cards.routing';
import { UserCardsModule } from '@lib/modules/user-cards/user-cards.module';

@NgModule({
  imports: [
    UserCardsModule,
    RouterModule.forChild(DefaultUserCardsRouting)]
})
export class DefaultUserCardsModule {
}
