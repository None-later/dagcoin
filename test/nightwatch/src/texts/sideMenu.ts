// text for side menu options
export default {
	options: [
		{
			menu: 'Add new wallet',
			menuValues: [
				{
					valueSelection: '//li/a[text()="Multidevice Wallet"]',
					valueLocation: '//form/div[@ng-show="create.totalCosigners != 1"]',
				},
				{
					valueSelection: '//li/a[text()="Plain Wallet"]',
					valueLocation:
						'//div[@class="description m10b"]/span[text()="Single address wallets will not spawn new addresses for every transaction, change will always go to the one and only address the wallet contains."]',
				},
			],
		},
		{
			menu: 'Address Book',
			menuValues: [
				{
					valueSelection: '//div//a[@title="Add new contact"]',
					valueLocation: `//div/form[@name="newContact"]`,
				},
				{
					valueSelection: '//svg-icon[contains(@class,"back-button")]/parent::*',
					valueLocation: `//div/p[1]/span[text()="Search result is empty or you don't have any contacts in your address book."]`,
				},
			],
		},
		{
			menu: 'Paired devices',
			menuValues: [
				{
					valueSelection: '//div//a[@title="Add a new device"]',
					valueLocation: '//li/a//span[text()="Invite the other device"]',
				},
				{
					valueSelection: '//svg-icon[contains(@class,"back-button")]/parent::*',
					valueLocation: `//div/p[1]/span[text()="You don't have any paired devices yet."]`,
				},
			],
		},
		{
			menu: 'Settings',
			menuValues: [
				{
					valueSelection: '//li/div/span[text()="System"]',
					valueLocation: '//div/ul[@class="preferences_links"]',
				},
				{
					valueSelection: '//svg-icon[contains(@class,"back-button")]/parent::*',
					valueLocation: '//div/h4[text()="Wallet Backup"]',
				},
				{
					valueSelection: '//li/div/span[text()="Security"]',
					valueLocation: '//h4/span[text()="Authorization type"]',
				},
				{
					valueSelection: '//svg-icon[contains(@class,"back-button")]/parent::*',
					valueLocation: '//div/h4[text()="Wallet Backup"]',
				},
				{
					valueSelection: '//li/div/span[text()="About Device"]',
					valueLocation: '//li/div/span[text()="Device address"]',
				},
				{
					valueSelection: '//svg-icon[contains(@class,"back-button")]/parent::*',
					valueLocation: '//div/h4[text()="Wallet Backup"]',
				},
				{
					valueSelection: '//li/div/span[text()="About Dagcoin"]',
					valueLocation: '//h4/span[text()="Release Information"]',
				},
			],
		},
	],
};
