/** @flow */

class HttpError extends Error {
  response: Response;
}

function parseJSON(response) {
  response.jsonData = null;

  if (response.status === 204) {
    return response;
  }

  return response.json().then((jsonData) => {
    response.jsonData = jsonData;
    return response;
  });
}

export default function fetchJSON(path: string, options: Object = {}) {
  const request = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
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
