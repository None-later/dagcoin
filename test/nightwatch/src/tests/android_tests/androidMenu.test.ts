import {NightWatchClient} from 'nightwatch';
import { setupWallet } from '../../setup';
import menus from '../../texts/menu';
import sideMenu from '../../texts/sideMenu';

export const androidMenuTest = {

	...setupWallet,
    'Android navigate bottom menu': (client: NightWatchClient): void => {
        const menu: NightWatchClient = client.page.navMenu();

        menus.options.map(option => {
            menu.selectBottomMenuItem(client, option.option);
            option.optionValues.map(optionValues => {
                client.expect.element(optionValues.valueLocation).text.to.contain(optionValues.value).before();
            });
        });

    },

    'Android navigate side menu': (client: NightWatchClient): void => {
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