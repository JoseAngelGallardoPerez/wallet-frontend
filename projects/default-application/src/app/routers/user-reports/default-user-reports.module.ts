import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserReportsModule } from '@lib/modules/user-reports/user-reports.module';
import { DefaultUserReportsRouting } from '@default-routers/user-reports/default-user-reports.routing';

@NgModule({
  imports: [
    UserReportsModule,
    RouterModule.forChild(DefaultUserReportsRouting)]
})
export class DefaultUserReportsModule {
}
