'use strict';

/*@ngInject*/
function AuthFactory($window) {
  var store = $window.localStorage;
  var key = 'user';

  var user = store.getItem(key) || null;

  return {
    setUser: setUser,
    getUser: getUser
  };

  // set user in factory and localstorage
  function setUser(u) {
    if(u) {
      user = u;
      store.setItem(key, u);
    } else {
      user = null;
      store.removeItem(key);
    }
  }

  // return user
  function getUser() {
    return user;
  }

}

module.exports = AuthFactory;
