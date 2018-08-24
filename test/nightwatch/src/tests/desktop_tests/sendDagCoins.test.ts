import {NightWatchClient} from 'nightwatch';

export const sendDagCoins = {
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

        // Select send from bottom menu
        menu.selectBottomMenuItem(client, 'Send');
        client.waitForElementVisible('//div[@id="send"]');

        // Fill the input fields
        global.fillInput(client, 'amount', '0.000001');
        global.fillInput(client, 'address', '3I4MPIJL7VFYW3ZYPF72XKMQQ2WCACHA');
        
        global.clickOnButton(client, 'Send');
        client.waitForElementVisible('//div[@class="modal-content fix-modals-touch animated fasten slideInDown transactions_details ng-scope"]');

        client.waitForElementVisible('//div/h4/span[text()="Transaction details"]');
        client.waitForElementVisible('//div/h4/span[text()="Transaction status"]');

        const transactionData = [
            'To',
            'Date:',
            'Unit',
            'Status',
            'Fee',
            'Amount'
        ];

        transactionData.forEach(type => {
            client.waitForElementVisible(`//li//span[text()="${type}"]`);
        });

        global.closeQrScanner(client);
        client.waitForElementVisible('//div[@class="content wallet dag-scroll ng-scope"]');

    },
	'Close app': (client: NightWatchClient): void => {
        client.pause(2000);
		client.end();
	}
};

