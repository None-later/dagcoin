import * as dotenv from 'dotenv';
import {NightWatchOptions} from 'nightwatch';
import * as path from 'path';
import paths from './paths'; 

dotenv.load({ 
	path: path.join(__dirname, '../.env')
 })


const settings: NightWatchOptions = {
	src_folders: [paths.tests],
	output_folder: paths.reports,
	page_objects_path: paths.pages,
	custom_commands_path: [paths.commands,paths.testarmadaCommands, paths.testarmadaMobileCommands],
	custom_assertions_path: [paths.assertions, paths.testaramadaAssertions,paths.testarmadaMobileAssertions],
	parallel_process_delay: 10,
	globals_path: './src/env.ts',
	live_output: true,
	selenium: {
		server_path : './node_modules/selenium-standalone/.selenium/selenium-server/3.6.0-server.jar',
		start_process: true,
		start_session: true,
		log_path: false,
		host: '127.0.0.1',
		port: 4444,
		cli_args: {
				// CLI ARGS are required for local Selenium standalone while start_process: true
				'webdriver.chrome.driver' : './node_modules/nw/nwjs/chromedriver',
		},	
	},
	test_settings: {
		default: {
			selenium_host: 'localhost',
			selenium_port: 4444,
			silent: true,
			output: true,
			disable_colors: true,
			screenshots: {
				enabled: true,
				path: paths.screenshots,
				on_failure: true,
				on_error: true,
			},
			desiredCapabilities: {
				browserName: 'chrome',
				javascriptEnabled: true,
				acceptSslCerts: true,
				elementScrollBehaviour: 1,
			},
			globals: {},
			use_xpath: true,
			end_session_on_fail: true,
			skip_testcases_on_fail: true,
		},
		nwjs: {
			desiredCapabilities: {
				browserName: 'chrome',
				javascriptEnabled: true,
				acceptSslCerts: true,
				chromeOptions: {
					args: [`nwapp=${process.env.NW_APP}`],
				},
			},
		},
	},
	test_workers: {
		enabled: false,
		workers: 'auto',
	},
};

export = settings;
