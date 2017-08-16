# engined-messenger-aws

Local messenger use aws sns backend for engined.


## Installation

Install via NPM:

```shell
npm install engined-messenger-aws
```

## Usage

Start engined-messenger-aws service in engined, see example below:

```javascript
const { Manager } = require('engined');
const MessengerService = require('engined-messenger');
const LocalMessengerService = require('engined-messenger-aws');

const messenger = MessengerService();
const localMessenger = LocalMessengerService({
	accessKeyId: config.get('messenger').aws.accessKeyId,
	secretAccessKey: config.get('messenger').aws.secretAccessKey,
    region: config.get('messenger').aws.region
});

const main = async () => {

	// Create manager
	let serviceManager = new Manager({ verbose: true });

	// Adding service to manager
	serviceManager.add('Messenger', messenger);
	serviceManager.add('LocalMessenger', localMessenger);

	// Start all services
	await serviceManager.startAll();
};

main();
```

## Send message with local messenger backend

The example to show how to send message with local messenger backend:

```javascript

// Using local messenger backend
let localAgent = this.getContext().get('Messenger').getAgent('default');

// Send Message to user app
localAgent.sendMessageToApp(arn, token, msg, badge)
```

## License
Licensed under the MIT License

## Authors
Copyright(c) 2017 Leon Lin（林為志） <<leonlin14@gmail.com>>
