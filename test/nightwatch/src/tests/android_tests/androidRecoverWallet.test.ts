import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';

export const androidRecoverWallet = {

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
                    client.waitForElementVisible('//button[text()="Import"]');
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
        client.sendKeys('//*[@id="inputMnemonic"]', androidSeed);
		global.clickOnButton(client,'Recover');
		
		client.waitForElementVisible('//div[@class="alertModal"]');
		client.waitForElementVisible('//div[text()=" 1 wallets recovered, please restart the application to finish."]');

		client.refresh();
		client.waitForElementVisible('//div[@id="walletHome"]');
    },

	'Android Close app': (client: NightWatchClient): void => {
		client.end();
	}
};