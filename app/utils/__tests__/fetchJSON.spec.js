import fetchJSON from '../fetchJSON';

describe('fetchJSON', () => {
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
      fetchJSON('/ok')
        .catch(done)
        .then(({ json }) => {
          expect(json.hello).to.equal('world');
          done();
        });
    });
  });
});
