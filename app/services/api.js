// @flow

import { Observable } from 'rxjs';
import { createRestClient } from './restClient';
import type {
  UserProfileDto,
  SearchResultDto,
  LoginResultDto
} from 'app/types';

const fetch = createRestClient({
  url: 'api/'
});

export function login(
  username: string,
  password: string
): Observable<LoginResultDto> {
  return fetch('auth/login', {
    method: 'POST',
    body: {
      username,
      password
    }
  }).map(result => result.response);
}

export function fetchProfile(token: string): Observable<UserProfileDto> {
  return fetch('auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).map(result => result.response);
}

export function search(query: string): Observable<Array<SearchResultDto>> {
  return fetch(`search?q=${query}`).map(result => result.response);
}
