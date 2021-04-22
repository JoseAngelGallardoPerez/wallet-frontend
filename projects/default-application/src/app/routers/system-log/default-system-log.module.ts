import { NgModule } from '@angular/core';
import { DefaultSystemLogRouting } from '@default-application-app/routers/system-log/default-system-log.routing';
import { SystemLogModule } from '@lib/modules/system-log/system-log.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SystemLogModule,
    RouterModule.forChild(DefaultSystemLogRouting)]
})
export class DefaultSystemLogModule {
}
