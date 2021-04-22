import { NgModule } from '@angular/core';
import { TransferModule } from '@lib/modules/transfer/transfer.module';
import { RouterModule } from '@angular/router';
import { DefaultTransferRouting } from '@default-routers//transfer/default-transfer.routing';

@NgModule({
  imports: [
    TransferModule,
    RouterModule.forChild(DefaultTransferRouting)]
})
export class DefaultTransferModule {
}
