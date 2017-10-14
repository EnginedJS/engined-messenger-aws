const { Service } = require('engined');
const Agent = require('./lib/agent');

module.exports = (opts = {}) => class extends Service {

	constructor(context) {
		super(context);

		this.dependencies = [
			'Notification'
		];
		this.agentName = opts.agentName;
		this.options = opts;
	}

	async start() {

		let notificationManager = this.getContext().get('Notification');

		let agent = new Agent(this.options);

		notificationManager.register(this.agentName, agent);
	}

	async stop() {

		let notificationManager = this.getContext().get('Notification');

		notificationManager.unregister(this.agentName);
	}
}
