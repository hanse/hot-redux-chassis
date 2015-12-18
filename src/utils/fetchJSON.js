export default function fetchJSON(path, options) {
  return fetch(path, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }).then(response => response.json());
}
