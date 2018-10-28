import {NightWatchClient} from 'nightwatch';
import { setupWallet } from '../../setup';

export const androidSecurityTest = {
    // FIX ME! https://trello.com/c/TM4yO6R2/77-android-wallet-stuck-on-updating-wallet
    // https://trello.com/c/nCzuSF5e/224-android-updating-wallet-on-initial-setup-frozen-state
    '@disabled': true,
    ...setupWallet,

    'Set a password to dag wallet': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();

        // Select security from side menu
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Settings');

        client.waitForElementVisible('//ul/li[@ui-sref="security"]');
        menu.selectHrefElement(client, '#/security');

        client.waitForElementVisible('//div/h4/span[text()="Authorization type"]');

        // Select set password
        client.waitForElementVisible('//li//span[@name="encrypt"]');
        client.click('//li//span[@name="encrypt"]');

        client.waitForElementVisible('//div[@class="passModal animated  bounceInDown"]');
        client.waitForElementVisible('//label//span[text()="Set up a password"]');

        client.waitForElementVisible('//div/label[@for="password"]');
        client.waitForElementVisible('//form//p//span[text()="Your wallet key will be encrypted. Password cannot be recovered. Be sure to write it down"]');

        client.waitForElementVisible('//button/span[text()="CANCEL"]');
        client.waitForElementVisible('//button//span[text()="SET"]');

        // Set password and check errors
        global.fillInput(client, 'passwordInput', 'demoPas');
        client.waitForElementVisible('//div/p[text()="Password must be at least 8 characters long"]');
        client.waitForElementVisible('//div/p[text()="Password must contain at least one digit"]');
        client.waitForElementVisible('//div/p[text()="Password must contain at least one special character"]');
        global.clickOnSpanButton(client, 'CANCEL');
        client.pause(600);

        client.click('//li//span[@name="encrypt"]');
        global.fillInput(client, 'passwordInput', 'demoPassW8rd@');
        global.clickOnSpanButton(client, 'SET');
        client.waitForElementVisible('//label//span[text()="Repeat password"]');

        global.fillInput(client, 'passwordInput', 'demoPassW8rd@');
        global.clickOnSpanButton(client, 'SET');
        client.waitForElementVisible('//li//span[@class="green right switch green right ng-valid checked"]');
       
        // Navigate to my wallet and enter password
        global.goBack(client);
        client.waitForElementVisible('//div[text()="Global preferences"]');

        menu.openSideBarMenu(client);
        menu.selectAvatar(client, '1');

        client.refresh();
        client.waitForElementNotPresent('//div//span[text()="Updating Wallet..."]');
        // client.waitForElementVisible('//div[@id="walletHome"]');

        client.waitForElementVisible('//form//label//span[text()="Enter your password"]');
        client.waitForElementVisible('//div/input[@type="password"]');

        global.fillInput(client, 'passwordInput', 'demoPassW8rd@');
        global.clickOnSpanButton(client, 'OK');
        client.waitForElementNotPresent('//form//label//span[text()="Enter your password"]');

        // Remove added password
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Settings'); 
        menu.selectHrefElement(client, '#/security');

        client.waitForElementVisible('//li/div/span[text()="Set password"]');
        client.click('//li/span[@name="encrypt"]');
        client.waitForElementVisible('//form//label//span[text()="Enter your password"]');

        global.fillInput(client, 'passwordInput', 'demoPassW8rd@');
        global.clickOnSpanButton(client, 'OK');
        client.waitForElementNotPresent('//li//span[@class="green right switch green right ng-valid checked"]')
    },

	'Android Close app': (client: NightWatchClient): void => {
		client.end();
	}
};