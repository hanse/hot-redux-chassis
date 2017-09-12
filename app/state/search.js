// @flow

import { Observable } from 'rxjs';
import { push } from 'react-router-redux';
import request from 'app/services/restClient';
import { closeSearch } from 'app/state/ui';
import type { Action, SearchResult, SearchResultDto, Epic } from 'app/types';

function mapSearchResultDto(result: SearchResultDto): SearchResult {
  return result;
}

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

export function receiveResults(results: Array<SearchResultDto>) {
  return {
    type: 'SEARCH_RESULTS_RECEIVED',
    payload: results.map(mapSearchResultDto)
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

export const searchEpic: Epic = action$ =>
  action$
    .filter(action => action.type === 'SEARCH')
    .map(action => {
      if (action.type !== 'SEARCH') throw new TypeError();
      return action.payload.query;
    })
    .filter(query => !!query)
    .switchMap(query =>
      Observable.merge(
        Observable.timer(800)
          .takeUntil(action$.filter(action => action.type === 'CLEAR_SEARCH'))
          .mergeMap(() =>
            request(`search?q=${query}`)
              .map(result => receiveResults(result.response))
              .catch(error =>
                Observable.of({
                  type: 'SEARCH_FAILURE',
                  payload: error,
                  error: true
                })
              )
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
