/** @flow */

export type HttpOptions = Object;
export type HttpPromise = Promise<HttpResponse | HttpError>;

class HttpError extends Error {
  response: Response;
}

class HttpResponse extends Response {
  jsonData: ?Object;
}

function parseJSON(response: HttpResponse) {
  response.jsonData = null;

  if (response.status === 204) {
    return response;
  }

  return response.json().then((jsonData) => {
    response.jsonData = jsonData;
    return response;
  });
}

export default function fetchJSON(
  path: string,
  options: Object = {}
): Promise<HttpResponse | HttpError> {
  const request = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers
    }
  };

  __DEV__ && console.log('fetch.request', path, request); // eslint-disable-line
  return fetch(path, request)
    .then((response) => {
      __DEV__ && console.log('fetch.response', response); // eslint-disable-line
      return response;
    })
    .then(parseJSON)
    .then((response) => {
      if (response.ok) {
        return response;
      }

      const error = new HttpError(`${response.status} ${response.statusText}`);
      error.response = response;
      throw error;
    });
}
