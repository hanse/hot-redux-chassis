import fetchJSON from 'app/utils/fetchJSON';

function createApiClient({ url }) {
  return function request(path, options) {
    return fetchJSON(`${url}${path}`, options);
  };
}

export default createApiClient({
  url: 'http://localhost:3000/'
});
