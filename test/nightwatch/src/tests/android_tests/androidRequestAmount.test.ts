import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';

export const androidRequestAmount = {

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

    'Request for a specific amount of dagcoins': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();

        // Select Receive from bottom menu
        menu.selectBottomMenuItem(client, 'Receive');
        client.expect.element('//div/h2').text.to.contains('Share it with the sender via email or text.').before();

        client.waitForElementVisible('//div/img[@id="receive-address-img"]');
        client.waitForElementVisible('//a//span[text()="Request a specific amount"]');
        
        // global.getWalletCode(client);
        client.click('//div//span[text()="Request a specific amount"]');

        // Fill in the form 
        client.waitForElementVisible('//h3/span[text()="Request specific amount"]');
        global.fillInput(client, 'amount', '0.0556');

        global.clickOnSpanButton(client, 'Generate QR Code');
        client.waitForElementVisible('//div//img');
        client.waitForElementVisible('//div//span[text()="Share address"]');

        // Check for request    
        const titleTypes = [
            'Details',
            'QR Code'
        ];
        
        titleTypes.forEach(type => {
            client.waitForElementVisible(`//h4/span[text()="${type}"]`);
 
        });

        client.waitForElementVisible('//div//h3/span[text()="Request specific amount"]');
        client.expect.element('//li[2]/span[2]').text.to.contains('0.0556 DAG').before();

        // Close request amount
        global.closeQrScanner(client);
        client.expect.element('//div/h2').text.to.contains('Share it with the sender via email or text.').before();

    },

    'Request for a specific amount from chat': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();
        const pair: NightWatchClient = client.page.pairedDevices();

        // Select paired devices from bottom menu
        menu.selectBottomMenuItem(client, 'Paired Devices');
        client.waitForElementVisible(`//div//span[text()="You don't have any paired devices yet."]`);

        // Add device to chat library
        pair.deviceSideMenu(client);
        pair.addDevice(client, 'invite');  
        menu.goBack(client);

        pair.addDevice(client, 'accept');
        global.fillInput(client, 'code', 'A9tqqVQkNXIUYzXCrQw19MlblDsQKbO5/+GuLSeTCrXF@hub.dagcoin.link#D0eqFaghcTcp');
        
        global.clickOnButton(client, 'Pair');
        client.waitForElementVisible('//form[@name="chatForm"]');

        pair.sendMessageForm(client, 'request');
        client.waitForElementVisible('//h3/span[text()="Request specific amount"]');

        // Request for a amount
        global.fillInput(client, 'amount', '0.666');
        global.clickOnSpanButton(client, 'Request payment');
        
        pair.sendMessage(client);
        client.expect.element('//div[@class="bubble from-me"]/i').text.to.contains('Payment request: 0.666 DAG').before();
    },

	'Android Close app': (client: NightWatchClient): void => {
		client.end();
	}
};