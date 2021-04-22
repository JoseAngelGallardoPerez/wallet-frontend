import { AdminNewsListComponent } from '@app/modules/admin-news/components/admin-news-list/admin-news-list.component';
import { CreateNewsComponent } from '@app/modules/admin-news/components/create-news/create-news.component';
import { AdminNewsViewComponent } from '@app/modules/admin-news/components/admin-news-view/admin-news-view.component';
import { NewsListResolver } from '@app/modules/admin-news/resolvers/newsList.resolver';
import { SingleNewsResolver } from '@app/modules/admin-news/resolvers/singleNews.resolver';
import { UserPermissionGuard } from '@guards/user-permission.guard';
import { UserPermissions } from '@app/core/constants/userPermissions';
import { ViewEditNewsComponent } from '@lib/modules/admin-news/components/view-edit-news/view-edit-news.component';
import { NoPermissionComponent } from '@layouts/error/no-permission/no-permission.component';

export const DefaultAdminNewsRouting = [
  {
    path: '',
    component: AdminNewsListComponent,
    resolve: {
      news: NewsListResolver
    }
  },
  {
    path: 'new',
    component: CreateNewsComponent,
    canActivate: [UserPermissionGuard],
    data: {
      permissions: [UserPermissions.CREATE_MODIFY_NEWS_ARTICLES],
      redirectTo: '/admin/news/no-permission',
    },
  },
  {
    path: 'view/:id',
    component: ViewEditNewsComponent,
    resolve: {
      news: SingleNewsResolver
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminNewsViewComponent
      },
      {
        path: 'edit',
        component: CreateNewsComponent,
        canActivate: [UserPermissionGuard],
        data: {
          permissions: [UserPermissions.CREATE_MODIFY_NEWS_ARTICLES]
        },
      },
    ]
  },
  {
    path: 'no-permission',
    component: NoPermissionComponent,
  },
];
