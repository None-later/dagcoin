import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';

export const androidRegisterDefaultWallet = {

	'Android Set up default wallet': (client: NightWatchClient): void => {
		const global: NightWatchClient = client.page.globalPage();
		const menu: NightWatchClient = client.page.navMenu();
		const icons = ['safe', 'transfer', 'business'];
		const textFirstHalves = [
			'This app stores your ', 
			'Up to ', 
			'We listen to our '
		];
		const textSecondHalves = [
			'with cutting-edge state of the art security', 
			'than most alternative solutions!', 
			'to deliver the best product on the market!'
		];
		const buttons = ['GOT IT', 'AWESOME', 'CREATE WALLET'];

		client.useXpath();
		client.setContext('WEBVIEW_org.dagcoin.client');
		client.contexts(context => {
		    client.setContext(context.value[1]);
		});	

		// Click through introduction slides
		for (let i = 0; i < 3; i++) {
			client.waitForElementVisible(`//div[@icon="${icons[i]}"]/svg-icon`);
			client.expect
				.element('//div[contains(@class,"swiper-slide-active")]')
				.text.to.contain(textFirstHalves[i])
				.before();
			client.expect
				.element('//div[contains(@class,"swiper-slide-active")]')
				.text.to.contain(textSecondHalves[i])
				.before();
			global.clickOnButton(client,buttons[i]);
		}

		// Agree to terms
		client.waitForElementVisible('//div[@class="intro_confirm_content_checkboxes"]');
		client.expect
			.element('//div[@class="intro_confirm_content_checkboxes"]')
			.text.to.contain('Almost done!')
			.before();

		client.waitForElementVisible('//ul[contains(@class,"fadeInDown")]');
		client.expect
			.element('//ul[contains(@class,"fadeInDown")]')
			.text.to.contain(setup.initialRun.securityCheckbox)
			.before();

		client.expect
			.element('//ul[contains(@class,"fadeInDown")]')
			.text.to.contain(setup.initialRun.backupCheckbox)
			.before();

		client.pause(2000);
		global.fillCheckBox(client,'confirm.security');
		client.expect.element('//input[@id="security"]').to.be.selected.before();

		global.fillCheckBox(client,'confirm.backup');
		client.expect.element('//input[@id="backup"]').to.be.selected.before();

		client.pause(2000);
		client.expect
			.element('//label[@for="finish"]')
			.text.to.contain('I HAVE READ, UNDERSTOOD AND AGREE TO ')
			.before();

		client.expect.element('//label[@for="finish"]').text.to.contain('TERMS OF USE').before();
		global.fillCheckBox(client,'confirm.finish');	
		client.expect.element('//input[@id="finish"]').to.be.selected.before();

		global.clickOnButton(client,'Confirm & Finish');

		// Expect registration selection not to be displayed for android
		client.expect.element('//span[text()="Please choose registration type"]').to.not.be.present.after(2000);

		// Continue
		client.expect.element('//span[text()="WELCOME TO DAGCOIN"]').to.be.visible.before();
		global.clickOnButton(client,'CONTINUE');
		client.expect
			.element('//div[@ng-show="splash.bDeviceNameSet"]')
			.text.to.contain(setup.initialRun.deviceNameSlide_1)
			.before();
		client.expect
			.element('//div[@ng-show="splash.bDeviceNameSet"]')
			.text.to.contain(setup.initialRun.deviceNameSlide_2)
			.before();
		global.clickOnButton(client,'GET STARTED');

		// Small expenses wallet view
		client.waitForElementVisible('//section[@ui-view="main"]//div[text()="Small Expenses Wallet"]');
		client.waitForElementVisible('//div[@id="walletHome"]');
		client.expect.element('//p[@class="heading"]').text.to.contain('Start sending Dagcoin').before();
		client.expect.element('//p[@class="explanation"]').text.to.contain(setup.initialRun.getStarted).before();

		// Check that wallet type is full in sidebar menu
        menu.openSideBarMenu(client);
        client.expect.element('//nav[contains(@class,"sidebar")]').to.be.visible.before();
        client.expect.element('//nav/header').text.to.contain('light wallet').before();
	},
	'Android Close app': (client: NightWatchClient): void => {
		client.end();
	}
};