export interface Error {
  message: string;
  statusCode?: number;
  path?: string;
  timestamp?: string;
  validation?: {
    [key: string]: string;
  };
}
