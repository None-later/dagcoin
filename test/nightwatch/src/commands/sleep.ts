import {EventEmitter} from 'events';

// simply waits for given number of milliseconds before resuming operation
class SleepCommand extends EventEmitter {
	public command(milliseconds: number = 1000): SleepCommand {
		setTimeout(() => {
			this.emit('complete');
		}, milliseconds);

		return this;
	}
}

export = SleepCommand;
