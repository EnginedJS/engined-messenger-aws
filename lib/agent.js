const AWS = require('aws-sdk');

module.exports = class Agent {

	constructor(opts) {
		this.accessKeyId = opts.accessKeyId || '';
        this.secretAccessKey = opts.secretAccessKey || '';
        this.region = opts.region || '';
	}

	sendNotificationToApp(arn, token, msg, badge) {
		let error = false
		if (!arn) {
			console.log('lose your arn')
			error = true
		}
		if (!token) {
			console.log('lose your token')
			error = true
		}
		if (!msg) {
			console.log('lose your msg')
			error = true
		}
		if (error)
			return

		AWS.config.update({
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
            region: this.region
        });

        let sns = new AWS.SNS()

		sns.createPlatformEndpoint({
            PlatformApplicationArn: arn,
            Token: token
        }, function(err, data) {
            if (err) {
                console.log(err.stack);
                return;
            }

            var endpointArn = data.EndpointArn;
            var payload = {
                default: msg,
                APNS: {
                    aps: {
                        alert: msg,
                        sound: 'default',
                        badge: badge || 1
                    }
                }
            };

            // first have to stringify the inner APNS object...
            payload.APNS = JSON.stringify(payload.APNS);
            // then have to stringify the entire message payload
            payload = JSON.stringify(payload);

            sns.publish({
                Message: payload,
                MessageStructure: 'json',
                TargetArn: endpointArn
            }, function(err, data) {
                if (err) {
                    console.log(err.stack);
                    return;
                }

                console.log('sending msg: ' + msg);
                console.log(data);
            });
        });
	}
};
