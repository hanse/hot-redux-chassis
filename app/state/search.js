import { fromJS } from 'immutable';
import { Observable } from 'rxjs';
import { replace } from 'react-router-redux';
import request from 'app/services/restClient';

export function search(query) {
  return {
    type: 'SEARCH',
    payload: { query }
  };
}

export function clearSearch() {
  return {
    type: 'CLEAR_SEARCH'
  };
}

export function receiveResults(payload) {
  return {
    type: 'SEARCH_RESULTS_RECEIVED',
    payload
  };
}

export const clearSearchEpic = (action$) =>
  action$.ofType('SEARCH')
    .filter((action) => !action.payload.query)
    .mergeMap(() => Observable.merge(
      Observable.of(replace('')),
      Observable.of(clearSearch())
    ));

export const searchEpic = (action$) =>
  action$.ofType('SEARCH')
    .map((action) => action.payload.query)
    .filter((query) => !!query)
    .switchMap((query) =>
      Observable.merge(
        Observable.of(replace(`?q=${query}`)),
        Observable.timer(800)
          .takeUntil(action$.ofType('CLEAR_SEARCH'))
          .mergeMap(() =>
            request(`search?q=${query}`)
              .map((result) => receiveResults(result.response))
              .catch((error) => Observable.of({
                type: 'SEARCH_FAILURE',
                payload: new Error(error.xhr.response.error),
                error: true
              }))
            )
      )
    );

const initialState = fromJS([]);

export default function results(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_RESULTS_RECEIVED':
      return fromJS(action.payload);

    case 'CLEAR_SEARCH':
      return fromJS([]);

    default:
      return state;
  }
}
