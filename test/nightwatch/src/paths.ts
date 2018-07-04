import * as path from 'path';
import devConfig from './config/developer';

let tests: string;

devConfig.developerMode 
	? tests = path.join(__dirname, 'developer')
	: tests = path.join(__dirname, 'tests');

// paths configuration
export default {
	bin: path.join(__dirname, '..', 'bin'),
	tests,
	dev_test: path.join(__dirname, 'tests'),
	reports: path.join(__dirname, 'reports'),
	pages: path.join(__dirname, 'pages'),
	commands: path.join(__dirname, 'commands'),
	assertions: path.join(__dirname, 'assertions'),
	globals: path.join(__dirname, 'globals'),
	screenshots: path.join(__dirname, 'screenshots'),
	downloads: path.join(__dirname, 'downloads'),
	testarmadaCommands:path.join(__dirname,'../node_modules/testarmada-nightwatch-extra/lib/commands'),
	testarmadaMobileCommands: path.join(__dirname,'../node_modules/testarmada-nightwatch-extra/lib/commands/mobile'),
	testaramadaAssertions: path.join(__dirname,'../node_modules/testarmada-nightwatch-extra/lib/assertions'),
	testarmadaMobileAssertions: path.join(__dirname,'../node_modules/testarmada-nightwatch-extra/lib/assertions/mobile'),
};
