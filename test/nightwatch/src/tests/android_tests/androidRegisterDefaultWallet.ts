import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';

// let recipientAddress: string;

export const androidRegisterDeafultWallet = {
	'Android Set up default wallet': (client: NightWatchClient): void => {
		const global: NightWatchClient = client.page.globalPage();
		
		client.useXpath();
		client.setContext('WEBVIEW_org.dagcoin.client');
		client.contexts(context => {
		    client.setContext(context.value[1]);
		});	
			
		// Click through introduction slides
		client.waitForElementVisible(
			'//div[@icon="safe"]/svg-icon',
		);
		global.clickOnButton(client,'GOT IT');
		global.clickOnButton(client,'AWESOME');
		global.clickOnButton(client,'CREATE WALLET');

		// Agree to terms
		client.waitForElementVisible('//div[@class="intro_confirm_content_checkboxes"]');
		client.waitForElementVisible('//ul[contains(@class,"fadeInDown")]');
		client.pause(2000);
		global.fillCheckBox(client,'confirm.security');
		client.expect.element('//input[@id="security"]').to.be.selected.before();

		global.fillCheckBox(client,'confirm.backup');
		client.expect.element('//input[@id="backup"]').to.be.selected.before();

		client.pause(2000);
		global.fillCheckBox(client,'confirm.finish');	
		client.expect.element('//input[@id="finish"]').to.be.selected.before();

		global.clickOnButton(client,'Confirm & Finish');

		// Expect registration selection not to be displayed for android
		client.expect.element('//span[text()="Please choose registration type"]').to.not.be.present.after(2000);

		// Continue
		client.expect.element('//span[text()="WELCOME TO DAGCOIN"]').to.be.visible.before();
		global.clickOnButton(client,'CONTINUE');
		global.clickOnButton(client,'GET STARTED');

		// Small expenses wallet view
		client.waitForElementVisible('//section[@ui-view="main"]//div[text()="Small Expenses Wallet"]');
		client.waitForElementVisible('//div[@id="walletHome"]');
		client.expect.element('//p[@class="heading"]').text.to.contain('Start sending Dagcoin').before();
		client.expect.element('//p[@class="explanation"]').text.to.contain(setup.initialRun.getStarted).before();
	},
	'Close app': (client: NightWatchClient): void => {
		client.end();
	}
};