(function () {
  'use strict';

  angular.module('dagcoin.services')
  .factory('migrationService', (ENV) => {
    const root = {};

    root.migrating = false;
    root.migrated = false;

    root.migrate = function () {
      if (root.migrated) {
        console.log('A MIGRATION PROCEDURE HAS ALREADY COMPLETED');
        return Promise.resolve();
      }

      if (root.migrating) {
        console.log('A MIGRATION PROCEDURE IS ALREADY IN PLACE');
        return Promise.resolve();
      }

      root.migrating = true;

      const confManager = require('dagcoin-core/lib/confManager').getInstance();

      confManager.addConfigSource({
        name: 'angular-env',
        get: key => Promise.resolve(ENV[key])
      });

      const dbManager = require('dagcoin-core/lib/databaseManager').getInstance();
      const osManager = require('dagcoin-core/lib/operatingSystemManager').getInstance();
      const exManager = require('dagcoin-core/lib/exceptionManager');

      return dbManager.checkOrUpdateDatabase().then(
        () => {
          root.migrating = false;
          root.migrated = true;

          return Promise.resolve();
        },
        (ex) => {
          root.migrating = false;
          exManager.logError(ex);
          osManager.shutDown();
        }
      );
    };

    return root;
  });
}());
