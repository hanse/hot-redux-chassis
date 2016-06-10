/** @flow */

class HttpError extends Error {
  response: Response;
  json: ?Object;
}

export default function fetchJSON(path: string, options: Object = {}) {
  return fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  }).then((response) => {
    if (response.status === 204) {
      return Promise.resolve({ response, json: null });
    }
    return response.json().then(json => ({ json, response }))
  }).then(({ json, response }) => {
    if (response.ok) {
      return { json, response };
    }

    const error = new HttpError(`${response.status} ${response.statusText}`);
    error.response = response;
    error.json = json;
    throw error;
  });
}
