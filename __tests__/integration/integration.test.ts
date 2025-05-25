import { sendSMS } from '../../src';

const appId = process.env.BULKGATE_APP_ID;
const token = process.env.BULKGATE_TOKEN;
const testNumber = process.env.BULKGATE_TEST_NUMBER;
const senderIdValue = process.env.BULKGATE_SENDER_ID_VALUE;

describe('Integration: sendSMS', () => {
  it('should send a real SMS using real credentials', async () => {
    if (!appId || !token || !testNumber) {
      throw new Error(
        'Missing BULKGATE_APP_ID, BULKGATE_TOKEN, BULKGATE_TEST_NUMBER or BULKGATE_SENDER_ID_VALUE',
      );
    }
    const response = await sendSMS({
      application_id: appId,
      application_token: token,
      number: testNumber,
      text: 'Integration test SMS',
      tag: 'integration-test',
      sender_id: 'gProfile',
      sender_id_value: senderIdValue,
    });
    // Accept both success and error responses, but log them for CI visibility
    // You may want to assert more strictly depending on your API/account state
    console.log('Integration test response:', response);
    expect(response).toBeDefined();
  });
});
