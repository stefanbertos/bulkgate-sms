import { sendSMS } from '../src';
import axios from 'axios';

jest.mock('axios');

describe('sendSMS', () => {
  it('should throw if missing params', async () => {
    await expect(sendSMS({} as any)).rejects.toThrow();
  });

  it('should apply defaults for optional fields', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        data: { status: 'accepted', sms_id: 'id', part_id: ['id_1'], number: '420123456789' },
      },
    });
    const minimal = {
      application_id: 'app_id',
      application_token: 'token',
      number: '420123456789',
      text: 'Hello',
      tag: 'test',
    };
    await sendSMS(minimal as any);
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        unicode: false,
        sender_id: 'gSystem',
        sender_id_value: null,
        country: null,
        schedule: 'Now',
        duplicates_check: 'off',
      }),
    );
  });

  it('should handle error response', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        type: 'invalid_phone_number',
        code: 400,
        error: 'Invalid phone number',
        detail: null,
      },
    });
    const minimal = {
      application_id: 'app_id',
      application_token: 'token',
      number: 'invalid',
      text: 'Hello',
      tag: 'test',
    };
    const result = await sendSMS(minimal as any);
    if ('data' in result) {
      throw new Error('Expected error response, got success');
    } else {
      expect(result).toHaveProperty('type', 'invalid_phone_number');
      expect(result).toHaveProperty('code', 400);
    }
  });

  it('should return success response shape', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        data: { status: 'accepted', sms_id: 'id', part_id: ['id_1'], number: '420123456789' },
      },
    });
    const minimal = {
      application_id: 'app_id',
      application_token: 'token',
      number: '420123456789',
      text: 'Hello',
      tag: 'test',
    };
    const result = await sendSMS(minimal as any);
    if ('data' in result) {
      expect(result.data).toHaveProperty('status', 'accepted');
      expect(result.data).toHaveProperty('sms_id');
    } else {
      throw new Error('Expected success response, got error');
    }
  });
});
