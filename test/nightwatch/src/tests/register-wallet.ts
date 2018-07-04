import {NightWatchClient} from 'nightwatch';

// let recipientAddress: string;


export default {
	'Test mobile': (client: NightWatchClient): void => {
		// const global: NightWatchClient = client.page.globalPage();
		const	platform : any = client.options.desiredCapabilities.platformName
		client.useXpath();

		switch(platform){
			case 'Android':
				client.setContext('WEBVIEW_org.dagcoin.client');
					client.contexts((context)=> {
					client.setContext(context.value[1])
					});
					break;
			default: console.log('Desktop plaform - no need to change context');	

		}
		client.waitForElementVisible(
			'//*[@id="mainSection"]/section/div/div/div[1]/ks-swiper-container/div/div[2]/div[1]/div[1]',
		);
		client.click('//*[@id="mainSection"]/section/div/div/div[2]/button[1]');
		client.end();
	},
};
