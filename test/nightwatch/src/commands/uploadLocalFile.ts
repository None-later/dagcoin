import {EventEmitter} from 'events';
import {CallbackResult, NightWatchClient} from 'nightwatch';
import * as path from 'path';
import * as util from 'util';

const handleResult = (cb: (result: string) => void) => (result: CallbackResult) => {
	if (result.status !== 0) {
		throw new Error(result.value.message);
	}
	cb(result.value);
};

const uploadLocalFile = () => {
	EventEmitter.call(uploadLocalFile);
};
util.inherits(uploadLocalFile, EventEmitter);

/**
 * uploadLocalFile is responsible for using webdriver protocol to upload a local
 * file to a remote Selenium server for use in testing uploads.
 *
 * @argument filePath Local path to the file used for uploading
 * @argument inputSelector Input selector for the file input to upload with
 */
uploadLocalFile.prototype.command = function uploadFile(filePath: string, inputSelector: string) {
	const Nightwatch = this.client;
	const api = this.api;
	const archiver = require('archiver');

	const uploadRemote = (cb: (cb: string) => void) => {
		const buffers: Buffer[] = [];
		const zip = archiver('zip');
		zip
			.on('data', (data: Buffer) => {
				buffers.push(data);
			})
			.on('error', (err: string) => {
				throw err;
			})
			.on('finish', () => {
				const file = Buffer.concat(buffers).toString('base64');
				api.session((session: NightWatchClient) => {
					const opt = {
						path: `/session/${session.sessionId}/file`,
						method: 'POST',
						data: {file},
					};
					Nightwatch.runProtocolAction(opt, handleResult(cb)).send();
				});
			});

		const name = path.basename(filePath);
		zip.file(filePath, {name});
		zip.finalize();
	};

	uploadRemote((tempUrl: string) => {
		api.setValue(inputSelector, tempUrl, () => this.emit('complete'));
	});

	return this;
};

export = uploadLocalFile;
