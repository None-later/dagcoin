import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';

export const registerFullWallet = {
	'Set up full wallet': (client: NightWatchClient): void => {
		const global: NightWatchClient = client.page.globalPage();
		const menu: NightWatchClient = client.page.navMenu();
		client.useXpath();

		// Skip introduction slides
		client.waitForElementVisible('//div[@icon="safe"]/svg-icon');
		global.clickOnButton(client,'Skip');

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

		// Registration type - Select custom settings
        client.waitForElementVisible('//span[text()="Please choose registration type"]');
        client.expect.element('//label[@for="custom_type"]').text.to.contain('CUSTOM SETTINGS').before();

        global.fillRadioBox(client, 'custom_type');
        global.clickOnButton(client,'CONTINUE');

        // Wallet type - full
        client.waitForElementVisible('//span[text()="Please choose the type of this wallet"]');
        
        client.expect
            .element('//label[@for="wallet_type_full"]')
            .text.to.contain('DOWNLOAD THE ENTIRE DAGCOIN DATABASE')
            .before();

        client.expect
            .element('//label[@for="wallet_type_full"]/following-sibling::p')
            .text.to.contain(setup.initialRun.fullWalletType)
            .before();

        global.fillRadioBox(client, 'wallet_type_full');
        client.expect.element('//input[@id="wallet_type_full"]').to.be.selected.before();

		// Continue
		global.clickOnButton(client,'CONTINUE');
		client.expect.element('//span[text()="WELCOME TO DAGCOIN"]').to.be.visible.before();
		global.clickOnButton(client,'CONTINUE');
		global.clickOnButton(client,'GET STARTED');

		// Small expenses wallet view
		client.waitForElementVisible('//section[@ui-view="main"]//div[text()="Small Expenses Wallet"]');
		client.waitForElementVisible('//div[@id="walletHome"]');
		client.expect.element('//p[@class="heading"]').text.to.contain('Start sending Dagcoin').before();
        client.expect.element('//p[@class="explanation"]').text.to.contain(setup.initialRun.getStarted).before();
        
        // Expect syncing notification
        // client.expect
        //     .element('//div[@class="onGoingProcess-content"]//span[contains(text(),"Syncing... 0% of new units")]')
        //     .to.be.visible
        //     .before();
        
		// Check that wallet type is full in sidebar menu
		client.waitForElementNotPresent('//div/i[@class="fi-x"]');
        menu.openSideBarMenu(client);
        client.expect.element('//nav[contains(@class,"sidebar")]').to.be.visible.before();
        // client.expect.element('//nav/header').text.to.contain('light wallet').before();
	},
	'Close app': (client: NightWatchClient): void => {
		client.end();
	}
};