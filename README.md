# bulkgate-sms

To use the library, install it with:

```sh
npm install bulkgate-sms
```

**Requires Node.js 22.x**

## Default Values

The following fields in `SendSMSOptions` have defaults and can be omitted:

| Field            | Default     | Description                                                   |
|------------------|-------------|---------------------------------------------------------------|
| `unicode`        | `false`     | Use Unicode SMS (set to `true` for Unicode)                   |
| `sender_id`      | `'gSystem'` | System sender. Change for other sender types                  |
| `sender_id_value`| `null`      | Sender value (e.g., for custom sender types)                  |
| `country`        | `null`      | Country code (auto-detected if not provided)                  |
| `schedule`       | `'Now'`     | Send immediately; set to timestamp/ISO for scheduled sending  |
| `duplicates_check`| `'off'`    | No duplicate check by default                                 |

Any value not provided will use the default above. You can override these by specifying them in the options object.

## Example Usage

```typescript
import { sendSMS, SendSMSOptions, BulkGateSendSMSResponse } from 'bulkgate-sms';

const options: SendSMSOptions = {
  application_id: process.env.BULKGATE_APPLICATION_ID!,
  application_token: process.env.BULKGATE_APPLICATION_TOKEN!,
  number: '420775123456',
  text: 'Hello from BulkGate!',
  tag: 'welcome-message', // required
  // Optional: override defaults if needed
  // unicode: true,
  // sender_id: 'gText',
  // sender_id_value: 'MyCompany',
  // country: 'CZ',
  // schedule: '2025-06-01T12:00:00Z',
  // duplicates_check: 'on',
};

(async () => {
  try {
    const response: BulkGateSendSMSResponse = await sendSMS(options);
    console.log('SMS API response:', response);
  } catch (error) {
    console.error('Failed to send SMS:', error);
  }
})();
```

## Custom Logging

By default, bulkgate-sms logs outgoing requests, responses, and errors using `console`. You can provide your own logger (e.g., winston, pino) by calling `setBulkGateLogger`:

```typescript
import { setBulkGateLogger } from 'bulkgate-sms';

setBulkGateLogger({
  log: (...args) => {/* your log logic */},
  error: (...args) => {/* your error logic */},
});
```

This will capture all logs from the library, including requests and API responses.

- See full API documentation: [BulkGate HTTP API Docs](https://help.bulkgate.com/docs/en/http-simple-transactional-post-json.html)

---

## Badges

[![Build Status](https://github.com/stefanbertos/bulkgate-sms/actions/workflows/ci.yml/badge.svg)](https://github.com/stefanbertos/bulkgate-sms/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/codecov/c/github/stefanbertos/bulkgate-sms?style=flat-square)](https://app.codecov.io/gh/stefanbertos/bulkgate-sms)
[![npm version](https://img.shields.io/npm/v/bulkgate-sms.svg?style=flat-square)](https://www.npmjs.com/package/bulkgate-sms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
