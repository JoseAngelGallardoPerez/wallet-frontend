import { DatepickerBaseOptionsResolver } from '@resolvers/datepickerBaseOptions.resolver';
import { MessagesLayoutComponent } from '@app/modules/messages/components/messages-layout.component';
import { MessageHistoryComponent } from '@app/modules/messages/components/message-history/message-history.component';
import { ConversationComponent } from '@app/modules/messages/components/conversation/conversation.component';
import { NewMessageComponent } from '@app/modules/messages/components/new-message/new-message.component';
import { MessageResolver } from '@app/modules/messages/resolvers/message.resolver';
import { ConversationResolver } from '@app/modules/messages/resolvers/conversation.resolver';

export const DefaultMessagesRouting = [
  {
    path: 'new',
    component: NewMessageComponent,
    data: {
      crumbs: 'New message',
    },
  },
  {
    path: '',
    component: MessagesLayoutComponent,
    resolve: {
      datepickerOptions: DatepickerBaseOptionsResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all',
      },
      {
        path: ':type',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: MessageHistoryComponent,
            resolve: {
              messages: MessageResolver
            },
            data: {
              crumbs: 'Chat',
            }
          }
        ]
      },
    ]
  },
  {
    path: ':type',
    data: {
      crumbs: null,
    },
    children: [
      {
        path: ':id',
        component: ConversationComponent,
        resolve: {
          message: ConversationResolver
        },
        data: {
          crumbs: 'Conversation',
        },
      }
    ]
  },
];
