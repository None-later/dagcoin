import {NightWatchClient} from 'nightwatch';
import texts from '../../texts/walletText';

export const walletMenuOptions = {
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
  
    'Wallet menu test starts here': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();

        //------------------- Wallet is open
        // Expect following elements to be located on new wallet home site
        client.waitForElementVisible('//div[@id="walletHome"]')

        // TODO- close notification function
        client.pause(2000);
        client.waitForElementNotPresent('//div/i[@class="fi-x"]');

        // Check for wallet home elements
        client.waitForElementVisible('//div[@class="p-wallet js-introduction"]');
        client.waitForElementVisible('//div[@class="price"]');

        client.expect.element('//div/h4/span').text.to.contain(texts.myWallet.transactions).before();
        client.waitForElementVisible('//button//span[text()="Export To CSV"]');

        client.waitForElementVisible('//div[@class="dag_transactions_table"]');

        const transactionData = [
            'transaction_status',
            'transaction_meta',
            'transaction_sum',
            'transaction_expand',
        ];
        transactionData.forEach(type => {
            client.waitForElementVisible(`//li/div[@class="${type}"]`);
        });

        // Select Receive from bottom menu and check for page elements
        menu.selectBottomMenuItem(client, 'Receive');
        client.waitForElementVisible('//div[@id="receive"]');

        client.expect.element('//div/h2').text.to.contain(texts.receive.share).before();
        global.getWalletCode(client, '//div/h4');

        // Select Request amount and check for modal content
        client.waitForElementVisible('//div//span/span[text()="Request a specific amount"]');
        client.click('//div//span/span[text()="Request a specific amount"]');

        client.waitForElementVisible('//div[@class="modal-content fix-modals-touch ng-scope"]');
        client.waitForElementVisible('//div/a[@class="close_modal"]');

        client.expect.element('//div//h3/span').text.to.contain(texts.modals.receiveModal).before();
        client.waitForElementVisible('//div/input[@name="amount"]');

        client.waitForElementVisible('//button/span[text()="Generate QR Code"]');
        client.click('//div/a[@class="close_modal"]');
        
        client.waitForElementNotVisible('//div[@class="modal-content fix-modals-touch ng-scope"]');
        client.pause(500);

        // Select send from bottom menu and check for page elements
        menu.selectBottomMenuItem(client, 'Send');
        client.waitForElementVisible('//div/div[@id="send"]');

        const sendFields: {[key: string]: string } = {
            Amount: 'amount',
            Receiver: 'address',
        };
        for (const value of Object.keys(sendFields)){
            client.waitForElementVisible(`//div//span[text()="${value}"]`);
            client.waitForElementVisible(`//div/input[@name="${sendFields[value]}"]`);
        };

        client.waitForElementVisible('//button/span[text()="Send "]');
        menu.selectQrScanner(client);

        client.waitForElementVisible('//div/h3/span[text()="Scan QR Code"]');
        client.waitForElementVisible('//div[@id="qr-scanner-camera-border"]');

        menu.closeQrScanner(client);
        client.waitForElementNotPresent('//div/h3/span[text()="Scan QR Code"');
        client.pause(500);

       // Select Paired Devices and page elements
       menu.selectBottomMenuItem(client, 'Paired Devices');
       client.waitForElementVisible('//ul/li[@class="ng-scope"]');

       client.waitForElementVisible('//div[@class="right text-gray"]');
       client.waitForElementVisible('//span[text()="Remove a device"]');

       // Add a new device
       client.waitForElementVisible('//div//a[@title="Add a new device"]');
       client.click('//div//a[@title="Add a new device"]');

       client.waitForElementVisible('//div/ul[@class="no-bullet manage size-12"]');

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

        client.waitForElementVisible('//div[text()="Add device"]');
        client.pause(500);

        menu.goBack(client);
        client.waitForElementVisible('//div[@class="ng-scope"]');

        // Start side menu options testing
       // Select 'Preferences' nav menu
       menu.openSideBarMenu(client);
       menu.selectSideMenuOption(client, 'Add new wallet');

       client.waitForElementVisible('//ul//a[text()="Plain Wallet"]');
       client.waitForElementVisible('//ul//a[text()="Multidevice Wallet"]');

       client.waitForElementVisible('//input[@name="walletName"]');
       client.waitForElementVisible(`//div/span[text()="${texts.createNewWallet.description}"]`);
       client.waitForElementVisible('//button//span[text()="Create new wallet"]');

       // Select multidevic and check for inputs
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

       // Select address book from side menu
       menu.openSideBarMenu(client);
       menu.selectSideMenuOption(client, 'Address Book');

       client.waitForElementVisible(`//p/span[text()="${texts.addressBook.info}"]`);
       //    client.waitForElementVisible(`//p/span[text()="${texts.addressBook.description}"]`);

       // Select Paired devices from side menu
       menu.openSideBarMenu(client);
       menu.selectSideMenuOption(client, 'Paired devices');  
       
       client.waitForElementVisible('//div[text()="Faucet"]');
       global.selectDevice(client, 'Faucet');

       client.waitForElementVisible('//div/div[@class="chat-message ng-scope"]');
       client.waitForElementVisible('//form[@name="chatForm"]');

       client.waitForElementVisible('//button/svg-icon[@name="paper-plane-o"]');
       client.waitForElementVisible('//button/svg-icon[@name="add"]');

       client.waitForElementVisible('//form/textarea[@id="message"]');
       menu.goBack(client);

       client.pause(500);

       // Select settings from side menu
       menu.openSideBarMenu(client);
       menu.selectSideMenuOption(client, 'Settings');

       client.waitForElementVisible(`//div//p[text()="${texts.settings.backUp}"]`);
       client.pause(1000);

       const setupOptions: {[key: string]: string} = {
            System: '#/system',
            Security: '#/security',
            'About Device': '#/aboutDevice',
            'About Dagcoin': '#/about',
       };

       for (const value of Object.keys(setupOptions)){
           client.pause(500);
           menu.selectHrefElement(client, setupOptions[value]);
           client.waitForElementVisible(`//div//div[text()="${value}"]`);
           client.pause(500);
           menu.goBack(client);
       };

	},
	'Close app': (client: NightWatchClient): void => {
		client.end();
	}
};

