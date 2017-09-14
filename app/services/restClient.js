// @flow

import { type Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

type Response<T> = {
  response: T
};

// https://github.com/Reactive-Extensions/RxJS-DOM/blob/master/doc/operators/ajax.md
type RequestOptions = {
  async?: boolean,
  body?: Object,
  crossDomain?: boolean,
  withCredentials?: boolean,
  headers?: Object,
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  user?: string,
  password?: string,
  progressObserver?: any,
  responseType?: 'json' | 'text' | 'blob',
  timeout?: number,
  url?: string
};

type ApiClient = <T>(
  path: string,
  options?: RequestOptions
) => Observable<Response<T>>;

type ApiClientOptions = {
  url: string
};

export function createApiClient({ url }: ApiClientOptions): ApiClient {
  return function request(path, options = {}) {
    return ajax({
      url: `${url}${path}`,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers
      },
      ...options
    });
  };
}

export default createApiClient({
  url: 'api/'
});
