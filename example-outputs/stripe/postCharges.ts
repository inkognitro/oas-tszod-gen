import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe/core';
import {Charge, Error} from '@example-outputs/stripe';

export const postChargesEndpointSchema = {
  path: '/v1/charges',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostChargesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      application_fee?: number; // int
      application_fee_amount?: number; // int
      capture?: boolean;
      card?: (
        | {
            address_city?: string;
            address_country?: string;
            address_line1?: string;
            address_line2?: string;
            address_state?: string;
            address_zip?: string;
            cvc?: string;
            exp_month: number; // int
            exp_year: number; // int
            metadata?: {
              [key: string]: string;
            };
            name?: string;
            number: string;
            object?: 'card';
          }
        | string
      ) &
        Partial<{
          address_city?: string;
          address_country?: string;
          address_line1?: string;
          address_line2?: string;
          address_state?: string;
          address_zip?: string;
          cvc?: string;
          exp_month: number; // int
          exp_year: number; // int
          metadata?: {
            [key: string]: string;
          };
          name?: string;
          number: string;
          object?: 'card';
        }>;
      currency?: string;
      customer?: string;
      description?: string;
      destination?: (
        | {
            account: string;
            amount?: number; // int
          }
        | string
      ) &
        Partial<{
          account: string;
          amount?: number; // int
        }>;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      on_behalf_of?: string;
      radar_options?: {
        session?: string;
      };
      receipt_email?: string;
      shipping?: {
        address: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
        carrier?: string;
        name: string;
        phone?: string;
        tracking_number?: string;
      };
      source?: string;
      statement_descriptor?: string;
      statement_descriptor_suffix?: string;
      transfer_data?: {
        amount?: number; // int
        destination: string;
      };
      transfer_group?: string;
    }
  >
>;

export type PostChargesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Charge>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesRequestResult = RequestResult<
  PostChargesRequest,
  PostChargesResponse
>;

export function postCharges(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostChargesRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesEndpointSchema, payload),
    config
  );
}
