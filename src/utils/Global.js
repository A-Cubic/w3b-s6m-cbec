const Role = 'acbc-role';
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
  const token = localStorage.getItem(TokenKey);
  if (token === undefined || token === 'undefined' || token === null) {
    return '';
  } else {
    return JSON.parse(token);
  }
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, JSON.stringify(token));
}

export function getHeader() {
  return { token: getToken().token, userid: getToken().userId  }
}


export function getRole() {
  const roleArr = localStorage.getItem(Role);
  return JSON.parse(roleArr);
}

export function setRole(role) {
  return localStorage.setItem(Role, JSON.stringify(role));
}
