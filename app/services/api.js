// @flow

import { Observable } from 'rxjs';
import { createRestClient, type Response } from './restClient';
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
  }).map((result: Response<LoginResultDto>) => result.response);
}

export function fetchProfile(token: string): Observable<UserProfileDto> {
  return fetch('auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).map((result: Response<UserProfileDto>) => result.response);
}

export function search(query: string): Observable<Array<SearchResultDto>> {
  return fetch(`search?q=${query}`).map(
    (result: Response<Array<SearchResultDto>>) => result.response
  );
}
