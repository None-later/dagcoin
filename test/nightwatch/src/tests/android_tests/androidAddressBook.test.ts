import {NightWatchClient} from 'nightwatch';
import { setupWallet } from '../../setup';
import texts from '../../texts/walletText';

export const androidAddressBook = {

    ...setupWallet,

    'Add a new contact to address book': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const menu: NightWatchClient = client.page.navMenu();
        
        // Select Address book from side menu
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Address Book');

        client.expect.element('//div/p[1]/span').text.to.contain(texts.addressBook.info).before();
        client.expect.element('//div/p[2]/span').text.to.contain(texts.addressBook.description).before();

        client.click('//div//a[@title="Add new contact"]')
        client.waitForElementVisible('//div[text()="New Contact"]');
        client.waitForElementVisible('//form[@name="newContact"]');

        const contactField: {[key: string]: string} = {
            address: '7QLIMCPHOVMZJQWGIQULVGSQYJSIPIHQ',
            first_name: 'Demo',
            last_name: 'Test',
            email: 'demo.test@testmail.com',
        };

        for (const type of Object.keys(contactField)) {
            client.waitForElementVisible(`//div//input[@id="${type}"]`);
            global.fillInput(client, type, contactField[type]);
        }; 
        global.clickOnButton(client, 'Save');

        // Check for contact to be added 
        client.waitForElementVisible('//tbody/tr[@ng-repeat="contact in list"]');
        client.waitForElementVisible('//div/input[@id="search"]');

        client.waitForElementVisible('//ul//span[text()="contacts"]');
        client.waitForElementVisible('//ul//span[text()="favorites"]');

        // Select added contact
        menu.selectContact(client, 'Demo Test');
        client.waitForElementVisible('//div[@class="contact_card"]');

        client.waitForElementVisible('//div/span[text()="address"]');
        client.waitForElementVisible('//div/span[text()="email"]');

        // Click on send button 
        global.clickOnButton(client, 'Send');
        client.waitForElementVisible('//div[@id="send"]');

        // Check that user is abel to select user from address book in send menu
        global.clearInput(client, 'address');
        client.waitForElementVisible('//div/a/i[@class="icon icon-d icon-wallet"]');
        client.click('//div/a/i[@class="icon icon-d icon-wallet"]');

        client.waitForElementVisible('//section/h1/span[text()="Address book"]');
        client.waitForElementVisible('//li//div[text()="Demo Test"]');
        client.expect.element('//div[@class="cursor-pointer"]/div[2]').text.to.contain('7QLIMCPHOVMZJQWGIQULVGSQYJSIPIHQ').before();

        client.click('//li//div[text()="Demo Test"]');
        client.waitForElementNotPresent('//section/h1/span[text()="Address book"]');

        // Open address book and check for favorites 
        menu.openSideBarMenu(client);
        menu.selectSideMenuOption(client, 'Address Book');

        menu.selectSideMenuOption(client, 'favorites');
        client.waitForElementVisible(`//div//p[text()="You don't have any favorite contacts selected."]`)

        // Mark contact as favorite
        menu.selectSideMenuOption(client, 'contacts');
        menu.addToFavorite(client);

        // Check for favorite
        menu.selectSideMenuOption(client, 'favorites');
        client.waitForElementVisible('//tbody/tr[@ng-repeat="contact in list"]');

        // Delete contact
        menu.selectContact(client, 'Demo Test');
        client.waitForElementVisible('//div/a[@ng-click="contact.editContact()"]');

        client.click('//div/a[@ng-click="contact.editContact()"]');
        client.waitForElementVisible('//ul//li[text()="Edit"]');

        menu.contactOptions(client, 'Delete');

        client.expect.element('//div/p[1]/span').text.to.contain(texts.addressBook.info).before();
        client.expect.element('//div/p[2]/span').text.to.contain(texts.addressBook.description).before();
        
    },

	'Android Close app': (client: NightWatchClient): void => {
		client.end();
	}
};
