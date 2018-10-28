import {NightWatchClient} from 'nightwatch';
import { setupWallet } from '../../setup';

export const androidSessionLogTest = {
    // FIX ME! https://trello.com/c/fIlpDcaJ/228-missing-e-mail-icon
    '@disabled' : true, 
    ...setupWallet,

    'Dag wallet session log levels': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();

        // Select settings from side menu and navigate to session log
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Settings');

        menu.selectSideMenuOption(client, 'About Dagcoin');
        client.waitForElementVisible('//h4/span[text()="Release Information"]');

        menu.selectSideMenuOption(client, 'Session log');
        client.waitForElementVisible('//button//span[text()="Send by email"]');
        client.waitForElementVisible('//div/ul[@class="log-list"]');

        // Select show log settings
        menu.openSessionLog(client);
        client.waitForElementVisible('//div[@role="document"]');

        const logLevels = [
            'Error',
            'Warn',
            'Info',
            'Debug',
        ];

        logLevels.forEach(type => {
            client.waitForElementVisible(`//div/span[text()="${type}"]`);
        });

        client.waitForElementVisible('//li/svg-icon[@name="mail_outline"]');
        client.waitForElementVisible('//li/svg-icon[@name="content_copy"]');

        // Click on Error level and close session log 
        global.selectSessionLevel(client, 'error');
        client.back();

        menu.selectSideMenuOption(client, 'Session log');
        client.expect.element('//ul[@class="log-list"]/li').text.to.contain('No error for this level').before();

        // Click throw all log level session
        menu.openSessionLog(client);
        client.waitForElementVisible('//li[@id="sendLogByEmail-li"][@disabled]');
        client.waitForElementVisible('//li[@ng-click="logs.copyToClipboard()"][@disabled]');
        global.selectSessionLevel(client, 'warn');

        // Select info and expect copy to clip and email    
        global.selectSessionLevel(client, 'info');
        client.waitForElementNotPresent('//li[@ng-click="logs.copyToClipboard()"][@disabled]');

        client.waitForElementNotPresent('//li[@id="sendLogByEmail-li"][@disabled]');
        global.selectSessionLevel(client, 'debug');

    },

	'Android Close app': (client: NightWatchClient): void => {
		client.end();
	}
};