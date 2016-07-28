/** @flow */

import fetchJSON from 'app/utils/fetchJSON';

import type {
  HttpPromise,
  HttpOptions
} from 'app/utils/fetchJSON';

type ApiClientOptions = {
  url: string;
};

type ApiClient = (path: string, options: HttpOptions) => HttpPromise;

function createApiClient({ url }: ApiClientOptions): ApiClient {
  return function request(path, options) {
    return fetchJSON(`${url}${path}`, options);
  };
}

export default createApiClient({
  url: 'http://localhost:3000/'
});
