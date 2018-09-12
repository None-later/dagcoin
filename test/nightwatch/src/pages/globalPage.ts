import {NightWatchClient, PageObject} from 'nightwatch';

const globalPage: PageObject = {
	commands: [
		{
			getStarted: (client: NightWatchClient): void => {
				const swiper: string = '//span[contains(@class, "swiper-pagination-bullet")]';

				client.pause(4000);
				client.waitForElementVisible(swiper, 7500);
			},
			goBack: (client: NightWatchClient): void => {
				const backButton: string = '//svg-icon[contains(@class,"back-button")]/parent::*';
				client.waitForElementVisible(backButton).click(backButton);
			},
			fillCheckBox: (client: NightWatchClient, ngModel: string): void => {
				const input: string = `//input[@type="checkbox" and @ng-model="${ngModel}"]`;
				const label: string = `${input}/parent::*/label`;
				client.waitForElementVisible(label).click(label);
			},
			fillRadioBox: (client: NightWatchClient, id: string): void => {
				const input: string = `//input[@type="radio" and @id="${id}"]`;
				const label: string = `${input}/parent::*`;
				client.waitForElementVisible(label).click(label);
			},
			clickOnButton: (client: NightWatchClient, name: string) => {
				const button = `//button[contains (.,"${name}")]`;
				client.waitForElementVisible(button).click(button);
			},
			clearInput: (client: NightWatchClient, id: string): void => {
				const input: string = '//input[@id="' + id + '"]';
				client.waitForElementVisible(input).clearValue(input);
			},
			fillInput: (client: NightWatchClient, id: string, value: string): void => {
				const input: string = '//input[@id="' + id + '"]';
				client.waitForElementVisible(input).setValue(input, value);
			},
			fillFormInput: (client: NightWatchClient, placeholder: string, value: string): void => {
				const input: string = '//div[@class="input-wrap"]/input[@placeholder="' + placeholder + '"]';
				client
					.waitForElementVisible(input)
					.clearValue(input)
					.setValue(input, value);
			},
			selectDevice: (client: NightWatchClient, itemText: string, timeout?: number): void => {
				const listItem: string = '//li/div[contains(string(), "' + itemText + '")]';
				client.waitForElementVisible(listItem, timeout).click(listItem);
			},
			insertAddress: (client: NightWatchClient): void => {
				const insertButton: string = '//button[@class="chatbutton left"]';
				const insertValue: string = '//a[contains(string(), "Insert my address")]';
				const sendMessageButton: string = '//button[@type="submit"]';

				client.waitForElementVisible(insertButton).click(insertButton);
				client.waitForElementVisible(insertValue).click(insertValue);
				client.waitForElementVisible(sendMessageButton).click(sendMessageButton);
			},
			checkLatestTransactionStatus: (client: NightWatchClient, status: string, timeout?: number): void => {
				const title: string =
					'//div[@class="dag_transactions_list"]/div[2]/div[1]/ul/li[1]/div[@class="transaction_meta"]/div[contains(string(),"' +
					status +
					'")]';
				client.waitForElementVisible(title, timeout);
			},
			insertAmount: (client: NightWatchClient, value: string): void => {
				const amountInput: string = '//input[@placeholder="Amount"]';
				client.waitForElementVisible(amountInput).setValue(amountInput, value);
			},

			getWalletCode: (client: NightWatchClient, location: string): void => {
				client.getText(location, result => {
					client.waitForElementVisible(`${location}[text()="${result.value}"]`);
				});
			},

			selectBackOnNavBar: (client: NightWatchClient): void => {
				const back = '//div/a[@class="navbar-back-icon"]';

				client.waitForElementVisible(back).click(back);
			},

			closeQrScanner: (client: NightWatchClient): void => {
				const close = '//div/a[@class="close_modal"]';

				client.waitForElementVisible(close).click(close);
			},

			fillTextarea: (client: NightWatchClient, location: string, text: string): void => {
				const target = '//form/textarea[@id="' + location + '"]';

				client
					.waitForElementVisible(target)
					.click(target)
					.setValue(target, text);
			},

			selectAdditionalOption: (client: NightWatchClient, option: string ): void => {
				const target = '//div//a/span[contains(text(),"' + option + '")]';

				client.waitForElementVisible(target).click(target);
			},
		},
	],

	elements: {},
};

export = globalPage;
