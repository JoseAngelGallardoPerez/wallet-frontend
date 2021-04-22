import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoicesModule } from '@lib/modules/invoices/invoices.module';
import { DefaultInvoicesBuyerRouting } from '@default-routers/invoices/default-invoices.routing';

@NgModule({
  imports: [
    InvoicesModule,
    RouterModule.forChild(DefaultInvoicesBuyerRouting),
  ],
})

export class DefaultInvoicesModule {
}
