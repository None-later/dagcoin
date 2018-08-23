import {NightWatchClient} from 'nightwatch';
// import texts from '../../texts/walletText';

export const walletInformation = {
    before: function (client: NightWatchClient, done: any): void {
        const global: NightWatchClient = client.page.globalPage();
        
        const desktopSeed: string = process.env.DESKTOP_SEED || ''; 

		client.useXpath();

		// Click through introduction slides
		client.waitForElementVisible(
			'//div[@icon="safe"]/svg-icon',
		);
		global.clickOnButton(client,'Skip');

        // Agree to terms Invalid pairing code
        client.pause(2000);
        client.waitForElementVisible('//div[@class="intro_confirm_content_checkboxes"]');
		client.waitForElementVisible('//ul[contains(@class,"fadeInDown")]');
		client.pause(2000);
		global.fillCheckBox(client,'confirm.security');
		client.expect.element('//input[@id="security"]').to.be.selected.before();

		global.fillCheckBox(client,'confirm.backup');
		client.expect.element('//input[@id="backup"]').to.be.selected.before();

		client.pause(2000);
		global.fillCheckBox(client,'confirm.finish');	
		client.expect.element('//input[@id="finish"]').to.be.selected.before();

        global.clickOnButton(client,'Confirm & Finish');
        client.pause(1500);
        
        // Select restore
        client.waitForElementVisible('//*[@id="mainSection"]/section/div/div/div/div/div/div[2]/label/div');
        client.click('//*[@id="mainSection"]/section/div/div/div/div/div/div[2]/label/div');

		// Continue
		global.clickOnButton(client,'CONTINUE');
        client.waitForElementVisible('//*[@id="inputMnemonic"]');
        client.pause(1500);
        client.click('//*[@id="inputMnemonic"]');
        client.sendKeys('//*[@id="inputMnemonic"]', desktopSeed);
        global.clickOnButton(client,'Recover');
        
        client.pause(7000);
        client.refresh();
        done();
    },
// ----------------------------------------------TEST START----------------------------------------------------------------------//
  
    'Adding new contact test starts here': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();

        //------------------- Wallet is open
        // Expect following elements to be located on new wallet home site
        client.waitForElementVisible('//div[@id="walletHome"]')

        // TODO- close notification function
        client.pause(2000);
        client.waitForElementNotPresent('//div/i[@class="fi-x"]');

        // Open side menu and select wallet preferences
        menu.openSideBarMenu(client);
        client.waitForElementVisible('//div[@class="custom_edit_icon"]');
        client.pause(200);
        client.click('//div[@class="custom_edit_icon"]');

        client.waitForElementVisible('//div/section[@class="section main has-notification"]');
        client.waitForElementVisible('//section//ul[@class="preferences_links"]');

        const preferences = [
            'Wallet Alias',
            'Single address wallet',
            'Advanced'
        ];

        preferences.forEach(option => {
            client.waitForElementVisible(`//li/div/span[text()="${option}"]`);
        });

        // Change wallet alias name
        menu.selectSideMenuOption(client, 'Wallet Alias');
        client.waitForElementVisible('//div/input[@id="alias2"]');

        // Clear prew wallet alias
        global.clearInput(client, 'alias2');
        client.waitForElementVisible('//button[@type="submit"][@disabled="disabled"]');

        // Rename wallet
        global.fillInput(client, 'alias2', 'DemoTestWallet');
        global.clickOnButton(client, 'Save');
        client.waitForElementVisible('//li[@ui-sref="preferencesAlias"]//div[text()="DemoTestWallet"]');

        menu.selectSideMenuOption(client, 'Advanced');
        client.waitForElementVisible('//div/span[text()="Wallet Information"]');
        client.waitForElementVisible('//a/span[text()="Delete Wallet"]');
        
        menu.selectSideMenuOption(client, 'Wallet Information');
        client.waitForElementVisible('//div[@class="content preferences dag-scroll ng-scope"]');

        // Check for wallet info panel
        const infoSection = [
            'Wallet Information',
            'Co-signers',
            'Extended Public Keys',
            'Balance By Address'
        ];

        infoSection.forEach(type => {
            client.waitForElementVisible(`//section//h4/span[text()="${type}"]`);
        });

        client.waitForElementVisible('//div/h4[text()="All Wallet Addresses "]');
        client.waitForElementVisible('//h4/button[text()="Generate new address"]');
        
        // navigate back and open side menu
        global.goBack(client);
        client.waitForElementVisible('//div[text()="Advanced"]');

        client.pause(500);
        global.goBack(client);
        client.waitForElementVisible('//div[text()="Wallet Preferences"]');

        client.pause(500);
        menu.openSideBarMenu(client);
        client.waitForElementVisible('//li/a//div[text()="DemoTestWallet"]');
    },
	'Close app': (client: NightWatchClient): void => {
		client.end();
	}
};

