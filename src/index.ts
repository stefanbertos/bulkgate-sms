import axios from 'axios';

export interface SendSMSOptions {
    to: string;
    message: string;
    apiKey: string;
    sender: string;
}

export async function sendSMS(options: SendSMSOptions): Promise<any> {
    const { to, message, apiKey, sender } = options;
    const response = await axios.post('https://portal.bulkgate.com/api/1.0/simple/transactional', {
        application_id: apiKey,
        number: to,
        text: message,
        sender_id: sender
    });
    return response.data;
}