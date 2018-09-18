import {NightWatchClient, PageObject} from 'nightwatch';

const paired: PageObject = {
	commands: [
		{
            addDevice: (client: NightWatchClient, option: string): void => {
                const invite = '//li/a//span[text()="Invite the other device"]';
                const accept = '//li/a//span[text()="Accept invitation from the other device"]';

                if (option === 'invite') {
                    client.waitForElementVisible(invite).click(invite);
                    client.waitForElementVisible('//div//img');
                } else {
                    client.waitForElementVisible(accept).click(accept);
                    client.waitForElementVisible('//div/input[@name="code"]');
                };
            },

            deviceSideMenu: (client: NightWatchClient): void => {
                const target = '//div//a[@title="Add a new device"]';

                client.waitForElementVisible(target).click(target);
            },

            sendMessageForm: (client: NightWatchClient, option: string): void => {
                const target = '//div/button[@class="send_form_message_chat_button btn inline"]';
                const insert = '//li/a/span[text()="Insert my address"]';
                const request = '//li/a/span[text()="Request payment"]'

                client.waitForElementVisible(target).click(target);
                    if (option === 'insert') {
                        client.waitForElementVisible(insert).click(insert);
                    } else {
                        client.waitForElementVisible(request).click(request);
                    };

            },

            sendMessage: (client: NightWatchClient): void => {
                const taget = '//form/button[@class="chatbutton btn inline btn_red"]';

                client.waitForElementVisible(taget).click(taget);
            },
		},
	],

	elements: {},
};

export = paired;
