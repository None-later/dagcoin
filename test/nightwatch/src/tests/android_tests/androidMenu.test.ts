import {NightWatchClient} from 'nightwatch';
import setup from '../../texts/initialSetup';
import menus from '../../texts/menu';
import sideMenu from '../../texts/sideMenu';

export const androidMenuTest = {

	'Android Set up default wallet': (client: NightWatchClient): void => {
        const global: NightWatchClient = client.page.globalPage();
        
        client.useXpath();
        client.setContext('WEBVIEW_org.dagcoin.client');
		client.contexts(context => {
		    client.setContext(context.value[1]);
		});	

        // Skip through introduction slides
		client.waitForElementVisible('//div[@class="intro_content_body"]');
        client.waitForElementVisible('//*[@id="mainSection"]/section/div/button');
        client.click('//*[@id="mainSection"]/section/div/button');

        // Agree to terms
        client.waitForElementVisible('//div/h2[text()="Almost done!"]');

        const agreeTerms: {[key: string]: string } = {
            security: 'confirm.security',
            backup: 'confirm.backup',
            finish: 'confirm.finish'
        };

        for (const terms of Object.keys(agreeTerms)){
            global.fillCheckBox(client, agreeTerms[terms]);
            client.expect.element(`//input[@id="${terms}"]`).to.be.selected.before();
        };
  
        global.clickOnButton(client,'Confirm & Finish');

        // Expect registration selection not to be displayed for android
		client.expect.element('//span[text()="Please choose registration type"]').to.not.be.present.after(2000);

        // Finish wallet registration 
		client.expect.element('//span[text()="WELCOME TO DAGCOIN"]').to.be.visible.before();
        global.clickOnButton(client,'CONTINUE');

        client.waitForElementVisible(`//div//span[text()="${setup.initialRun.deviceNameSlide_1}"]`)
        global.clickOnButton(client,'GET STARTED');
        client.waitForElementVisible('//div[@id="walletHome"]');
    },

    'Android navigate throw bottom menu': (client: NightWatchClient): void => {
        const menu: NightWatchClient = client.page.navMenu();

        menus.options.map(option => {
            menu.selectBottomMenuItem(client, option.option);
            option.optionValues.map(optionValues => {
                client.expect.element(optionValues.valueLocation).text.to.contain(optionValues.value).before();
            });
        });

    },

    'Android navigate throw side menu': (client: NightWatchClient): void => {
        const menu: NightWatchClient = client.page.navMenu();

        sideMenu.options.map(option => {
                menu.openSideBarMenu(client);
                menu.selectSideMenuOption(client, option.menu);

            option.menuValues.map(menuValues => {      
                menu.testMenus(client, menuValues.valueSelection);
                client.waitForElementVisible(menuValues.valueLocation);

            });
        });

    },

    'Android Close app': (client: NightWatchClient): void => {
		client.end();
	}
};