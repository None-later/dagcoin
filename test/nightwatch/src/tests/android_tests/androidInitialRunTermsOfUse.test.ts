import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';

export const androidInitialRunTermsOfUse = {
    '@disabled': true,
    
	'Android Skip to terms of use and check required points': (client: NightWatchClient): void => {
		const global: NightWatchClient = client.page.globalPage();
        client.useXpath();
        client.setContext('WEBVIEW_org.dagcoin.client');
		client.contexts(context => {
		    client.setContext(context.value[1]);
		});	

		// Skip introduction slides
		client.waitForElementVisible('//div[@icon="safe"]/svg-icon');
		global.clickOnButton(client,'Skip');

		// Check first two points
		client.waitForElementVisible('//div[@class="intro_confirm_content_checkboxes"]');
		client.waitForElementVisible('//ul[contains(@class,"fadeInDown")]');
		global.fillCheckBox(client,'confirm.security');
		client.expect.element('//input[@id="security"]').to.be.selected.before();

		global.fillCheckBox(client,'confirm.backup');
		client.expect.element('//input[@id="backup"]').to.be.selected.before();

        // Expect confirmation button to be disabled
        client.expect.element('//button[text()="Confirm & Finish"]').to.not.be.enabled.before();

        // Uncheck one of the previously checked points
        global.fillCheckBox(client,'confirm.backup');
        client.expect.element('//input[@id="backup"]').to.not.be.selected.before();
        
        // Expect Terms of Use section to not be visible
        client.waitForElementNotVisible('//div[contains(@class,"intro_confirm_content_trigger")]');

        // Check required points
        global.fillCheckBox(client,'confirm.backup');
        client.expect.element('//input[@id="backup"]').to.be.selected.before();
    },
    'Android Open Terms of Use': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        const paragraphs: string[] = setup.initialRun.termsOfUse;

        client.waitForElementVisible('//span[text()="Terms Of Use"]');
        client.click('//span[text()="Terms Of Use"]');

        // Expect text
        client.expect.element('//div[contains(@class,"terms_of_use_confirm")]').to.be.visible.before();
        client.expect.element('//div[@role="document"]').text.to.contain('TERMS OF USE').before();
        
        paragraphs.forEach(paragraph => {
            client.expect.element('//div[@role="document"]').text.to.contain(paragraph).before();
        });

        // Go back
        global.goBack(client);
        client.waitForElementVisible('//div[@class="intro_confirm_content_checkboxes"]');
        
    },
    'Android Agree to terms of use, confirm': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();

        // FIXME! Checkbox is already filled
        // global.fillCheckBox(client,'confirm.finish');	
        // client.expect.element('//input[@id="finish"]').to.be.selected.before();

        client.expect.element('//button[text()="Confirm & Finish"]').to.be.enabled.before();
		global.clickOnButton(client,'Confirm & Finish');

        client.expect.element('//span[text()="WELCOME TO DAGCOIN"]').to.be.visible.before();
	},
	'Android Close app': (client: NightWatchClient): void => {
		client.end();
	}
};