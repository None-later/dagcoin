import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';

export const androidSecurityTest = {

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