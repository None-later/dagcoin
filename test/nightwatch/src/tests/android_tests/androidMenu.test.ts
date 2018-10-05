import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';
import texts from '../../texts/walletText';

export const androidMenuTest = {

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

    'Android navigate throw bottom menu': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();

        // Select Receive from bottom menu  
        menu.selectBottomMenuItem(client, 'Receive');
        client.waitForElementVisible('//div[@id="receive"]');

        client.expect.element('//div/h2').text.to.contain('Share it with the sender via email or text.').before();
        client.waitForElementVisible('//div/img[@id="receive-address-img"]');

        global.getWalletCode(client, '//div//h4');
        client.waitForElementVisible('//a//span[text()="Request a specific amount"]');

        // Select Send from bottom menu
        menu.selectBottomMenuItem(client, 'Send');
        client.waitForElementVisible('//div[@id="send"]');

        client.waitForElementVisible('//form[@name="sendForm"]');
        client.waitForElementVisible('//button/span[text()="Send "]');

        client.waitForElementVisible('//div//span[text()="Amount"]');
        client.waitForElementVisible('//div/input[@placeholder="Amount"]');        

        client.waitForElementVisible('//div//span[text()="Receiver"]');
        client.waitForElementVisible('//div/input[@placeholder="DAG address"]');  

        // Select Paired Devices from bottom menu
        menu.selectBottomMenuItem(client, 'Paired Devices');
        client.waitForElementVisible('//div/svg-icon[@name="share"]');

        client.waitForElementVisible(`//div//span[text()="You don't have any paired devices yet."]`);
        client.expect.element('//div/p[2]/span').text.to.contains('Press "+" in the right upper corner to pair with device.').before();

    },

    'Android navigate throw side menu ': (client: NightWatchClient): void => {
        // const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();
        
        const sideMenuOptions = [
            'Address Book',
            'Paired devices',
            'Settings',
            'Add new wallet',

        ];

        // Open side menu and check for menu options
        sideMenuOptions.forEach(option => {
            menu.openSideBarMenu(client);
            menu.selectSideMenuOption(client, option);
            client.pause(900);

        });

        // Select add new wallet option
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Add new wallet');   

        client.waitForElementVisible('//div[@title="Create new wallet"]');

        client.waitForElementVisible('//ul//a[text()="Plain Wallet"]');
        client.waitForElementVisible('//label//span[text()="Wallet name"]');

        client.waitForElementVisible('//label//input[@placeholder="New wallet"]');
        client.expect.element('//div[@class="description m10b"]/span').text.to.contain(texts.createNewWallet.description).before();

        client.waitForElementVisible('//label//span[text()="Single address wallet"]');
        client.waitForElementVisible('//label//span[@name="isSingleAddress"]');

        client.waitForElementVisible('//button//span[text()="Create new wallet"]');
        client.waitForElementVisible('//ul//a[text()="Multidevice Wallet"]');

        // Select multi wallet option
        menu.selectTab(client, 'Multidevice Wallet');
        client.waitForElementVisible('//input[@placeholder="Laptop + phone + tablet"]');

        const inputFields = [
            'Total number of co-signers',
            'Required number of signatures',
            'Co-signer 1:',
            'Co-signer 2:',
        ];
 
        inputFields.forEach(field => {
            client.waitForElementVisible(`//span/span[text()="${field}"]`);
        });
 
        client.waitForElementVisible('//button//span[text()="Create 2-of-3 wallet"]');

        // Open side menu and select paired devices
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Paired devices');  

        client.waitForElementVisible('//div/div[text()="Small Expenses Wallet"]');
        client.waitForElementVisible('//div//a[@title="Add a new device"]');
        client.click('//div//a[@title="Add a new device"]');

        client.waitForElementVisible('//ul/li//span[text()="Invite the other device"]');
        client.waitForElementVisible('//ul/li//span[text()="Accept invitation from the other device"]');

            // Select invite
            const addDeviceOptions = [
                'Invite the other device',
                'Accept invitation from the other device',
            ];
    
            addDeviceOptions.forEach(option => {
                client.waitForElementVisible(`//li/a//span[text()="${option}"]`);
                client.click(`//li/a//span[text()="${option}"]`);
                
                client.waitForElementVisible('//div[@class="content ng-scope"]');
                if (option === 'Invite the other device') {
    
                    client.waitForElementVisible(`//div//span[text()="${texts.addDevice.acceptInvite}"]`);
                    client.pause(500);
                    menu.goBack(client);
    
                } else {
                    client.waitForElementVisible(`//form//span[text()="${texts.acceptInvitation.info}"]`);
                    client.waitForElementVisible('//div/input[@id="code"]');
                    client.waitForElementVisible('//button[text()="Pair"]');
                    client.pause(500);
                    menu.goBack(client);
    
                }
            });
        
        menu.goBack(client);

        // Open side menu select settings
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Settings');  

        // Expect to be located on settings page
        client.waitForElementVisible('//div[text()="Global preferences"]');
        client.waitForElementVisible('//div/h4[text()="Wallet Backup"]');
        
        client.waitForElementVisible('//h4/span[text()="GENERAL"]');
        client.waitForElementVisible('//h4/span[text()="Other"]');

            // Select general settings options
            const generalOption: {[key: string]: string} = {
                System: '#/system',
                Security: '#/security',
            };

            for (const type of Object.keys(generalOption)){

                menu.selectHrefElement(client, generalOption[type]);
                client.waitForElementVisible(`//div[text()="${type}"]`);

                if (type === 'System') {

                    client.waitForElementVisible('//div/span[text()="Device name"]');
                    client.waitForElementVisible('//div/span[text()="Hub Settings"]');
                    menu.goBack(client);

                } else {

                    client.waitForElementVisible('//div/span[text()="Backup wallet"]');
                    client.waitForElementVisible('//div/span[text()="Recover wallet"]');
                    client.waitForElementVisible('//div/h4/span[text()="Authorization type"]');
                    menu.goBack(client);

                }
            };

        client.waitForElementVisible('//div[text()="Global preferences"]');
        
            // Select other settings options
            const otherOptions: {[key: string]: string} = {
                'About Device': '#/aboutDevice',
                'About Dagcoin': '#/about'
            };
            
            for (const type of Object.keys(otherOptions)){

                menu.selectHrefElement(client, otherOptions[type]);
                client.waitForElementVisible(`//div[text()="${type}"]`);

                if (type === 'About Device'){
                    client.waitForElementVisible('//div/span[text()="Device address"]');
                    menu.goBack(client);
                } else {
                    client.waitForElementVisible('//div/span[text()="Version"]');
                    client.waitForElementVisible('//div/span[text()="Commit hash"]');
                    client.waitForElementVisible('//div/span[text()="Terms of Use"]');
                    client.waitForElementVisible('//div/span[text()="Session log"]');
                };
            };

        menu.goBack(client);    
        menu.openSideBarMenu(client);
        menu.selectWallet(client, 'Small Expenses Wallet');

    },

    'Check for "My wallet" menu of new wallet and recover wallet': (client: NightWatchClient): void => {
        const androidSeed: string = process.env.ANDROID_SEED || ''; 
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();

        // Check for new wallet my wallet menu 
        const newWalletHome: {[key: string]: string} = {
            'heading': texts.myWallet.heading,
            'explanation': texts.myWallet.explanation,
            'show-address': texts.myWallet.showAddress
        };

        for (const values of Object.keys(newWalletHome)){
            client.expect.element(`//div/p[@class="${values}"]/span`).text.to.contain(`${newWalletHome[values]}`).before();
        };
        client.waitForElementVisible('//button/span[text()="Buy Dagcoin"]');

        // Recover wallet
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Settings');

        menu.selectSettingOption(client, 'Security');
        menu.selectSettingOption(client, 'Recover wallet');

		client.click('//*[@id="inputMnemonic"]');
        client.sendKeys('//*[@id="inputMnemonic"]', androidSeed);

		global.clickOnButton(client,'Recover');
        client.waitForElementVisible('//div[@class="alertModal"]');
        
        client.refresh();
        client.waitForElementVisible('//div[@id="walletHome"]');

        // Check for recover`d wallet 
        client.waitForElementVisible('//div[@class="dag_transactions_list"]');
        client.waitForElementVisible('//h4/span[text()="Transactions History"]');

        client.waitForElementVisible('//button//span[text()="Export To CSV"]');

        const transDataType: {[key: string]: string} = {
            'status': 'Wallet balance',
            'sum': 'Tap and hold balance to hide it',
            'expand': '0'
        };

        for (const type of Object.keys(transDataType)){
            client.waitForElementVisible(`//div//span[text()="${transDataType[type]}"]`);
            client.waitForElementVisible(`//ul//div[@class="transaction_${type}"]`);
        };

        // Check for notifications
        client.waitForElementVisible('//div/span[@title="Notifications"]');
        client.click('//div/span[@title="Notifications"]');

        client.waitForElementVisible('//h3/span[text()="Notifications"]');
        global.closeQrScanner(client);

        // Check transaction details
        client.waitForElementVisible('//ul//div[@class="transaction_expand"]');
        client.click('//ul//div[@class="transaction_expand"]');
        client.waitForElementVisible('//h4/span[text()="Transaction details"]');
        client.waitForElementVisible('//h4/span[text()="Transaction status"]');

        const dealInfo = [
            'To',
            'Status',
            'Date:',
            'Fee' ,
            'Unit', 
            'Amount'
        ];

        dealInfo.forEach(type => {
            client.waitForElementVisible(`//li//span[text()="${type}"]`);
        });

        // select make new payment
        global.clickOnSpanButton(client, 'Make new payment');
        client.waitForElementVisible('//div[@id="send"]');

    },

	'Android Close app': (client: NightWatchClient): void => {
		client.end();
	}
};

