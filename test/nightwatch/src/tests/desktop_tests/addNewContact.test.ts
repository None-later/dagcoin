import {NightWatchClient} from 'nightwatch';
import texts from '../../texts/walletText';

export const addNewContact = {
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

        // Open side menu and select address book
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Address Book');

        client.waitForElementVisible(`//div//span[text()="${texts.addressBook.info}"]`);
        client.waitForElementVisible('//div//a[@title="Add new contact"]');

        client.click('//div//a[@title="Add new contact"]');
        client.waitForElementVisible('//div[@class="contact_form"]');

        // Check for qr scanner
        menu.selectQrScanner(client);
        client.waitForElementVisible('//h3/span[text()="Scan QR Code"]');

        menu.closeQrScanner(client);

        // Check for address book inputs
        const addressBook: {[key: string]: string} = {
            'address' : '7QLIMCPHOVMZJQWGIQULVGSQYJSIPIHQ',
            'first_name' : 'Demo',
            'last_name' : 'Test',
            'email' : 'demo.test@testmail.com',
        };

        for (const value of Object.keys(addressBook)){
            client.waitForElementVisible(`//div//input[@id="${value}"]`);  
            global.fillInput(client, value, addressBook[value])

        };

        client.waitForElementVisible('//button[text()="Save"]');
        global.clickOnButton(client, 'Save');

        // Expect added contact to be listed in address book
        client.waitForElementVisible('//li/span[text()="contacts"]');
        client.waitForElementVisible('//li/span[text()="favorites"]');

        client.waitForElementVisible('//div/input[@id="search"]');
        client.waitForElementVisible('//div[@class="contacts_list_group ng-scope"]');

        // Select added contact 
        menu.selectContact(client, 'Demo Test');
        client.waitForElementVisible('//div[text()="Contact"]');
        client.waitForElementVisible('//div[@class="contact_card"]');

        // Expect to be selected on contact page
        client.waitForElementVisible('//li//span[text()="address"]');
        client.waitForElementVisible('//li//span[text()="email"]');
        client.waitForElementVisible('//button/span[text()="Send"]');

        // Edit contact account
        client.waitForElementVisible('//div/a[@ng-click="contact.editContact()"]');
        client.click('//div/a[@ng-click="contact.editContact()"]');

        client.waitForElementVisible('//div[@class="ngdialog-content"]');
        menu.contactOptions(client, 'Edit');

        client.waitForElementVisible('//div[@title="Edit Contact"]');
        client.sendKeys('//*[@id="description"]', 'This is a demo test account');
        client.pause(500);
        global.clickOnButton(client, 'Save');

        // Check for contact data
        client.waitForElementVisible('//li//div[text()="This is a demo test account"]');

        // Delete contact from address book
        client.waitForElementVisible('//div/a[@ng-click="contact.editContact()"]');
        client.click('//div/a[@ng-click="contact.editContact()"]');

        client.waitForElementVisible('//div[@class="ngdialog-content"]');
        menu.contactOptions(client, 'Delete');
        client.waitForElementVisible(`//div//span[text()="${texts.addressBook.info}"]`);
        
	},
	'Close app': (client: NightWatchClient): void => {
		client.end();
	}
};

