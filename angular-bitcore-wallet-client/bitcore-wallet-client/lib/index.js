/* eslint-disable no-underscore-dangle */
/**
 * The official client library for bitcore-wallet-service.
 * @module Client
 */

/**
 * Client API.
 * @alias module:Client.API
 */

const client = require('./api');

client.Utils = require('./common/utils');
client.sjcl = require('sjcl');

// Expose bitcore
let Bitcore;
try {
    Bitcore = require('bitcore-lib');
} catch (err) {
    console.log(`index1 Error: ${JSON.stringify(err)}`);
    // strange hack for require bitcore
    if (global._bitcore) {
        delete global._bitcore;
    }
    Bitcore = require('bitcore-lib');
}
client.Bitcore = Bitcore;

module.exports = client;
