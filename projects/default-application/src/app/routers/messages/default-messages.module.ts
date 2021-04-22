import { NgModule } from '@angular/core';
import { DefaultMessagesRouting } from '@default-routers//messages/default-messages.routing';
import { MessagesModule } from '@lib/modules/messages/messages.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    MessagesModule,
    RouterModule.forChild(DefaultMessagesRouting),
  ]
})

export class DefaultMessagesModule {
}
