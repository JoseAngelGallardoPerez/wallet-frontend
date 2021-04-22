import { NewsListResolver } from '@app/modules/admin-news/resolvers/newsList.resolver';
import { SingleNewsResolver } from '@app/modules/admin-news/resolvers/singleNews.resolver';
import { UserNewsComponent } from '@app/modules/user-news/components/user-news/user-news.component';
import { NewsViewComponent } from '@app/modules/user-news/components/news-view/news-view.component';

export const DefaultUserNewsRouting = [

  {
    path: '',
    pathMatch: 'full',
    component: UserNewsComponent,
    resolve: {
      news: NewsListResolver
    },
  },
  {
    path: ':id',
    component: NewsViewComponent,
    resolve: {
      news: SingleNewsResolver
    }
  },
];

