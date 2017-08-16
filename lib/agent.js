const AWS = require('aws-sdk');

module.exports = class Agent {

	constructor(opts) {
		this.accessKeyId = opts.accessKeyId || '';
        this.secretAccessKey = opts.secretAccessKey || '';
        this.region = opts.region || '';
	}

	sendMessageToApp(arn, token, msg, badge) {
		if (!arn || !token || !msg)
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

            console.log('sending msg: ' + msg);
            sns.publish({
                Message: payload,
                MessageStructure: 'json',
                TargetArn: endpointArn
            }, function(err, data) {
                if (err) {
                    console.log(err.stack);
                    return;
                }

                console.log('push sent');
                console.log(data);
            });
        });
	}
};
