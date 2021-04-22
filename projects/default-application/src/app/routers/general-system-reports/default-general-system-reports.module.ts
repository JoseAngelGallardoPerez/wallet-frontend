import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralSystemReportsModule } from '@lib/modules/admin-reports/general-system-reports/general-system-reports.module';
import { DefaultGeneralSystemReportsRouting } from '@default-routers/general-system-reports/default-general-system-reports.routing';

@NgModule({
  imports: [
    GeneralSystemReportsModule,
    RouterModule.forChild(DefaultGeneralSystemReportsRouting)]
})
export class DefaultGeneralSystemReportsModule {
}
