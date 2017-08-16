# engined-notification-aws

Local notification use aws sns backend for engined.


## Installation

Install via NPM:

```shell
npm install engined-notification-aws
```

## Usage

Start engined-notification-aws service in engined, see example below:

```javascript
const { Manager } = require('engined');
const NotificationService = require('engined-notification');
const LocalNotificationService = require('engined-notification-aws');

const notification = NotificationService();
const localNotification = LocalNotificationService({
	accessKeyId: config.get('notification').aws.accessKeyId,
	secretAccessKey: config.get('notification').aws.secretAccessKey,
	region: config.get('notification').aws.region
});

const main = async () => {

	// Create manager
	let serviceManager = new Manager({ verbose: true });

	// Adding service to manager
	serviceManager.add('Notification', notification);
	serviceManager.add('LocalNotification', localNotification);

	// Start all services
	await serviceManager.startAll();
};

main();
```

## Send notification with local notification backend

The example to show how to send notification with local notification backend:

```javascript

// Using local notification backend
let localAgent = this.getContext().get('Notification').getAgent('default');

// Send Notification to user app
localAgent.sendNotificationToApp(arn, token, msg, badge)
```

## License
Licensed under the MIT License

## Authors
Copyright(c) 2017 Leon Lin（林為志） <<leonlin14@gmail.com>>
