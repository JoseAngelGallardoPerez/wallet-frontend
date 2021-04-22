import { NgModule } from '@angular/core';
import { AdminNewsModule } from '@lib/modules/admin-news/admin-news.module';
import { DefaultAdminNewsRouting } from '@default-application-app/routers/admin-news/default-admin-news.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    AdminNewsModule,
    RouterModule.forChild(DefaultAdminNewsRouting),
  ]
})

export class DefaultAdminNewsModule {
}
