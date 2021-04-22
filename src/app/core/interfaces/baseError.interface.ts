export interface BaseErrorInterface {
  code: string;
  title?: string;
  target?: string;
  source?: string;
  details?: string;
  meta?: { [key: string]: string };
}
