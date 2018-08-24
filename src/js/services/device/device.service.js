(() => {
  'use strict';

  angular
  .module('copayApp.services')
  .factory('Device', Device);

  Device.$inject = [];

  function Device() {
    return {
      cordova: document.URL.indexOf('http://') === -1
        && document.URL.indexOf('https://') === -1
        && (!!navigator.userAgent.match(/Android/i) || !!navigator.userAgent.match(/iPhone|iPad|iPod/i)),
      android: !!navigator.userAgent.match(/Android/i),
      blackBerry: !!navigator.userAgent.match(/BlackBerry/i),
      iOS: !!navigator.userAgent.match(/iPhone|iPad|iPod/i),
      windows: !!navigator.userAgent.match(/IEMobile/i),
      safari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
      any: (this.android || this.blackBerry || this.iOS || this.opera || this.windows)
    };
  }
})();
