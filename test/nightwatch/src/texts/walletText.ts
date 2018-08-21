// file for wallet menu texts
export default {
	myWallet: {
		heading: 'Start sending Dagcoin',
		explanation:
			'To get started, buy Dagcoin or share your address. You can receive Dagcoin from other Dagcoin wallets.',
		showAddress: 'Show wallet address',

		// On reg wallet
		transactions: 'TRANSACTIONS HISTORY',
	},

	receive: {
		share: 'Share it with the sender via email or text.',
	},

	addDevice: {
		invite: 'Invite the other device',
		acceptInvite: 'Scan the above QR code using the other device, or send this pairing code to the other device:',
	},

	acceptInvitation: {
		invite: 'Accept invitation from the other device',
		info:
			'Enter the pairing code received from the other device, or use your camera (icon at the upper right corner) to scan the QR code displayed on the other device.',
	},

	createNewWallet: {
		description:
			'Single address wallets will not spawn new addresses for every transaction, change will always go to the one and only address the wallet contains.',
	},

	addressBook: {
		info: "Search result is empty or you don't have any contacts in your address book.",
		description: 'Press "+" in the right upper corner to add new contact.',
	},

	modals: {
		receiveModal: 'Request specific amount',
	},

	settings: {
		backUp: 'For security reasons we strongly recommend you to back your wallet seed up as soon as possible.',
	},

	changeWalletType: {
		content: "The wallet will contain the most current state of the entire Dagcoin database. This option is better for privacy but will take several gigabytes of storage and the initial sync will take several days. CPU load will be high during sync. After changing to full wallet your money won't be visible until database will synchronize your transactions."
	},
};
