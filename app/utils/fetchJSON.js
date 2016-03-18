export default function fetchJSON(path, options = {}) {
  return fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  }).then((response) =>
    response.json().then(json => ({ json, response }))
  ).then(({ json, response }) => {
    if (response.ok) {
      return { json, response };
    }

    const error = new Error(`${response.status} ${response.statusText}`);
    error.response = response;
    error.json = json;
    throw error;
  });
}
