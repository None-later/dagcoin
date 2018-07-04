import {CustomAssertion, CustomAssertionCallback, NightWatchClient, TypedCallbackResult} from 'nightwatch';

class MatchesAssertion implements CustomAssertion {
	public message: string;
	public api: NightWatchClient;

	constructor(public selector: string, public regularExpression: RegExp) {
		this.message = `Testing if element <${selector}> matches regular expression: ${regularExpression}'`;
	}

	public expected(): RegExp {
		return this.regularExpression;
	}

	public pass(value: string): boolean {
		return this.regularExpression.test(value);
	}

	public failure(result: boolean): boolean {
		if (!result) {
			this.message = `Element <${this.selector}> does not match regular expression: ${this.regularExpression}'`;

			return true;
		}

		return false;
	}

	public value(result: TypedCallbackResult<string>): string {
		if (result.status === -1) {
			return '';
		}

		return result.value;
	}

	public command(callback: CustomAssertionCallback): NightWatchClient {
		return this.api.getText(this.selector, callback);
	}
}

export = {
	assertion: MatchesAssertion,
};
