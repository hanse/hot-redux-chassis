import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createRestClient } from './restClient';
import {
  toId,
  UserProfileDto,
  UserProfile,
  SearchResultDto,
  SearchResult,
  LoginResultDto,
  LoginResult
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
): Observable<LoginResult> {
  return fetch('auth/login', {
    method: 'POST',
    body: {
      username,
      password
    }
  }).pipe(map(result => mapLoginResultDto(result.response as LoginResultDto)));
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
  }).pipe(map(result => mapUserProfileDto(result.response as UserProfileDto)));
}

function mapSearchResultDto(result: SearchResultDto): SearchResult {
  return result;
}

export function search(query: string): Observable<Array<SearchResult>> {
  return fetch(`search?q=${query}`).pipe(
    map(result =>
      (result.response as Array<SearchResultDto>).map(mapSearchResultDto)
    )
  );
}
