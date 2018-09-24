import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';
import texts from '../../texts/walletText';

export const androidAddNewWallet = {

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
    
    'Add new wallet to account': (client:NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();

        // Navigate to side menu and select add new wallet
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Add new wallet');

        client.expect.element('//div[@class="description m10b"]/span').text.to.contain(texts.createNewWallet.description).before();
        client.waitForElementVisible('//input[@name="walletName"]');

        client.click('//input[@name="walletName"]');
        client.sendKeys('//input[@name="walletName"]', 'createdByTest');

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