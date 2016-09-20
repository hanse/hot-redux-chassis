import { ajax } from 'rxjs/observable/dom/ajax';

function createApiClient({ url }) {
  return function request(path, options) {
    console.log(path, options); // eslint-disable-line
    return ajax({
      url: `${url}${path}`,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      ...options
    });
  };
}

export default createApiClient({
  url: 'http://localhost:3000/'
});
