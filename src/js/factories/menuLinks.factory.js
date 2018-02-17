(() => {
  'use strict';

  angular
    .module('dagcoin.services')
    .factory('menuLinks', menuLinks);

  menuLinks.$inject = [];

  function menuLinks() {
    return [{
      category: 'Account',
      links: [
        {
          title: 'My Wallets',
          icon: 'wallet',
          state: 'walletHome',
          menuBar: true
        }, {
          title: 'Send',
          icon: 'paperplane',
          state: 'send',
          menuBar: true
        }, {
          title: 'Receive',
          icon: 'banknote',
          state: 'receive',
          menuBar: true
        }, {
          title: 'Chat',
          icon: 'chat',
          state: 'correspondentDevices',
          menuBar: true
        }
      ]
    }, {
      category: 'More',
      links: [
        {
          title: 'Settings',
          icon: 'cog',
          state: 'preferencesGlobal'
        }
      ]
    }];
  }
})();
