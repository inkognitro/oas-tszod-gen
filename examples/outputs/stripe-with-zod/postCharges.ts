import {z_Charge, z_Error, Charge, Error} from './schemas';
import {z} from 'zod';
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
} from './core';

export const postChargesEndpointSchema = {
  path: '/v1/charges',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        application_fee: z.number().int().safe().finite().optional(),
        application_fee_amount: z.number().int().safe().finite().optional(),
        capture: z.boolean().optional(),
        card: z
          .union([
            z.object({
              address_city: z.string().optional(),
              address_country: z.string().optional(),
              address_line1: z.string().optional(),
              address_line2: z.string().optional(),
              address_state: z.string().optional(),
              address_zip: z.string().optional(),
              cvc: z.string().optional(),
              exp_month: z.number().int().safe().finite(),
              exp_year: z.number().int().safe().finite(),
              metadata: z.record(z.string()).optional(),
              name: z.string().optional(),
              number: z.string(),
              object: z.enum(['card']).optional(),
            }),
            z.string(),
          ])
          .optional(),
        currency: z.string().optional(),
        customer: z.string().optional(),
        description: z.string().optional(),
        destination: z
          .union([
            z.object({
              account: z.string(),
              amount: z.number().int().safe().finite().optional(),
            }),
            z.string(),
          ])
          .optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        on_behalf_of: z.string().optional(),
        radar_options: z
          .object({
            session: z.string().optional(),
          })
          .optional(),
        receipt_email: z.string().optional(),
        shipping: z
          .object({
            address: z.object({
              city: z.string().optional(),
              country: z.string().optional(),
              line1: z.string().optional(),
              line2: z.string().optional(),
              postal_code: z.string().optional(),
              state: z.string().optional(),
            }),
            carrier: z.string().optional(),
            name: z.string(),
            phone: z.string().optional(),
            tracking_number: z.string().optional(),
          })
          .optional(),
        source: z.string().optional(),
        statement_descriptor: z.string().optional(),
        statement_descriptor_suffix: z.string().optional(),
        transfer_data: z
          .object({
            amount: z.number().int().safe().finite().optional(),
            destination: z.string(),
          })
          .optional(),
        transfer_group: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Charge,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
