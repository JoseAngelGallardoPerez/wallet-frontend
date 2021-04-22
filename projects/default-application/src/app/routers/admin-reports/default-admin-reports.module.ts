import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminReportsModule } from '@lib/modules/admin-reports/admin-reports.module';
import { DefaultAdminReportsRouting } from '@default-routers/admin-reports/default-admin-reports.routing';

@NgModule({
  imports: [
    AdminReportsModule,
    RouterModule.forChild(DefaultAdminReportsRouting)]
})
export class DefaultAdminReportsModule {
}
