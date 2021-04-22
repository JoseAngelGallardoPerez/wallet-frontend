import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoicesModule } from '@lib/modules/invoices/invoices.module';
import { DefaultInvoicesSuccessRouting } from '@default-routers/invoices/default-success-invoices.routing';

@NgModule({
  imports: [
    InvoicesModule,
    RouterModule.forChild(DefaultInvoicesSuccessRouting),
  ],
})

export class DefaultSuccessInvoicesModule {
}
