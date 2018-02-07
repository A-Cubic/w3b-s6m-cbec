const AuthorityKey = 'acbc-authority';
const AuthorityDefault = 'guest';
const TokenKey = 'acbc-token';


export function getAuthority() {
  return localStorage.getItem(AuthorityKey) || AuthorityDefault;
}

export function setAuthority(authority) {
  return localStorage.setItem(AuthorityKey, authority);
}

export function getToken() {
  return JSON.parse(localStorage.getItem(TokenKey)) || '';
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, JSON.stringify(token));
}
