import {
  Forwarded_request_context,
  Forwarded_request_details,
  Forwarded_response_details,
  z_Forwarded_request_context,
  z_Forwarded_request_details,
  z_Forwarded_response_details,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';

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

export const z_Forwarding_Request = z.object({
  created: z.number().int().safe().finite(),
  id: z.string(),
  livemode: z.boolean(),
  object: z.enum(['forwarding.request']),
  payment_method: z.string(),
  replacements: z.array(
    z.enum(['card_cvc', 'card_expiry', 'card_number', 'cardholder_name'])
  ),
  request_context: z_Forwarded_request_context.optional(),
  request_details: z_Forwarded_request_details.optional(),
  response_details: z_Forwarded_response_details.optional(),
  url: z.string().nullable().optional(),
});
