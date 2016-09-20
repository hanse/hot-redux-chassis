import 'isomorphic-fetch';
import fetchJSON from '../fetchJSON';
import sinon from 'sinon';

describe('utils/fetchJSON', () => {
  beforeEach(() => {
    sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    global.fetch.restore();
  });

  describe('successful response', () => {
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json'
        }
      });

      global.fetch.returns(Promise.resolve(res));
    });

    it('should format the response correctly', () => {
      return fetchJSON('/')
        .then(({ jsonData }) => {
          expect(jsonData).toEqual({ hello: 'world' });
        });
    });
  });

  describe('empty responses', () => {
    beforeEach(() => {
      const res = new Response(null, {
        status: 204,
        statusText: 'No Content'
      });

      global.fetch.returns(Promise.resolve(res));
    });

    it('should handle 204 No Content', () => {
      return fetchJSON('/')
        .then((response) => {
          expect(response.status).toEqual(204);
        });
    });
  });

  describe('response with error', () => {
    beforeEach(() => {
      const res = new Response('{}', {
        status: 401,
        statusText: 'Unauthorized',
        headers: {
          'Content-type': 'application/json'
        }
      });

      global.fetch.returns(Promise.resolve(res));
    });

    it('should catch errors', () => {
      return fetchJSON('/')
        .then(() => {}, (error) => {
          expect(error.response.statusText).toEqual('Unauthorized');
        });
    });
  });
});
