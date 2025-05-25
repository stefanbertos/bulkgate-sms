# bulkgate-sms


npm install bulkgate-sms

import { sendSMS } from 'bulkgate-sms';
await sendSMS({ to: '+420...', message: 'Hello', apiKey: process.env.BULKGATE_API_KEY, sender: 'MyApp' });



    const {data} = await got.post(secret.smsEndpoint, {
        json: {
            application_id: secret.smsApplicationId,
            application_token: secret.smsToken,
            number: event.phoneNumber,
            text: text,
            sender_id: 'gProfile',
            sender_id_value: '13239'
        }
    }).json();

https://help.bulkgate.com/docs/cs/http-simple-transactional-post-json.html