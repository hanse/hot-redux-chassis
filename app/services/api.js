// @flow

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createRestClient, type Response } from './restClient';
import {
  toId,
  type UserProfileDto,
  type UserProfile,
  type SearchResultDto,
  type SearchResult,
  type LoginResultDto,
  type LoginResult
} from 'app/types';

const fetch = createRestClient({
  url: 'api/'
});

function mapLoginResultDto(loginResult: LoginResultDto): LoginResult {
  return {
    token: loginResult.token
  };
}

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
  }).pipe(
    map((result: Response<LoginResult>) => mapLoginResultDto(result.response))
  );
}

function mapUserProfileDto(userProfile: UserProfileDto): UserProfile {
  const { id, username } = userProfile;
  return {
    username,
    id: toId(id)
  };
}

export function fetchProfile(token: string): Observable<UserProfile> {
  return fetch('auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).pipe(
    map((result: Response<UserProfileDto>) =>
      mapUserProfileDto(result.response)
    )
  );
}

function mapSearchResultDto(result: SearchResultDto): SearchResult {
  return result;
}

export function search(query: string): Observable<Array<SearchResult>> {
  return fetch(`search?q=${query}`).pipe(
    map((result: Response<Array<SearchResultDto>>) =>
      result.response.map(mapSearchResultDto)
    )
  );
}
