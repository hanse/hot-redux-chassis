import { Map } from 'immutable';
import expect from 'expect';
import createReducer from '../createReducer';

describe('utils', () => {
  describe('createReducer', () => {
    it('should return a function', () => {
      expect(typeof createReducer({}, {})).toEqual('function');
    });

    it('should update state', () => {
      const initialState = Map({ hello: 'world' });

      const reducer = createReducer(initialState, {
        SAY_HELLO: (state, action) => state.merge({ hello: action.payload.name })
      });

      expect(reducer(initialState, { type: 'IDONTCARE' }).get('hello')).toEqual('world');
      expect(reducer(initialState, {
        type: 'SAY_HELLO',
        payload: { name: 'john' }
      }).get('hello')).toEqual('john');
    });
  });
});
