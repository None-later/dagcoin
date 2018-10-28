import {NightWatchClient} from 'nightwatch';
import { setupWallet } from '../../setup';
import texts from '../../texts/walletText';

export const androidAddNewWallet = {

    ...setupWallet,
    
    'Add new wallet to account': (client:NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();

        // Navigate to side menu and select add new wallet
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Add new wallet');

        client.expect.element('//div[@class="description m10b"]/span').text.to.contain(texts.createNewWallet.description).before();
        client.waitForElementVisible('//li/a[text()="Plain Wallet"]');
        client.waitForElementVisible('//li/a[text()="Multidevice Wallet"]');
        client.waitForElementVisible('//div[@tab-click="create.setTotalCosigners(1)"]//input[@name="walletName"]');
        client.waitForElementVisible('//input[@name="walletName"]');

        client.click('//input[@name="walletName"]');
        client.setValue('//div[@tab-click="create.setTotalCosigners(1)"]//input[@name="walletName"]',['createdByTest']);
        client.pause(1500);
        global.clickOnSpanButton(client, 'Create new wallet');
        client.waitForElementVisible('//div/div[text()="createdByTest"]');

        // Open side menu and expect two wallets to be listed
        menu.openSideBarMenu(client);
        client.waitForElementVisible('//ul[@class="off-canvas-list"]//div[text()="createdByTest"]');

    },

    'Delete created wallet': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();
        const preferences = [
            'Wallet Alias',
            'Single address wallet',
            'Advanced'
        ];

        menu.selectAvatar(client, '1');
        preferences.forEach(type =>{
            client.waitForElementVisible(`//li/div/span[text()="${type}"]`);
        });

        // Select Advanced
        menu.selectSideMenuOption(client, 'Advanced');
        client.waitForElementVisible('//div/span[text()="Wallet Information"]');
        client.waitForElementVisible('//a/span[text()="Delete Wallet"]');
        client.click('//a/span[text()="Delete Wallet"]');

        // Check for Warning info
        // client.waitForElementVisible('//div[text()="createdByTest"]');
        client.waitForElementVisible('//div//span[text()="Warning!"]');
        client.waitForElementVisible('//div//span[text()="Permanently delete this wallet."]');
        client.waitForElementVisible('//div//span[text()="THIS ACTION CANNOT BE REVERSED"]');
        client.waitForElementVisible('//button//span[text()="Delete wallet"]');

        // Delete wallet
        global.clickOnSpanButton(client, 'Delete wallet');

    },

	'Android Close app': (client: NightWatchClient): void => {
		client.end();
	}
};