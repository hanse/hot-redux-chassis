import { createRestClient } from './restClient';
import { PostDto } from 'app/types';

const API_URL = 'https://api.unsplash.com/photos';

const fetch = createRestClient({
  url: '',
});

export function fetchPosts(nextPageUrl: string | null | undefined) {
  return fetch<Array<PostDto>>(nextPageUrl || API_URL, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_APPLICATION_ID || ''}`,
    },
  });
}
