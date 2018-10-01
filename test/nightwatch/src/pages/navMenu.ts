import {CallbackResult, NightWatchClient, PageObject} from 'nightwatch';

const navMenu: PageObject = {
	commands: [
		{
			openSideBarMenu: (client: NightWatchClient): void => {
				const sideBarIcon: string = '//span[@title="Preferences"]';
				client.waitForElementVisible(sideBarIcon).click(sideBarIcon);
			},

			goBack: (client: NightWatchClient): void => {
				const backButton: string = '//svg-icon[contains(@class,"back-button")]/parent::*';
				client.waitForElementVisible(backButton).click(backButton);
			},

			selectBottomMenuItem: (client: NightWatchClient, item: string): void => {
				let menuItem: string = '//span[@class="ng-binding"][contains(text(),"' + item + '")]';
				client.isVisible('//span[@class="ng-binding"][contains(text(),"' + item + '")]', (result: CallbackResult) => {
					if (result.value) {
						client.waitForElementVisible(menuItem).click(menuItem);
					} else {
						client.elements(
							'xpath',
							'//span[@class="ng-binding"][contains(text(),"' + item + '")]',
							(elementResult: CallbackResult) => {
								menuItem =
									'(//span[@class="ng-binding"][contains(text(),"' + item + '")])[' + elementResult.value.length + ']';
								client.waitForElementVisible(menuItem).click(menuItem);
							},
						);
					}
				});
			},

			selectQrScanner: (client: NightWatchClient): void => {
				const qrTarget = '//div//a[@id="qr-scanner"]';

				client.waitForElementVisible(qrTarget).click(qrTarget);
			},

			closeQrScanner: (client: NightWatchClient): void => {
				const close = '//div/a[@class="close_modal"]';

				client.waitForElementVisible(close).click(close);
			},

			selectHrefElement: (client: NightWatchClient, option: string): void => {
				const target = `//ul/li[@href="${option}"]`;

				client.waitForElementVisible(target).click(target);
			},

			selectSideMenuOption: (client: NightWatchClient, option: string): void => {
				const sideMenu = `//ul/li//span[text()="${option}"]`;

				client.waitForElementVisible(sideMenu).click(sideMenu);
			},

			selectTab: (client: NightWatchClient, menu: string): void => {
				const target = '//li/a[text()="' + menu + '"]';

				client.waitForElementVisible(target).click(target);
			},

			selectContact: (client: NightWatchClient, name: string): void => {
				const target = '//div[@class="avatar"]/../a[text()="' + name + '"]';

				client.waitForElementVisible(target).click(target);
			},
			// func for editing or delete contact from address book
			contactOptions: (client: NightWatchClient, option: string): void => {
				const target = '//ul//li[text()="' + option + '"]';

				client.waitForElementVisible(target).click(target);
			},

			selectSettingOption: (client: NightWatchClient, option: string): void => {
				const target = '//li//span[text()="' + option + '"]';

				client.waitForElementVisible(target).click(target);
			},

			addToFavorite: (client: NightWatchClient): void => {
				const start = '//tbody/tr/td[2]/div';

				client.waitForElementVisible(start).click(start);
			},

			selectAvatar: (client: NightWatchClient, wallet: string): void => {
				const target = `//ul/li[${wallet}]//div[@class="custom_edit_icon"]`;

				client.waitForElementVisible(target).click(target);
			},

			openSessionLog: (client: NightWatchClient): void => {
				client.waitForElementVisible('//*[@id="mainSection"]/section/div[1]/div[3]/ng-transclude/div');
				
				client.click('//*[@id="mainSection"]/section/div[1]/div[3]/ng-transclude/div');
			}
		},
	],

	elements: {},
};

export = navMenu;
