import {CallbackResult, NightWatchClient, PageObject} from 'nightwatch';

const globalPage: PageObject = {
	commands: [
		{
			getStarted: (client: NightWatchClient): void => {
				const swiper: string = '//span[contains(@class, "swiper-pagination-bullet")]';

				client.pause(4000);
				client.waitForElementVisible(swiper, 7500);
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
			selectDevice: (client: NightWatchClient, itemText: string, timeout?: number): void => {
				const listItem: string = '//li/div[contains(string(), " ' + itemText + '")]';
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
		},
	],

	elements: {},
};

export = globalPage;
