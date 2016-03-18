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
          'Content-type': 'application/json',
        },
      });

      window.fetch.returns(Promise.resolve(res));
    });

    it('should format the response correctly', (done) => {
      fetchJSON('/')
        .catch(done)
        .then(({ json }) => {
          expect(json).to.eql({ hello: 'world' });
          done();
        });
    });
  });

  describe('response with error', () => {
    beforeEach(() => {
      const res = new Response('{}', {
        status: 401,
        statusText: 'Unauthorized',
        headers: {
          'Content-type': 'application/json',
        },
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
