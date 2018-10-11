import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';

export const androidSettingsTest = {

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

    'Check for settings options of the wallet': (client: NightWatchClient): void => {
        const menu: NightWatchClient = client.page.navMenu();
        const global: NightWatchClient = client.page.globalPage();

        // Open side menu and select settings option
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Settings');
        client.waitForElementVisible('//div[@title="Global preferences"]');

        // Check for  following global preferences are visible under settings
        const globalPref = [
            'System',
            'Security',
            'About Device',
            'About Dagcoin'
        ];

        globalPref.forEach(type => {
            client.waitForElementVisible(`//li/div/span[text()="${type}"]`);
        });

        // Expect wallet back up message to be visible
        client.waitForElementVisible('//div/h4[text()="Wallet Backup"]');
        client.waitForElementVisible('//div/p[text()="For security reasons we strongly recommend you to back your wallet seed up as soon as possible."]');

        // Select system from menu     
        menu.selectHrefElement(client, '#/system');

        const walletSetup: {[key: string]: string} = {
            'Device name' : '#/preferencesDeviceName',
            'Hub Settings' : '#/preferencesHubSettings',

        };

        for (const value of Object.keys(walletSetup)){
            client.waitForElementVisible(`//div/span[text()="${value}"]`);
            menu.selectHrefElement(client, walletSetup[value]);
            client.waitForElementVisible('//div/input[@type="text"]');
            global.goBack(client);;

        };                                         

        global.goBack(client);

        // Select about dagcoin from menu
        menu.selectHrefElement(client, '#/about');

        const aboutDag = [
            'Version',
            'Commit hash',
            'Terms of Use',
            'Session log',
        ];

        aboutDag.forEach(type => {
            client.waitForElementVisible(`//li/div/span[text()="${type}"]`);
        });
        global.goBack(client);

        // Select aboutDevice from menu
        menu.selectHrefElement(client, '#/aboutDevice'); 
        client.waitForElementVisible('//div/span[text()="Device address"]');
        global.goBack(client);

        // Select security from menu
        menu.selectHrefElement(client, '#/security');
        
        const securityOpt = [
            'Backup wallet',
            'Recover wallet',
            'Set password',
            'Show Click to Receive',
        ];

        securityOpt.forEach(type => {
            client.waitForElementVisible(`//div/span[text()="${type}"]`);
        });

        // Check for backup wallet menu options
        menu.selectSettingOption(client, 'Backup wallet');   
        client.waitForElementVisible('//div//span[text()="Show the Wallet Seed Anyway"]');
        client.click('//div//span[text()="Show the Wallet Seed Anyway"]');
       
        const backupSeed = [
            'Your Wallet Seed:',
            'Write it down and keep it somewhere safe.',
            'Once you have written your wallet seed down, it is recommended to delete it from this device.',
        ];

        backupSeed.forEach(type => {
            client.waitForElementVisible(`//div//span[text()="${type}"]`);
        });
        client.waitForElementVisible('//button//span[text()="DELETE WORDS"]');

        // Select Full backup option and check for inputs
        menu.selectTab(client, 'Full backup');
        client.waitForElementVisible('//input[@type="password"]');
        global.goBack(client);


        // Check for recover wallet menu options
        menu.selectSettingOption(client, 'Recover wallet');  
        client.waitForElementVisible('//form[@name="settingsDeviceNameForm"]');

        client.waitForElementVisible('//div//span[text()="WARNINGS:"]');

        const warNotif =[    
        'WARNINGS:',
        'This will permanently delete all your existing wallets!',
        'Only single-sig wallets can be recovered.',
        'Correspondents are not restored.',
        'Do not clone wallets, stop using the original wallet with this seed.'
        ];

        warNotif.forEach(type => {
            client.waitForElementVisible(`//div//span[text()="${type}"]`);
        });
        
        menu.selectTab(client, 'Recover from backup');
        client.waitForElementVisible('//div/span[text()="WARNING: This will permanently delete all your existing wallets!"]');
        
        client.waitForElementVisible('//input[@id="recoveryPassword"]');
        client.waitForElementVisible('//input[@type="file"]');
                
    },

    'Android Close app': (client: NightWatchClient): void => {
		client.end();
	}
};
