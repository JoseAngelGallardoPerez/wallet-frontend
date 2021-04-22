import { snakeToCamelCase } from '@helpers/stringHelpers';
import { ErrorTargets } from '@app/core/constants/errorTargets';
import { BaseErrorInterface } from '@interfaces/baseError.interface';

export class ApiError implements BaseErrorInterface {
  public title: string;
  public details: string;
  public source: string;
  public code: string;
  public meta?: { [key: string]: string };
  public target: ErrorTargets;

  constructor(data: { details?: string, source?: string, target?: string,
    title?: string, code?: string, meta?: { [key: string]: string } }) {
    this.source = snakeToCamelCase(data.source || '');
    this.target = <ErrorTargets>data.target || (this.source ? ErrorTargets.FIELD : ErrorTargets.COMMON);
    this.details = data.details;
    this.code = data.code || data.details || data.title || '';
    this.title = data.title || 'Error';
    if (data.meta) {
      this.meta = data.meta;
    }
  }
}
