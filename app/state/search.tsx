import { ofType } from 'redux-observable';
import { of, timer } from 'rxjs';
import {
  map,
  filter,
  mergeMap,
  takeUntil,
  switchMap,
  catchError
} from 'rxjs/operators';
import { push } from 'connected-react-router';
import { closeSearch } from 'app/state/ui';
import { Action, SearchResult, Epic } from 'app/types';

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

export function searchResultSelected(result: SearchResult): Action {
  return {
    type: 'SEARCH_RESULT_SELECTED',
    payload: result
  };
}

export const clearSearchEpic: Epic = action$ =>
  action$.pipe(
    ofType('SEARCH'),
    map(action => action.payload.query),
    filter(query => !query),
    mergeMap(() => of(clearSearch()))
  );

export const searchEpic: Epic = (action$, store, { api }) =>
  action$.pipe(
    ofType('SEARCH'),
    map(action => action.payload.query),
    filter(query => !!query),
    switchMap(query =>
      timer(800).pipe(
        takeUntil(action$.pipe(ofType('CLEAR_SEARCH'))),
        mergeMap(() =>
          api.search(query).pipe(
            map(receiveResults),
            catchError(error =>
              of({ type: 'SEARCH_FAILURE', payload: error, error: true })
            )
          )
        )
      )
    )
  );

export const searchResultSelectedEpic: Epic = action$ =>
  action$.pipe(
    ofType('SEARCH_RESULT_SELECTED'),
    map(action => action.payload),
    switchMap(result => of(closeSearch(), push(`/search?q=${result}`)))
  );

const initialState = {
  searching: false,
  results: []
};

type State = {
  searching: boolean;
  results: Array<SearchResult>;
};

export default function results(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'SEARCH':
      return {
        ...state,
        searching: true
      };

    case 'SEARCH_RESULTS_RECEIVED':
      return {
        ...state,
        results: action.payload,
        searching: false
      };

    case 'SEARCH_FAILURE':
      return {
        ...state,
        searching: false,
        results: []
      };

    case 'CLEAR_SEARCH':
      return {
        ...state,
        searching: false,
        results: []
      };

    default:
      return state;
  }
}
