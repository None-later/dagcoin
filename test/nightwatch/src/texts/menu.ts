// text for bottom menu options 
export default {
    options: [
        {
            option: 'Receive',
            optionValues: [
                {
                    valueLocation: '//div/h2',
                    value: 'Share it with the sender via email or text.',
                },
                {
                    valueLocation: '//div/a//span',
                    value: 'Request a specific amount',
                },
            ],
        },
        {
            option: 'Send',
            optionValues: [
                {
                    valueLocation: '//div[@class="form-group"]//span',
                    value: 'Amount',
                },
                {
                    valueLocation: '//div[@class="form-group"][2]//span',
                    value: 'Receiver',
                },
            ], 
        },
        {
            option: 'Paired Devices',
            optionValues: [
                {
                    valueLocation: '//div/p/span',
                    value: `You don't have any paired devices yet.`,
                },
                {
                    valueLocation: '//div/p[2]/span',
                    value: 'Press "+" in the right upper corner to pair with device.',
                },
            ], 
        },
        {
            option: 'My Wallet',
            optionValues: [
                {
                    valueLocation: '//div/p[@class="heading"]/span',
                    value: 'Start sending Dagcoin',
                },
                {
                    valueLocation: '//div/p[@class="explanation"]/span',
                    value: 'To get started, buy Dagcoin or share your address. You can receive Dagcoin from other Dagcoin wallets.',
                },
            ], 
        },
    ]
}
