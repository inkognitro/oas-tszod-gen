import {
  z_Funding_instructions,
  z_Error,
  Funding_instructions,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const postCustomersCustomerFundingInstructionsEndpointSchema = {
  path: '/v1/customers/{customer}/funding_instructions',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    customer: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        bank_transfer: z.object({
          eu_bank_transfer: z
            .object({
              country: z.string(),
            })
            .optional(),
          requested_address_types: z
            .array(z.enum(['iban', 'sort_code', 'spei', 'zengin']))
            .optional(),
          type: z.enum([
            'eu_bank_transfer',
            'gb_bank_transfer',
            'jp_bank_transfer',
            'mx_bank_transfer',
            'us_bank_transfer',
          ]),
        }),
        currency: z.string(),
        expand: z.array(z.string()).optional(),
        funding_type: z.enum(['bank_transfer']),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Funding_instructions,
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

export type PostCustomersCustomerFundingInstructionsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      bank_transfer: {
        eu_bank_transfer?: {
          country: string;
        };
        requested_address_types?: ('iban' | 'sort_code' | 'spei' | 'zengin')[];
        type:
          | 'eu_bank_transfer'
          | 'gb_bank_transfer'
          | 'jp_bank_transfer'
          | 'mx_bank_transfer'
          | 'us_bank_transfer';
      };
      currency: string;
      expand?: string[];
      funding_type: 'bank_transfer';
    }
  >,
  {
    customer: string;
  }
>;

export type PostCustomersCustomerFundingInstructionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Funding_instructions>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerFundingInstructionsRequestResult =
  RequestResult<
    PostCustomersCustomerFundingInstructionsRequest,
    PostCustomersCustomerFundingInstructionsResponse
  >;

export function postCustomersCustomerFundingInstructions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerFundingInstructionsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerFundingInstructionsRequestResult> {
  return requestHandler.execute(
    createRequest(
      postCustomersCustomerFundingInstructionsEndpointSchema,
      payload
    ),
    config
  );
}
