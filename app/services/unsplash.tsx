import { Observable } from 'rxjs';
import { createRestClient, Response } from './restClient';
import { PostDto } from 'app/types';

const API_URL = 'https://api.unsplash.com/photos';

const fetch = createRestClient({
  url: ''
});

export function fetchPosts(
  nextPageUrl: string | null | undefined
): Observable<Response<Array<PostDto>>> {
  return fetch(nextPageUrl || API_URL, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_APPLICATION_ID || ''}`
    }
  });
}
