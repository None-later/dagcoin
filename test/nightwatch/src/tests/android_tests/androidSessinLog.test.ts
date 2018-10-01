import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';

export const androidSessionLogTest = {

	'Android Set up default wallet': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        
        client.useXpath();
        client.setContext('WEBVIEW_org.dagcoin.client');
		client.contexts(context => {
		    client.setContext(context.value[1]);
		});	

        // Skip through introduction slides
		client.waitForElementVisible('//div[@class="intro_content_body"]');
        client.waitForElementVisible('//*[@id="mainSection"]/section/div/button');
        client.click('//*[@id="mainSection"]/section/div/button');

        // Agree to terms
        client.waitForElementVisible('//div/h2[text()="Almost done!"]');

        const agreeTerms: {[key: string]: string } = {
            security: 'confirm.security',
            backup: 'confirm.backup',
            finish: 'confirm.finish'
        };

        for (const terms of Object.keys(agreeTerms)){
            global.fillCheckBox(client, agreeTerms[terms]);
            client.expect.element(`//input[@id="${terms}"]`).to.be.selected.before();
        };
  
        global.clickOnButton(client,'Confirm & Finish');

        // Expect registration selection not to be displayed for android
		client.expect.element('//span[text()="Please choose registration type"]').to.not.be.present.after(2000);

        // Finish wallet registration 
		client.expect.element('//span[text()="WELCOME TO DAGCOIN"]').to.be.visible.before();
        global.clickOnButton(client,'CONTINUE');

        client.waitForElementVisible(`//div//span[text()="${setup.initialRun.deviceNameSlide_1}"]`)
        global.clickOnButton(client,'GET STARTED');
        client.waitForElementVisible('//div[@id="walletHome"]');
    },

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