'use strict';

/*@ngInject*/
function TokenFactory($window) {
  var localStore = $window.localStorage;
  var key = 'auth-token';

  return {
    setToken: setToken,
    getToken: getToken,
    isSet: isSet
  };

  // return the token
  function getToken() {
    return localStore.getItem(key);
  }

  // set the token in localStorage
  function setToken(token) {
    if(token) {
      localStore.setItem(key, token);
    } else {
      localStore.removeItem(key);
    }
  }

  function isSet() {
    return !!getToken();
  }

}

module.exports = TokenFactory;
