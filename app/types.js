// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { Reducers } from './state';

export type Action = {
  type: string,
  payload?: Object | Error,
  meta?: Object,
  error?: boolean
};

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;

export type Store = ReduxStore<State, Action>;

export type GetState = () => State;

export type Thunk<A> = (d: Dispatch, gs: GetState) => Promise<void> | void | A;

export type Dispatch = ReduxDispatch<Action> & ((t: Thunk<*>) => Action);
