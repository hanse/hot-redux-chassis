// @flow

import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { toId } from 'app/types';
import type { Action, Epic, Post, PostDto } from 'app/types';

const API_URL = 'https://api.unsplash.com/photos';

function extractNextPageUrl(xhr: XMLHttpRequest) {
  const linkHeader = xhr.getResponseHeader('Link');
  if (!linkHeader) {
    return null;
  }

  const links = linkHeader.split(',');

  const nextLink = links.find(link => link.includes('rel="next"'));
  if (!nextLink) {
    return null;
  }

  return nextLink
    .trim()
    .split(';')[0]
    .slice(1, -1);
}

const initialState = {
  items: [],
  nextPageUrl: '',
  pageCount: 0,
  loading: false,
  failed: false
};

type State = {
  ...typeof initialState,
  items: Array<Post>
};

export default function posts(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'POSTS_FETCH':
      return {
        ...state,
        failed: false,
        loading: true
      };

    case 'POSTS_REFRESH':
      return initialState;

    case 'POSTS_RECEIVED':
      return {
        ...state,
        items: state.items.concat(action.payload.items),
        nextPageUrl: action.payload.nextPageUrl,
        loading: false,
        pageCount: state.pageCount + 1
      };

    case 'POSTS_FETCH_FAILED':
      return {
        ...state,
        failed: true,
        loading: false
      };

    default:
      return state;
  }
}

export const refreshPostsEpic: Epic = action$ =>
  action$
    .filter(action => action.type === 'POSTS_REFRESH')
    .mergeMap(() => Observable.of(fetchPosts()));

export const fetchPostsEpic: Epic = (action$, store) =>
  action$.filter(action => action.type === 'POSTS_FETCH').switchMap(() => {
    const url = store.getState().posts.nextPageUrl || API_URL;
    return ajax({
      url,
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_APPLICATION_ID || ''}`
      }
    })
      .delay(1000)
      .switchMap(result =>
        Observable.of(
          postsReceived(result.response, extractNextPageUrl(result.xhr))
        )
      )
      .catch(error => Observable.of(fetchPostsFailed(error)));
  });

function mapPostDto(post: PostDto): Post {
  return {
    id: toId(post.id),
    imageUrl: post.urls.regular,
    user: {
      name: post.user.name,
      location: post.user.location,
      link: post.user.links.html
    }
  };
}

export function fetchPosts() {
  return {
    type: 'POSTS_FETCH'
  };
}

export function fetchPostsFailed(error: Error) {
  return {
    type: 'POSTS_FETCH_FAILED',
    payload: error,
    error: true
  };
}

export function postsReceived(items: Array<PostDto>, nextPageUrl: ?string) {
  return {
    type: 'POSTS_RECEIVED',
    payload: {
      items: items.map(mapPostDto),
      nextPageUrl
    }
  };
}
