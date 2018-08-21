import {NightWatchClient} from 'nightwatch';
import texts from '../../texts/walletText';

export const changeWalletType = {
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

        // Open side menu and select settings
        menu.openSideBarMenu(client);
        client.waitForElementVisible('//div//strong[text()="light wallet"]');
        menu.selectSideMenuOption(client, 'Settings');

        client.waitForElementVisible(`//div//p[text()="${texts.settings.backUp}"]`);
        menu.selectSettingOption(client, 'System');
        client.waitForElementVisible('//div/ul[@class="preferences_links"]');

        // Select change wallet type from system options
        menu.selectSettingOption(client, 'Change Wallet type');
        client.waitForElementVisible('//div/h3[text()="Change wallet type!"]');

        client.expect.element('/html/body/div[3]/div/div/div[1]/p').text.to.contains(texts.changeWalletType.content).before();
        client.waitForElementVisible('//button//span[text()="Change it"]');
        client.waitForElementVisible('//button//span[text()="Cancel"]');

        // Change wallet type
        global.clickOnButton(client, 'Change it');
        client.waitForElementVisible('//div[@class="alertModal"]');
        
        client.waitForElementVisible('//div[text()=" Wallet type successfully changed, please restart the application."]');
        client.waitForElementVisible('//div//span[text()="OK"]');

        client.refresh();
        client.pause(2000);
        client.waitForElementNotPresent('//div/i[@class="fi-x"]');

        // Open side menu and check that wallet type is changed
        menu.openSideBarMenu(client);
        client.waitForElementVisible('//div//strong[text()="full wallet"]');
       
	},
	'Close app': (client: NightWatchClient): void => {
		client.end();
	}
};
