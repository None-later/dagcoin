import {NightWatchClient} from 'nightwatch';
import setup from './texts/initialSetup';

export const setupWallet = {
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
          client.pause(1000);
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
  }
}