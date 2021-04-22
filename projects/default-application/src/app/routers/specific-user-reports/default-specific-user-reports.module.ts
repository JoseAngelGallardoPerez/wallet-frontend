import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpecificUserReportsModule } from '@lib/modules/admin-reports/specific-user-reports/specific-user-reports.module';
import { DefaultSpecificUserReportsRouting } from '@default-routers/specific-user-reports/default-specific-user-reports.routing';

@NgModule({
  imports: [
    SpecificUserReportsModule,
    RouterModule.forChild(DefaultSpecificUserReportsRouting)]
})
export class DefaultSpecificUserReportsModule {
}
