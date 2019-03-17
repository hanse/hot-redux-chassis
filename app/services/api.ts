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

export function login(username: string, password: string) {
  return fetch<LoginResultDto>('auth/login', {
    method: 'POST',
    body: {
      username,
      password
    }
  }).pipe(map(result => mapLoginResultDto(result.response)));
}

function mapUserProfileDto(userProfile: UserProfileDto): UserProfile {
  const { id, username } = userProfile;
  return {
    username,
    id: toId(id)
  };
}

export function fetchProfile(token: string) {
  return fetch<UserProfileDto>('auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).pipe(map(result => mapUserProfileDto(result.response)));
}

function mapSearchResultDto(result: SearchResultDto): SearchResult {
  return result;
}

export function search(query: string) {
  return fetch<Array<SearchResultDto>>(`search?q=${query}`).pipe(
    map(result => result.response.map(mapSearchResultDto))
  );
}
