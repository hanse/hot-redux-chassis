import { Observable } from 'rxjs';
import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';

export type Response<T> = AjaxResponse & {
  response: T;
};

type RequestOptions = AjaxRequest;

type ApiClient = <T>(
  path: string,
  options?: RequestOptions
) => Observable<Response<T>>;

type ApiClientOptions = {
  url: string;
};

export function createRestClient({ url }: ApiClientOptions): ApiClient {
  return function request(path, options = {}) {
    const response = ajax({
      url: `${url}${path}`,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers
      },
      ...options
    });

    return response;
  };
}

export default createRestClient({
  url: 'api/'
});
