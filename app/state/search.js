// @flow

import { fromJS } from 'immutable';
import { Observable } from 'rxjs';
import { push } from 'react-router-redux';
import request from 'app/services/restClient';
import { closeSearch } from 'app/state/ui';
import type { Action } from 'app/types';

export function search(query: string): Action {
  return {
    type: 'SEARCH',
    payload: { query }
  };
}

export function clearSearch(): Action {
  return {
    type: 'CLEAR_SEARCH'
  };
}

export function receiveResults(payload: Array<Object>) {
  return {
    type: 'SEARCH_RESULTS_RECEIVED',
    payload
  };
}

export const clearSearchEpic = (action$: any) =>
  action$
    .ofType('SEARCH')
    .filter(action => !action.payload.query)
    .mergeMap(() => Observable.merge(Observable.of(clearSearch())));

export const searchEpic = (action$: any) =>
  action$
    .ofType('SEARCH')
    .map(action => action.payload.query)
    .filter(query => !!query)
    .switchMap(query =>
      Observable.merge(
        Observable.timer(800)
          .takeUntil(action$.ofType('CLEAR_SEARCH'))
          .mergeMap(() =>
            request(`search?q=${query}`)
              .map(result => receiveResults(result.response))
              .catch(error =>
                Observable.of({
                  type: 'SEARCH_FAILURE',
                  payload: error.xhr.response,
                  error: true
                })
              )
          )
      )
    );

export const searchResultSelectedEpic = (action$: any) =>
  action$
    .ofType('SEARCH_RESULT_SELECTED')
    .map(action => action.payload)
    .switchMap(result =>
      Observable.merge(
        Observable.of(closeSearch()),
        Observable.of(push(`/search?q=${result}`))
      )
    );

const initialState = fromJS([]);

type State = typeof initialState;

export default function results(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'SEARCH_RESULTS_RECEIVED':
      return fromJS(action.payload);

    case 'CLEAR_SEARCH':
      return fromJS([]);

    default:
      return state;
  }
}
