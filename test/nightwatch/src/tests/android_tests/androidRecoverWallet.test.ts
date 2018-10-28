import {NightWatchClient} from 'nightwatch';
import { setupWallet } from '../../setup';

export const androidRecoverWallet = {
    '@disabled': true,
    // Recovery from seed fails with development apk
    ...setupWallet,
    'Android navigate to settings and recover wallet': (client: NightWatchClient): void => {
		const androidSeed: string = process.env.ANDROID_SEED || ''; 

        const global: NightWatchClient = client.page.globalPage();
		const menu: NightWatchClient = client.page.navMenu();
        
		// Select settings from side menu and navigate to security settings
		menu.openSideBarMenu(client);
        client.waitForElementVisible('//nav[@class="sidebar left-off-canvas-menu"]'); 
        menu.selectSideMenuOption(client, 'Settings');

        client.waitForElementVisible('//h4/span[text()="GENERAL"]');
        menu.selectSettingOption(client, 'Security');

        client.waitForElementVisible('//div[text()="Security"]');
        client.waitForElementVisible('//ul[@class="preferences_links"]');

        menu.selectSettingOption(client, 'Recover wallet');

        const recoverType = [
            'Recover from backup',
            'Recover from seed',
        ];

        recoverType.forEach(type => {
            menu.selectTab(client, type);
                if (type === 'Recover from backup') {
                    client.waitForElementVisible('//div/input[@type="file"]');
                    client.waitForElementVisible('//div/input[@type="password"]');
                    client.waitForElementVisible('//button/span[text()="Import"]');
                    client.waitForElementVisible('//div/span[text()="WARNING: This will permanently delete all your existing wallets!"]');
                } else {
                    client.waitForElementVisible('//form[@name="settingsDeviceNameForm"]');
                    client.waitForElementVisible('//label//span[text()="Your Wallet Seed:"]');
                    // client.waitForElementVisible('//label//textarea[@id="inputMnemonic"]');
                    client.waitForElementVisible('//div//span[text()="This will permanently delete all your existing wallets!"]');
                } 
		});
		
		// Enter wallet seed to recover wallet
        client.click('//*[@id="inputMnemonic"]');
        client.pause(2000);
        client.sendKeys('//*[@id="inputMnemonic"]', androidSeed);
		global.clickOnButton(client,'Recover');
		client.waitForElementNotVisible('//div[@class="onGoingProcess-content"]',50000)
		client.waitForElementVisible('//div[@class="alertModal"]');
		client.waitForElementVisible('//div[text()=" 1 wallets recovered, please restart the application to finish."]');

		client.refresh();
		client.waitForElementVisible('//div[@id="walletHome"]');
    },

	'Android Close app': (client: NightWatchClient): void => {
		client.end();
	}
};