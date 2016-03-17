

export function authSelector(state) {
  return {
    isLoggedIn: !!state.auth.get('token'),
    username: state.auth.get('username')
  };
}
