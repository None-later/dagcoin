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
		start_process: false,
		start_session: true,
		log_path: false,
		host: '127.0.0.1',
		port: 4723,
		cli_args: {
				// CLI ARGS are required for local Selenium standalone while start_process: true
				'webdriver.chrome.driver' : '/home/viljar/.nwjs/0.17.0-sdk/chromedriver',
		},	
	},
	test_settings: {
		default: {
			selenium_host: process.env.SELENIUM_HOST || 'localhost',
			selenium_port: process.env.SELENIUM_PORT || '4723',
			username: process.env.GRID_USER || '',
			access_key:process.env.GRID_SECRET || '',
			use_ssl: process.env.USE_SSL || false,
			silent: true,
			output: true,
			disable_colors: true,
			screenshots: {
				enabled: true,
				path: paths.screenshots,
				on_failure: true,
				on_error: true,
			},
			globals: {},
			use_xpath: true,
			end_session_on_fail: true,
			skip_testcases_on_fail: true,
		},

	},
	test_workers: {
		enabled: false,
		workers: 'auto',
	},
};

export = settings;
