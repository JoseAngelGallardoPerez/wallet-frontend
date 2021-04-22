/**
 * @license
 * Copyright iKantam LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { PaginationPageLimitInterface } from '@interfaces/pagination-page-limit.interface';

export class PaginationService {

  public static defaultLimit = 10;

  public static get defaultPaginationPageLimit(): PaginationPageLimitInterface {
    return Object.assign({}, {
      totalPages: 0,
      totalRecords: 0,
      currentPage: 1,
      limit: PaginationService.defaultLimit
    });
  }

  public static buildPaginationPageLimit({ total_page, total_record, page, limit }: {
    total_page: number,
    total_record: number,
    page: number,
    limit: number
  }): PaginationPageLimitInterface {
    return {
      totalPages: total_page,
      totalRecords: total_record,
      currentPage: page,
      limit: limit
    };
  }

  public static buildPaginationPages({ totalPage, totalRecord, currentPage, limit }: {
    totalPage: number,
    totalRecord: number,
    currentPage: number,
    limit: number,
  }): PaginationPageLimitInterface {
    return {
      totalPages: totalPage,
      totalRecords: totalRecord,
      currentPage: currentPage,
      limit: limit,
    };
  }

  /**
   * Buld pagination
   * @param links
   */
  public static buildPaginationSizeNumber(links: any): PaginationPageLimitInterface {
    if (!links.last) {
      return Object.assign({}, PaginationService.defaultPaginationPageLimit);
    }

    const last = PaginationService.getParamsFromUrl(links.last);
    const self = links.self ? PaginationService.getParamsFromUrl(links.self) : undefined;
    const totalPages = last['page[number]'] ? parseInt(last['page[number]'], 10) : 0;
    const currentPage = self ? self['page[number]'] ? parseInt(self['page[number]'], 10) : 1 : 1;
    const limit = last['page[size]'] ? parseInt(last['page[size]'], 10) : PaginationService.defaultLimit;
    const totalRecords = totalPages * limit;

    return {
      totalPages: totalPages,
      totalRecords: totalRecords,
      currentPage: currentPage,
      limit: limit,
    };
  }

  /**
   * Buld pagination
   * @param links
   */
  public static buildPaginationOffsetLimit(links: any): PaginationPageLimitInterface {
    if (!links.last) {
      return PaginationService.defaultPaginationPageLimit;
    }

    const last = PaginationService.getParamsFromUrl(links.last);
    const self = links.self ? PaginationService.getParamsFromUrl(links.self) : undefined;

    const totalPages = last['offset'] && last['limit'] ?
      Math.ceil(parseInt(last['offset'], 10) / parseInt(last['limit'], 10)) + 1 : 1;
    const pagesToCurrent = self['offset'] && self['limit'] ? parseInt(self['offset'], 10) / parseInt(self['limit'], 10) : 1;
    const currentPage = totalPages - (totalPages - pagesToCurrent - 1);
    const limit = last['limit'] ? parseInt(last['limit'], 10) : PaginationService.defaultLimit;
    const totalRecords = totalPages * limit;

    return {
      totalPages: totalPages,
      totalRecords: totalRecords,
      currentPage: currentPage,
      limit: limit,
    };
  }

  /**
   * Get params from url
   * @param url
   */
  private static getParamsFromUrl(url: string) {
    const searchParams = url.split('?')[1];
    const result: any = {};
    if (searchParams !== undefined && searchParams !== null) {
      const paramParts = searchParams.split('&');
      for (const part of paramParts) {
        const paramValuePair = part.split('=');
        if (paramValuePair.length === 2) {
          result[paramValuePair[0]] = decodeURIComponent(paramValuePair[1]);
        }
      }
    }
    return result;
  }
}
