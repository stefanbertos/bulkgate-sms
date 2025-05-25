import { sendSMS } from '../src';

describe('sendSMS', () => {
    it('should throw if missing params', async () => {
        await expect(sendSMS({} as any)).rejects.toThrow();
    });
    // Add more tests, mock axios for real testing
});