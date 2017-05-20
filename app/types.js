// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { Reducers } from './state';

export type Action =
  | { type: 'FETCH_PROFILE' }
  | { type: 'FETCH_PROFILE_SUCCESS', payload: { username: string } }
  | { type: 'FETCH_PROFILE_FAILURE' }
  | { type: 'LOGIN' }
  | { type: 'LOGIN_SUCCESS', payload: { token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGIN_CLEAR_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'REHYDRATE_AUTH' }
  | { type: 'TOGGLE_SEARCH' }
  | { type: 'SHOW_NOTIFICATION', payload: { id: number, message: string } }
  | { type: 'DISMISS_NOTIFICATION', payload: { id: number } }
  | { type: 'SEARCH', payload: { query: string } }
  | { type: 'CLEAR_SEARCH' };

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;

export type Store = ReduxStore<State, Action>;

export type GetState = () => State;

export type Thunk<A> = (d: Dispatch, gs: GetState) => Promise<void> | void | A;

export type Dispatch = ReduxDispatch<Action> & ((t: Thunk<*>) => Action);
