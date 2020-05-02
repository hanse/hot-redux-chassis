import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, delay, switchMap, catchError } from 'rxjs/operators';
import { toId } from 'app/types';
import { Action, Epic, Post, PostDto } from 'app/types';

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

  return nextLink.trim().split(';')[0].slice(1, -1);
}

const initialState = {
  items: [],
  nextPageUrl: '',
  pageCount: 0,
  loading: false,
  failed: false
};

type State = {
  items: Array<Post>;
  nextPageUrl: string | null | undefined;
  pageCount: number;
  loading: boolean;
  failed: boolean;
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
  action$.pipe(ofType('POSTS_REFRESH'), map(fetchPosts));

export const fetchPostsEpic: Epic = (action$, state$, { unsplash }) =>
  action$.pipe(
    ofType('POSTS_FETCH'),
    switchMap(() =>
      unsplash.fetchPosts(state$.value.posts.nextPageUrl).pipe(
        delay(1000),
        switchMap(result =>
          of(postsReceived(result.response, extractNextPageUrl(result.xhr)))
        ),
        catchError((error: Error) => of(fetchPostsFailed(error)))
      )
    )
  );

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

export function fetchPosts(): Action {
  return {
    type: 'POSTS_FETCH'
  };
}

export function fetchPostsFailed(error: Error): Action {
  return {
    type: 'POSTS_FETCH_FAILED',
    payload: error,
    error: true
  };
}

export function postsReceived(
  items: Array<PostDto>,
  nextPageUrl: string | null | undefined
): Action {
  return {
    type: 'POSTS_RECEIVED',
    payload: {
      items: items.map(mapPostDto),
      nextPageUrl
    }
  };
}
