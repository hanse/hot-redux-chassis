import fetchJSON from '../fetchJSON';
import sinon from 'sinon';
import { expect } from 'chai';

describe('utils/fetchJSON', () => {
  beforeEach(() => {
    sinon.stub(window, 'fetch');
  });

  afterEach(() => {
    window.fetch.restore();
  });

  describe('successful response', () => {
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        status: 200,
        headers: {
          'Content-type': 'application/json'
        }
      });

      window.fetch.returns(Promise.resolve(res));
    });

    it('should format the response correctly', (done) => {
      fetchJSON('/')
        .catch(done)
        .then(({ jsonData }) => {
          expect(jsonData).to.eql({ hello: 'world' });
          done();
        });
    });
  });

  describe('empty responses', () => {
    beforeEach(() => {
      const res = new Response(null, {
        status: 204,
        statusText: 'No Content'
      });

      window.fetch.returns(Promise.resolve(res));
    });

    it('should handle 204 No Content', (done) => {
      fetchJSON('/')
        .then((response) => {
          expect(response.status).to.equal(204);
          done();
        }).catch(done);
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

      window.fetch.returns(Promise.resolve(res));
    });

    it('should catch errors', (done) => {
      fetchJSON('/')
        .then(() => {}, (error) => {
          expect(error.response.statusText).to.eql('Unauthorized');
          done();
        }).catch(done);
    });
  });
});
