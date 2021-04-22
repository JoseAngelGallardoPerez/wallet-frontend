import { NewsAuthorInterface } from '@interfaces/news/newsAuthor.interface';
import { NewsImageInterface } from '@interfaces/news/newsImage.interface';

export class NewsModel {
  public id?: number;
  public authorId: string;
  public summary: string;
  public author: NewsAuthorInterface;
  public title: string;
  public body: string;
  image: NewsImageInterface;
  createdAt: string;

  public static get defaultSortField(): string {
    return '-createdAt';
  }

  public static get includeEntity(): string {
    return 'author';
  }

  public static getSortFields(): string[] {
    return ['title',
      '-title',
      'createdAt',
      '-createdAt'];
  }

  constructor(data: any) {
    Object.assign(this, data);
  }
}
