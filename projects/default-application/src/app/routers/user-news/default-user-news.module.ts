import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserNewsModule } from '@lib/modules/user-news/user-news.module';
import { DefaultUserNewsRouting } from '@default-routers/user-news/default-user-news.routing';

@NgModule({
  imports: [
    UserNewsModule,
    RouterModule.forChild(DefaultUserNewsRouting)]
})
export class DefaultUserNewsModule {
}
