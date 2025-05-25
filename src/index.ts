import axios from 'axios';

export interface SendSMSOptions {
  /** Application ID (APPLICATION_ID) is a unique identification number that you need to access your API along with the Application token (APPLICATION_TOKEN). */
  application_id: string;
  /** The API token (APPLICATION_TOKEN) serves as a security feature for your API and should not be shared with anyone. It is the key you need to access your API along with the Application ID (APPLICATION_ID). If you suspect that someone has access to your API, you should disable your token or add a new token. */
  application_token: string;
  /** Recipient numbers separated by ; (semicolon) */
  number: string;
  /** SMS message text (max. 612 characters or 268 characters if Unicode is activated), UTF-8 encoding */
  text: string;
  /**
   * Yes/true/1 for Unicode SMS, no/false/0 for 7bit SMS
   * @default false
   */
  unicode?: boolean;
  /**
   * SENDER_ID
   * gSystem System Number (default)
   * gShort Short Code
   * gText Text Sender
   * gMobile Mobile Connect
   * gPush Mobile Connect push - Sends a notification to your Mobile Connect application
   * gOwn Own Number (requires number verification)
   * gProfile BulkGate Profile ID
   * <int> BulkGate Profile ID
   * @default 'gSystem'
   */
  sender_id?: string;
  /**
   * Sender value - gOwn (e.g. "420 777 777 777"), gText (e.g. "BulkGate"), gProfile (e.g. "423"), gMobile or gPush (KEY)
   * @default null
   */
  sender_id_value?: string | null;
  /**
   * Provide recipient numbers in international format (with prefix, e.g. 420) or add country code (775123456 + CZ = 420775123456). See example of country request. If null, then your set time zone will be used to populate the information
   * @default null
   */
  country?: string | null;
  /**
   * Schedule the sending time and date in unix timestamp, or ISO 8601. See examples below
   * @default 'Now'
   */
  schedule?: string;
  /**
   * Select on to prevent duplicate messages from being sent to the same phone number. Messages with the same text sent to the same number will be deleted. If off is active, no duplicates will be deleted.
   * @default 'off'
   */
  duplicates_check?: string;
  /** Marking messages for subsequent user tracking. */
  tag: string;
}

/**
 * BulkGate error types for SMS API responses.
 */
export enum BulkGateErrorType {
  UnknownIdentity = 'unknown_identity',
  Banned = 'banned',
  InvalidNumericSender = 'invalid_numeric_sender',
  EmptyMessage = 'empty_message',
  InvalidPhoneNumber = 'invalid_phone_number',
  AdminNotFound = 'admin_not_found',
  NoRecipients = 'no_recipients',
  BlacklistedNumber = 'blacklisted_number',
  LowCredit = 'low_credit',
  MethodNotAllowed = 'method_not_allowed',
  UnknownAction = 'unknown_action',
  UnsupportedApiVersion = 'unsupported_api_version',
  Unknown = 'unknown',
}

/** Response for an error when sending SMS */
export interface BulkGateErrorResponse {
  /** Error type (see BulkGateErrorType) */
  type: BulkGateErrorType;
  /** HTTP status code */
  code: number;
  /** Error message */
  error: string;
  detail: string;
}

/** Success response data */
export interface BulkGateSuccessData {
  status: string; // e.g. "accepted"
  sms_id: string;
  part_id: string[];
  number: string;
}

/** Success response wrapper */
export interface BulkGateSuccessResponse {
  data: BulkGateSuccessData;
}

/** Union type for the API response */
export type BulkGateSendSMSResponse = BulkGateSuccessResponse | BulkGateErrorResponse;

// Global logger setup
export type BulkGateLogger = {
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};

let logger: BulkGateLogger = console;

/**
 * Set a custom logger for bulkgate-sms library.
 * @param customLogger An object with `log` and `error` methods.
 */
export function setBulkGateLogger(customLogger: BulkGateLogger) {
  logger = customLogger;
}

export async function sendSMS(options: SendSMSOptions): Promise<BulkGateSendSMSResponse> {
  const {
    unicode = false,
    sender_id = 'gSystem',
    sender_id_value = null,
    country = null,
    schedule = 'Now',
    duplicates_check = 'off',
    ...rest
  } = options;

  logger.log('[BulkGate] Sending SMS', {
    ...rest,
    unicode,
    sender_id,
    sender_id_value,
    country,
    schedule,
    duplicates_check,
  });
  try {
    const response = await axios.post('https://portal.bulkgate.com/api/1.0/simple/transactional', {
      ...rest,
      unicode,
      sender_id,
      sender_id_value,
      country,
      schedule,
      duplicates_check,
    });
    logger.log('[BulkGate] SMS API response', response.data);
    return response.data;
  } catch (error) {
    logger.error('[BulkGate] SMS API error', error);
    throw error;
  }
}
