import {
  Forwarded_request_context,
  Forwarded_request_details,
  Forwarded_response_details,
} from '@example-outputs/stripe';

export type Forwarding_Request = {
  created: number; // int
  id: string;
  livemode: boolean;
  object: 'forwarding.request';
  payment_method: string;
  replacements: (
    | 'card_cvc'
    | 'card_expiry'
    | 'card_number'
    | 'cardholder_name'
  )[];
  request_context?: Forwarded_request_context &
    Partial<Forwarded_request_context>;
  request_details?: Forwarded_request_details &
    Partial<Forwarded_request_details>;
  response_details?: Forwarded_response_details &
    Partial<Forwarded_response_details>;
  url?: string | null;
};
