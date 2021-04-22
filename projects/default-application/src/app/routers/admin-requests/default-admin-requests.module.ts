import { NgModule } from '@angular/core';
import { AdminRequestsModule } from '@lib/modules/admin-requests/admin-requests.module';
import { DefaultAdminRequestsRouting } from '@default-application-app/routers/admin-requests/default-admin-requests.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    AdminRequestsModule,
    RouterModule.forChild(DefaultAdminRequestsRouting),
  ]
})

export class DefaultAdminRequestsModule {
}
