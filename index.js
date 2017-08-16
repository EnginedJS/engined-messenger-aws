const { Service } = require('engined');
const Agent = require('./lib/agent');

module.exports = (opts = {}) => class extends Service {

	constructor(context) {
		super(context);

		this.dependencies = [
			'Messenger'
		];
		this.agentName = opts.agentName;
		this.options = opts;
	}

	async start() {

		let messageManager = this.getContext().get('Messenger');

		let agent = new Agent(this.options);

		messageManager.register(this.agentName, agent);
	}

	async stop() {

		messageManager.unregister(this.agentName);
	}
}
