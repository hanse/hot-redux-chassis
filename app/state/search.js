// @flow

import { Observable } from 'rxjs';
import { push } from 'react-router-redux';
import { closeSearch } from 'app/state/ui';
import type { Action, SearchResult, Epic } from 'app/types';

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

export function receiveResults(results: Array<SearchResult>): Action {
  return {
    type: 'SEARCH_RESULTS_RECEIVED',
    payload: results
  };
}

export function searchResultSelected(result: SearchResult) {
  return {
    type: 'SEARCH_RESULT_SELECTED',
    payload: result
  };
}

export const clearSearchEpic: Epic = action$ =>
  action$
    .filter(action => action.type === 'SEARCH')
    .map(action => {
      if (action.type !== 'SEARCH') throw new TypeError();
      return action.payload.query;
    })
    .filter(query => !query)
    .mergeMap(() => Observable.merge(Observable.of(clearSearch())));

export const searchEpic: Epic = (action$, store, { api }) =>
  action$
    .filter(action => action.type === 'SEARCH')
    .map(action => {
      if (action.type !== 'SEARCH') throw new TypeError();
      return action.payload.query;
    })
    .filter(query => !!query)
    .switchMap(query =>
      Observable.timer(800)
        .takeUntil(action$.filter(action => action.type === 'CLEAR_SEARCH'))
        .mergeMap(() =>
          api
            .search(query)
            .map(receiveResults)
            .catch((error: Error) =>
              Observable.of({
                type: 'SEARCH_FAILURE',
                payload: error,
                error: true
              })
            )
        )
    );

export const searchResultSelectedEpic: Epic = action$ =>
  action$
    .filter(action => action.type === 'SEARCH_RESULT_SELECTED')
    .map(action => {
      if (action.type !== 'SEARCH_RESULT_SELECTED') throw new TypeError();
      return action.payload;
    })
    .switchMap(result =>
      Observable.merge(
        Observable.of(closeSearch()),
        Observable.of(push(`/search?q=${result}`))
      )
    );

const initialState = [];

type State = Array<SearchResult>;

export default function results(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'SEARCH_RESULTS_RECEIVED':
      return action.payload;

    case 'CLEAR_SEARCH':
      return [];

    default:
      return state;
  }
}
