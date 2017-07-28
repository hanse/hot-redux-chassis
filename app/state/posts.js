import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

const API_URL = 'https://api.unsplash.com/photos';

function extractNextPageUrl(xhr) {
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
  nextPageUrl: null,
  pageCount: 0,
  loading: false,
  failed: false
};

export default function posts(state = initialState, action) {
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

export const refreshPostsEpic = (action$, store) =>
  action$.ofType('POSTS_REFRESH').mergeMap(() =>
    Observable.of({
      type: 'POSTS_FETCH'
    })
  );

export const fetchPostsEpic = (action$, store) =>
  action$.ofType('POSTS_FETCH').switchMap(() => {
    const url = store.getState().posts.nextPageUrl || API_URL;
    return ajax({
      url,
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_APPLICATION_ID}`
      }
    })
      .delay(1000)
      .switchMap(result =>
        Observable.of({
          type: 'POSTS_RECEIVED',
          payload: {
            items: result.response,
            nextPageUrl: extractNextPageUrl(result.xhr)
          }
        })
      )
      .catch(error =>
        Observable.of({
          type: 'POSTS_FETCH_FAILED',
          payload: error,
          error: true
        })
      );
  });
