import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';
import texts from '../../texts/walletText';

 export const androidPairedDevices = {
    '@disabled': true,
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

    'Android pair device': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();
        const pair: NightWatchClient = client.page.pairedDevices();

        // Select a paired device option from bottom menu
        menu.selectBottomMenuItem(client, 'Paired Devices');
        client.waitForElementVisible(`//p/span[text()="You don't have any paired devices yet."]`);

        // Select add new device
       pair.deviceSideMenu(client);

        client.waitForElementVisible('//div[text()="Add device"]');
        client.waitForElementVisible('//ul/li//span[text()="Invite the other device"]');
        client.waitForElementVisible('//ul/li//span[text()="Accept invitation from the other device"]');

        // Select invite
        const addDeviceOptions: {[key: string]: string} = {
           invite: 'Invite the other device',
           accept: 'Accept invitation from the other device',
        };

        for (const option of Object.keys(addDeviceOptions)){
            client.waitForElementVisible(`//li//span[text()="${addDeviceOptions[option]}"]`);
            pair.addDevice(client, option);    
            
            if (option === 'invite') {
                client.waitForElementVisible(`//div//span[text()="${texts.addDevice.acceptInvite}"]`);
                menu.goBack(client);

            } else {
                client.waitForElementVisible(`//form//span[text()="${texts.acceptInvitation.info}"]`);
                client.waitForElementVisible('//div/input[@id="code"]');
            }
        };

        // Enter pairing code and pair
        global.fillInput(client, 'code', 'A9tqqVQkNXIUYzXCrQw19MlblDsQKbO5/+GuLSeTCrXF@hub.dagcoin.link#sau2JBjQcpKg');
        global.clickOnButton(client, 'Pair');

        // Check for device to be paired
        client.waitForElementVisible('//div[text()="New"]');
        client.waitForElementVisible('//div//a/span[text()="Edit"]');

        client.waitForElementVisible('//div[@scroll-bottom="messageEvents"]');
        client.waitForElementVisible('//div/span[contains(text(),"chat recording")]');

        client.waitForElementVisible('//div[@class="bubble system"]/b[text()="ON"]');
        client.waitForElementVisible('//div[@class="send_form_message"]');

        client.waitForElementVisible('//button/svg-icon[@name="add"]');
        client.waitForElementVisible('//form/textarea[@id="message"]');
        client.waitForElementVisible('//button/svg-icon[@name="paper-plane-o"]');

        // Type a message and send
        global.fillTextarea(client, 'message', 'Hello');
        pair.sendMessage(client);
        client.expect.element('//div[@class="bubble from-me"]/span').text.to.contain('Hello').before();

    },

    'Select edit and clear chat his. and rename paired dev.': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const pair: NightWatchClient = client.page.pairedDevices();

        global.selectAdditionalOption(client, 'Edit');
        client.waitForElementVisible('//form[@name="editForm"]');

        // Check for edit menu elements
        const editFormElements = [
            'Full address:',
            'Rename:',
            'Change hub:',
        ];

            editFormElements.forEach(type => {
                    client.waitForElementVisible(`//div//span[text()="${type}"]`);
            });
        
        client.waitForElementVisible('//div//input[@id="name"]');
        client.waitForElementVisible('//div//input[@id="hub"]');  
            
        // Clear chat history
        global.clickOnSpanButton(client, 'Clear chat history');

        client.waitForElementVisible('//div/h3[text()="Clear chat history"]');
        client.waitForElementVisible('//div//p[text()="Delete the whole chat history with New ?"]');

        client.waitForElementVisible('//button//span[text()="Yes"]');
        client.waitForElementVisible('//button//span[text()="Cancel"]');
        
        global.clickOnSpanButton(client, 'Yes'); 
        client.waitForElementNotPresent('//div[@class="bubble from-me"]/span[text()="Hello"]')
 
        pair.sendMessageForm(client, 'insert');
        pair.sendMessage(client);

        client.waitForElementVisible('//div[@class="bubble from-me"]');

        pair.sendMessageForm(client, 'request');
        client.waitForElementVisible('//div//h3/span[text()="Request specific amount"]');
        client.waitForElementVisible('//div/input[@type="number"]');

        global.fillInput(client, 'amount', '0.0256')
        client.pause(1500);
        global.clickOnSpanButton(client, 'Request payment');    
        
        pair.sendMessage(client);
        client.expect.element('//div[@class="bubble from-me"]/i').text.to.contain('Payment request: 0.0256 DAG to ').before();
    
        // Rename devices
        global.selectAdditionalOption(client, 'Edit');
        global.clearInput(client, 'name');
        client.waitForElementNotVisible('//div[@title="New"]');
        global.fillInput(client, 'name', 'testName');
        global.clickOnButton(client, 'Save');
            
        global.goBack(client)
        client.waitForElementVisible('//li//div[text()="testName"]');

        // Remove added device from list 
        global.clickOnSpanButton(client, 'Remove a device');
        pair.deletePairedWallet(client);
        client.waitForElementVisible(`//p/span[text()="You don't have any paired devices yet."]`);
    },    
    
 	'Android Close app': (client: NightWatchClient): void => {
		client.end();
    },
};